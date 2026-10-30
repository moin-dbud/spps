import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  connectToDatabase,
  getAdminsCollection,
  getSettingsCollection,
  getNewsCollection,
  getGalleryCollection,
  getEnquiriesCollection,
  getAuditLogsCollection,
  getSessionsCollection,
} from './db.ts';
import {
  hashPassword,
  verifyPassword,
  sanitizeAdmin,
  createSession,
  verifySession,
  deleteSession,
  logAudit,
} from './auth.ts';
import { seedInitialData } from './seed.ts';
import type {
  AdminDocument,
  NewsDocument,
  GalleryDocument,
  EnquiryDocument,
} from './types.ts';

// In-memory rate limiting map: ip -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(req: IncomingMessage, maxAttempts = 10, windowMs = 60000): boolean {
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]) ||
    req.socket.remoteAddress ||
    'localhost';
  const now = Date.now();
  const current = rateLimitMap.get(ip);
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (current.count >= maxAttempts) {
    return false;
  }
  current.count += 1;
  return true;
}

function sendJson(res: ServerResponse, statusCode: number, data: unknown): void {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function parseRequestBody(req: IncomingMessage): Promise<any> {
  // If request body was already parsed by a framework (e.g. Vercel)
  if ((req as any).body && typeof (req as any).body === 'object') {
    return Promise.resolve((req as any).body);
  }

  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function getRequestToken(req: IncomingMessage): string {
  const authHeader = req.headers['authorization'] || '';
  const adminToken = req.headers['x-admin-token'] || '';
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  if (typeof adminToken === 'string' && adminToken) {
    return adminToken.trim();
  }
  return '';
}

let hasSeeded = false;

/**
 * Main API request router for both Vite dev middleware and Vercel serverless functions.
 */
export async function handleApiRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  // CORS setup
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Token');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const rawUrl = req.url || '';
  const [url] = rawUrl.split('?');

  // Only handle /api routes
  if (!url.startsWith('/api')) {
    sendJson(res, 404, { success: false, error: 'Not found' });
    return;
  }

  // --- HEALTH / STATUS ENDPOINT ---
  if (url === '/api/health' && req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const collections = await db.listCollections().toArray();
      const stats = {
        admins: await getAdminsCollection(db).countDocuments(),
        news: await getNewsCollection(db).countDocuments(),
        gallery: await getGalleryCollection(db).countDocuments(),
        enquiries: await getEnquiriesCollection(db).countDocuments(),
        audit_logs: await getAuditLogsCollection(db).countDocuments(),
      };
      sendJson(res, 200, {
        success: true,
        status: 'ok',
        database: {
          connected: true,
          name: db.databaseName,
          collections: collections.map((c: any) => c.name),
          counts: stats,
        },
      });
      return;
    } catch (err: any) {
      sendJson(res, 503, {
        success: false,
        status: 'degraded',
        error: 'Database connection offline',
        details: err.message,
      });
      return;
    }
  }

  // Connect to MongoDB
  let db: any;
  try {
    const conn = await connectToDatabase();
    db = conn.db;

    // Trigger seeding on first connect if needed
    if (!hasSeeded) {
      hasSeeded = true;
      try {
        await seedInitialData(db);
      } catch (e: any) {
        console.warn('[Seed] Initialization warning:', e.message);
      }
    }
  } catch (err: any) {
    console.error('[API] Database connection error:', err.message);
    sendJson(res, 503, {
      success: false,
      error: 'Database service unavailable. Please check MONGODB_URI.',
      details: err.message,
    });
    return;
  }

  // Session verification helper
  const token = getRequestToken(req);
  const session = token ? await verifySession(db, token) : null;

  // ==========================================
  // AUTHENTICATION ROUTES
  // ==========================================

  // POST /api/auth/login
  if (url === '/api/auth/login' && req.method === 'POST') {
    if (!checkRateLimit(req, 8, 60000)) {
      sendJson(res, 429, {
        success: false,
        error: 'Too many login attempts. Please wait 1 minute.',
      });
      return;
    }

    try {
      const { username, password } = await parseRequestBody(req);
      const cleanUser = (username || '').trim().toLowerCase();

      if (!cleanUser || !password) {
        sendJson(res, 400, { success: false, error: 'Username and password are required' });
        return;
      }

      const adminsCol = getAdminsCollection(db);
      const admin = await adminsCol.findOne({
        username: { $regex: new RegExp(`^${cleanUser}$`, 'i') },
      });

      if (!admin) {
        await logAudit(db, cleanUser, 'System', 'Failed login: User not found');
        sendJson(res, 401, { success: false, error: 'Invalid username or password' });
        return;
      }

      if (admin.status === 'Inactive') {
        await logAudit(db, cleanUser, 'System', 'Blocked login: Account is inactive');
        sendJson(res, 403, {
          success: false,
          error: 'Account is deactivated. Contact a Super Administrator.',
        });
        return;
      }

      const isValid = verifyPassword(password, admin.passwordHash);
      if (!isValid) {
        await logAudit(db, cleanUser, 'System', 'Failed login: Invalid password');
        sendJson(res, 401, { success: false, error: 'Invalid username or password' });
        return;
      }

      const sessionToken = await createSession(db, admin);
      await logAudit(db, admin.username, admin.username, 'Login successful');

      sendJson(res, 200, {
        success: true,
        token: sessionToken,
        admin: sanitizeAdmin(admin),
      });
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message || 'Login failed' });
    }
    return;
  }

  // GET /api/auth/me
  if (url === '/api/auth/me' && req.method === 'GET') {
    if (!session) {
      sendJson(res, 401, { success: false, error: 'Unauthorized session' });
      return;
    }

    const adminsCol = getAdminsCollection(db);
    const admin = await adminsCol.findOne({
      $or: [
        { id: session.id },
        { username: { $regex: new RegExp(`^${session.username}$`, 'i') } },
      ],
    });
    if (!admin || admin.status === 'Inactive') {
      sendJson(res, 401, { success: false, error: 'Session expired or user inactive' });
      return;
    }

    sendJson(res, 200, { success: true, admin: sanitizeAdmin(admin) });
    return;
  }

  // POST /api/auth/logout
  if (url === '/api/auth/logout' && req.method === 'POST') {
    if (token) {
      await deleteSession(db, token);
      if (session) {
        await logAudit(db, session.username, session.username, 'Logged out');
      }
    }
    sendJson(res, 200, { success: true });
    return;
  }

  // ==========================================
  // ADMIN PROFILE & PASSWORD
  // ==========================================

  // PUT /api/admin/profile
  if (url === '/api/admin/profile' && req.method === 'PUT') {
    if (!session) {
      sendJson(res, 401, { success: false, error: 'Unauthorized' });
      return;
    }

    try {
      const { username, displayName } = await parseRequestBody(req);
      const adminsCol = getAdminsCollection(db);
      const current = await adminsCol.findOne({
        $or: [
          { id: session.id },
          { username: { $regex: new RegExp(`^${session.username}$`, 'i') } },
        ],
      });

      if (!current) {
        sendJson(res, 404, { success: false, error: 'Admin account not found' });
        return;
      }

      const updates: Partial<AdminDocument> = {};
      if (displayName && typeof displayName === 'string') {
        updates.displayName = displayName.trim();
      }

      if (username && typeof username === 'string') {
        const cleanUser = username.trim().toLowerCase();
        if (cleanUser.length < 3) {
          sendJson(res, 400, { success: false, error: 'Username must be at least 3 characters' });
          return;
        }

        if (cleanUser !== current.username.toLowerCase()) {
          const existing = await adminsCol.findOne({
            username: cleanUser,
            id: { $ne: current.id },
          });
          if (existing) {
            sendJson(res, 400, { success: false, error: 'Username is already taken' });
            return;
          }
          updates.username = cleanUser;
        }
      }

      if (Object.keys(updates).length > 0) {
        await adminsCol.updateOne({ id: current.id }, { $set: updates });
        const updated = await adminsCol.findOne({ id: current.id });
        // Synchronize active sessions for this admin
        const sessionsCol = getSessionsCollection(db);
        await sessionsCol.updateMany(
          { adminId: current.id },
          {
            $set: {
              username: updated!.username,
              displayName: updated!.displayName,
            },
          }
        );
        await logAudit(db, session.username, current.username, 'Updated profile details');
        sendJson(res, 200, { success: true, admin: sanitizeAdmin(updated!) });
      } else {
        sendJson(res, 200, { success: true, admin: sanitizeAdmin(current) });
      }
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // POST /api/admin/change-password
  if (url === '/api/admin/change-password' && req.method === 'POST') {
    if (!session) {
      sendJson(res, 401, { success: false, error: 'Unauthorized' });
      return;
    }

    try {
      const { currentPassword, newPassword } = await parseRequestBody(req);
      if (!currentPassword || !newPassword) {
        sendJson(res, 400, {
          success: false,
          error: 'Current password and new password are required',
        });
        return;
      }

      if (typeof newPassword !== 'string' || newPassword.length < 6) {
        sendJson(res, 400, {
          success: false,
          error: 'New password must be at least 6 characters long',
        });
        return;
      }

      const adminsCol = getAdminsCollection(db);
      const current = await adminsCol.findOne({
        $or: [
          { id: session.id },
          { username: { $regex: new RegExp(`^${session.username}$`, 'i') } },
        ],
      });
      if (!current) {
        sendJson(res, 404, { success: false, error: 'Admin account not found' });
        return;
      }

      const isValid = verifyPassword(currentPassword, current.passwordHash);
      if (!isValid) {
        sendJson(res, 401, { success: false, error: 'Current password is incorrect' });
        return;
      }

      const newHash = hashPassword(newPassword);
      await adminsCol.updateOne({ id: current.id }, { $set: { passwordHash: newHash } });
      await logAudit(db, session.username, current.username, 'Changed own password');

      sendJson(res, 200, { success: true });
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // ==========================================
  // ADMIN MANAGEMENT (Super Admin Only)
  // ==========================================

  // GET /api/admin/accounts
  if (url === '/api/admin/accounts' && req.method === 'GET') {
    if (!session || session.role !== 'Super Admin') {
      sendJson(res, 403, { success: false, error: 'Access restricted to Super Administrators' });
      return;
    }

    const adminsCol = getAdminsCollection(db);
    const list = await adminsCol.find().toArray();
    sendJson(res, 200, list.map(sanitizeAdmin));
    return;
  }

  // POST /api/admin/accounts
  if (url === '/api/admin/accounts' && req.method === 'POST') {
    if (!session || session.role !== 'Super Admin') {
      sendJson(res, 403, { success: false, error: 'Access restricted to Super Administrators' });
      return;
    }

    try {
      const { username, displayName, password, role } = await parseRequestBody(req);
      const cleanUser = (username || '').trim().toLowerCase();

      if (!cleanUser || !password || !displayName) {
        sendJson(res, 400, {
          success: false,
          error: 'Username, display name, and password are required',
        });
        return;
      }

      if (cleanUser.length < 3) {
        sendJson(res, 400, { success: false, error: 'Username must be at least 3 characters' });
        return;
      }

      if (password.length < 6) {
        sendJson(res, 400, { success: false, error: 'Password must be at least 6 characters' });
        return;
      }

      const adminsCol = getAdminsCollection(db);
      const existing = await adminsCol.findOne({ username: cleanUser });
      if (existing) {
        sendJson(res, 400, { success: false, error: 'An admin with this username already exists' });
        return;
      }

      const newAdmin: AdminDocument = {
        id: `admin_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        username: cleanUser,
        displayName: displayName.trim(),
        passwordHash: hashPassword(password),
        role: role === 'Content Admin' ? 'Content Admin' : 'Super Admin',
        status: 'Active',
        createdAt: new Date().toISOString(),
        lastLogin: null,
      };

      await adminsCol.insertOne(newAdmin);
      await logAudit(
        db,
        session.username,
        cleanUser,
        'Created new administrator',
        `Role: ${newAdmin.role}`
      );

      sendJson(res, 201, { success: true, admin: sanitizeAdmin(newAdmin) });
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // PUT /api/admin/accounts/:id
  if (url.startsWith('/api/admin/accounts/') && req.method === 'PUT') {
    if (!session || session.role !== 'Super Admin') {
      sendJson(res, 403, { success: false, error: 'Access restricted to Super Administrators' });
      return;
    }

    try {
      const rawId = url.replace('/api/admin/accounts/', '');
      const id = decodeURIComponent(rawId).replace(/\/$/, '').trim();
      const { status, role, displayName, newPassword } = await parseRequestBody(req);

      const adminsCol = getAdminsCollection(db);
      const target = await adminsCol.findOne({
        $or: [
          { id: id },
          { username: { $regex: new RegExp(`^${id}$`, 'i') } },
        ],
      });
      if (!target) {
        sendJson(res, 404, { success: false, error: 'Admin account not found' });
        return;
      }

      const updates: Partial<AdminDocument> = {};
      if (status && (status === 'Active' || status === 'Inactive')) {
        updates.status = status;
      }
      if (role && (role === 'Super Admin' || role === 'Content Admin')) {
        updates.role = role;
      }
      if (displayName && typeof displayName === 'string') {
        updates.displayName = displayName.trim();
      }
      if (newPassword && typeof newPassword === 'string' && newPassword.length >= 6) {
        updates.passwordHash = hashPassword(newPassword);
      }

      if (Object.keys(updates).length > 0) {
        await adminsCol.updateOne({ id: target.id }, { $set: updates });
        const updated = await adminsCol.findOne({ id: target.id });
        if (updates.displayName) {
          const sessionsCol = getSessionsCollection(db);
          await sessionsCol.updateMany(
            { adminId: target.id },
            { $set: { displayName: updated!.displayName } }
          );
        }
        await logAudit(
          db,
          session.username,
          target.username,
          'Updated administrator account',
          JSON.stringify(Object.keys(updates))
        );
        sendJson(res, 200, { success: true, admin: sanitizeAdmin(updated!) });
      } else {
        sendJson(res, 200, { success: true, admin: sanitizeAdmin(target) });
      }
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // DELETE /api/admin/accounts/:id
  if (url.startsWith('/api/admin/accounts/') && req.method === 'DELETE') {
    if (!session || session.role !== 'Super Admin') {
      sendJson(res, 403, { success: false, error: 'Access restricted to Super Administrators' });
      return;
    }

    try {
      const rawId = url.replace('/api/admin/accounts/', '');
      const id = decodeURIComponent(rawId).replace(/\/$/, '').trim();
      const adminsCol = getAdminsCollection(db);
      const target = await adminsCol.findOne({
        $or: [
          { id: id },
          { username: { $regex: new RegExp(`^${id}$`, 'i') } },
        ],
      });

      if (!target) {
        sendJson(res, 404, { success: false, error: 'Admin account not found' });
        return;
      }

      if (target.id === session.id || target.username.toLowerCase() === session.username.toLowerCase()) {
        sendJson(res, 400, { success: false, error: 'You cannot delete your own account' });
        return;
      }

      await adminsCol.deleteOne({ id: target.id });
      const sessionsCol = getSessionsCollection(db);
      await sessionsCol.deleteMany({ adminId: target.id });
      await logAudit(db, session.username, target.username, 'Deleted administrator account');
      sendJson(res, 200, { success: true });
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // ==========================================
  // AUDIT LOGS
  // ==========================================

  // GET /api/admin/audit-logs
  if (url === '/api/admin/audit-logs' && req.method === 'GET') {
    if (!session) {
      sendJson(res, 401, { success: false, error: 'Unauthorized' });
      return;
    }

    const auditCol = getAuditLogsCollection(db);
    const logs = await auditCol.find().sort({ timestamp: -1 }).limit(200).toArray();
    sendJson(res, 200, logs);
    return;
  }

  // DELETE /api/admin/audit-logs
  if (url === '/api/admin/audit-logs' && req.method === 'DELETE') {
    if (!session || session.role !== 'Super Admin') {
      sendJson(res, 403, { success: false, error: 'Access restricted to Super Administrators' });
      return;
    }

    const auditCol = getAuditLogsCollection(db);
    await auditCol.deleteMany({});
    await logAudit(db, session.username, 'AuditLogs', 'Cleared all audit logs');
    sendJson(res, 200, { success: true });
    return;
  }

  // ==========================================
  // WEBSITE SETTINGS & CONFIGURATION
  // ==========================================

  // GET /api/settings
  if (url === '/api/settings' && req.method === 'GET') {
    const settingsCol = getSettingsCollection(db);
    let settings = await settingsCol.findOne({ key: 'main' });
    if (!settings) {
      settings = await settingsCol.findOne({});
    }
    sendJson(res, 200, settings || {});
    return;
  }

  // POST /api/settings
  if (url === '/api/settings' && req.method === 'POST') {
    if (!session) {
      sendJson(res, 401, { success: false, error: 'Unauthorized' });
      return;
    }

    try {
      const payload = await parseRequestBody(req);
      const settingsCol = getSettingsCollection(db);

      const updateData = {
        ...payload,
        key: 'main',
        updatedAt: new Date().toISOString(),
      };
      delete updateData._id;

      await settingsCol.updateOne({ key: 'main' }, { $set: updateData }, { upsert: true });
      await logAudit(db, session.username, 'Settings', 'Updated school settings & links');

      const saved = await settingsCol.findOne({ key: 'main' });
      sendJson(res, 200, { success: true, settings: saved });
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // ==========================================
  // NEWS & NOTICES
  // ==========================================

  // GET /api/news
  if (url === '/api/news' && req.method === 'GET') {
    const newsCol = getNewsCollection(db);
    const filter = session ? {} : { published: true };
    const items = await newsCol.find(filter).sort({ date: -1 }).toArray();
    sendJson(res, 200, items);
    return;
  }

  // POST /api/news
  if (url === '/api/news' && req.method === 'POST') {
    if (!session) {
      sendJson(res, 401, { success: false, error: 'Unauthorized' });
      return;
    }

    try {
      const payload = await parseRequestBody(req);
      const newsCol = getNewsCollection(db);

      if (Array.isArray(payload)) {
        // Bulk replace/update
        await newsCol.deleteMany({});
        if (payload.length > 0) {
          await newsCol.insertMany(payload);
        }
        await logAudit(db, session.username, 'News', `Bulk updated ${payload.length} items`);
        sendJson(res, 200, { success: true, count: payload.length });
        return;
      }

      const item: NewsDocument = {
        id: payload.id || `news_${Date.now()}`,
        title: payload.title || 'Untitled Notice',
        titleMr: payload.titleMr || '',
        titleHi: payload.titleHi || '',
        excerpt: payload.excerpt || '',
        excerptMr: payload.excerptMr || '',
        excerptHi: payload.excerptHi || '',
        content: payload.content || '',
        contentMr: payload.contentMr || '',
        contentHi: payload.contentHi || '',
        date: payload.date || new Date().toISOString().split('T')[0],
        category: payload.category || 'notice',
        image: payload.image || '',
        source: payload.source || '',
        published: payload.published !== false,
        paperRotation: payload.paperRotation || '0deg',
        pinColor: payload.pinColor || 'red',
        updatedAt: new Date().toISOString(),
      };

      await newsCol.updateOne({ id: item.id }, { $set: item }, { upsert: true });
      await logAudit(db, session.username, 'News', `Saved news item: ${item.id}`);

      sendJson(res, 200, { success: true, item });
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // PUT /api/news/:id
  if (url.startsWith('/api/news/') && req.method === 'PUT') {
    if (!session) {
      sendJson(res, 401, { success: false, error: 'Unauthorized' });
      return;
    }

    try {
      const id = url.replace('/api/news/', '');
      const payload = await parseRequestBody(req);
      const newsCol = getNewsCollection(db);

      delete payload._id;
      payload.updatedAt = new Date().toISOString();

      await newsCol.updateOne({ id }, { $set: payload }, { upsert: true });
      await logAudit(db, session.username, 'News', `Updated news item: ${id}`);

      const updated = await newsCol.findOne({ id });
      sendJson(res, 200, { success: true, item: updated });
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // DELETE /api/news/:id
  if (url.startsWith('/api/news/') && req.method === 'DELETE') {
    if (!session) {
      sendJson(res, 401, { success: false, error: 'Unauthorized' });
      return;
    }

    try {
      const id = url.replace('/api/news/', '');
      const newsCol = getNewsCollection(db);
      await newsCol.deleteOne({ id });
      await logAudit(db, session.username, 'News', `Deleted news item: ${id}`);

      sendJson(res, 200, { success: true });
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // ==========================================
  // GALLERY MANAGEMENT
  // ==========================================

  // GET /api/gallery
  if (url === '/api/gallery' && req.method === 'GET') {
    const galleryCol = getGalleryCollection(db);
    const filter = session ? {} : { published: true };
    const items = await galleryCol.find(filter).toArray();
    sendJson(res, 200, items);
    return;
  }

  // POST /api/gallery
  if (url === '/api/gallery' && req.method === 'POST') {
    if (!session) {
      sendJson(res, 401, { success: false, error: 'Unauthorized' });
      return;
    }

    try {
      const payload = await parseRequestBody(req);
      const galleryCol = getGalleryCollection(db);

      if (Array.isArray(payload)) {
        await galleryCol.deleteMany({});
        if (payload.length > 0) {
          await galleryCol.insertMany(payload);
        }
        await logAudit(db, session.username, 'Gallery', `Bulk updated ${payload.length} items`);
        sendJson(res, 200, { success: true, count: payload.length });
        return;
      }

      const item: GalleryDocument = {
        id: payload.id || `gallery_${Date.now()}`,
        src: payload.src || '',
        caption: payload.caption || '',
        captionMr: payload.captionMr || '',
        captionHi: payload.captionHi || '',
        category: payload.category || 'events',
        date: payload.date || new Date().toISOString().split('T')[0],
        published: payload.published !== false,
        isAdmin: true,
        updatedAt: new Date().toISOString(),
      };

      await galleryCol.updateOne({ id: item.id }, { $set: item }, { upsert: true });
      await logAudit(db, session.username, 'Gallery', `Saved gallery item: ${item.id}`);

      sendJson(res, 200, { success: true, item });
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // PUT /api/gallery/:id
  if (url.startsWith('/api/gallery/') && req.method === 'PUT') {
    if (!session) {
      sendJson(res, 401, { success: false, error: 'Unauthorized' });
      return;
    }

    try {
      const id = url.replace('/api/gallery/', '');
      const payload = await parseRequestBody(req);
      const galleryCol = getGalleryCollection(db);

      delete payload._id;
      payload.updatedAt = new Date().toISOString();

      await galleryCol.updateOne({ id }, { $set: payload }, { upsert: true });
      await logAudit(db, session.username, 'Gallery', `Updated gallery item: ${id}`);

      const updated = await galleryCol.findOne({ id });
      sendJson(res, 200, { success: true, item: updated });
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // DELETE /api/gallery/:id
  if (url.startsWith('/api/gallery/') && req.method === 'DELETE') {
    if (!session) {
      sendJson(res, 401, { success: false, error: 'Unauthorized' });
      return;
    }

    try {
      const id = url.replace('/api/gallery/', '');
      const galleryCol = getGalleryCollection(db);
      await galleryCol.deleteOne({ id });
      await logAudit(db, session.username, 'Gallery', `Deleted gallery item: ${id}`);

      sendJson(res, 200, { success: true });
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // ==========================================
  // ADMISSION & CONTACT ENQUIRIES
  // ==========================================

  // POST /api/enquiries (Public, rate-limited)
  if (url === '/api/enquiries' && req.method === 'POST') {
    if (!checkRateLimit(req, 10, 60000)) {
      sendJson(res, 429, {
        success: false,
        error: 'Too many submissions. Please wait a minute before submitting again.',
      });
      return;
    }

    try {
      const payload = await parseRequestBody(req);
      const { parentName, studentName, phone, email, classGrade, message } = payload;

      if (!parentName || !phone) {
        sendJson(res, 400, {
          success: false,
          error: 'Parent/Guardian name and contact phone number are required',
        });
        return;
      }

      const enquiry: EnquiryDocument = {
        id: `enquiry_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        parentName: String(parentName).trim(),
        studentName: String(studentName || '').trim(),
        phone: String(phone).trim(),
        email: String(email || '').trim(),
        classGrade: String(classGrade || '1').trim(),
        message: String(message || '').trim(),
        submittedAt: new Date().toISOString(),
        status: 'new',
      };

      const enquiriesCol = getEnquiriesCollection(db);
      await enquiriesCol.insertOne(enquiry);

      sendJson(res, 201, { success: true, id: enquiry.id });
    } catch (e: any) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // GET /api/admin/enquiries (Admin only)
  if (url === '/api/admin/enquiries' && req.method === 'GET') {
    if (!session) {
      sendJson(res, 401, { success: false, error: 'Unauthorized' });
      return;
    }

    const enquiriesCol = getEnquiriesCollection(db);
    const list = await enquiriesCol.find().sort({ submittedAt: -1 }).toArray();
    sendJson(res, 200, list);
    return;
  }

  // DELETE /api/admin/enquiries/:id (Admin only)
  if (url.startsWith('/api/admin/enquiries/') && req.method === 'DELETE') {
    if (!session) {
      sendJson(res, 401, { success: false, error: 'Unauthorized' });
      return;
    }

    const id = url.replace('/api/admin/enquiries/', '');
    const enquiriesCol = getEnquiriesCollection(db);
    await enquiriesCol.deleteOne({ id });
    await logAudit(db, session.username, 'Enquiries', `Deleted enquiry ${id}`);
    sendJson(res, 200, { success: true });
    return;
  }

  // Fallback 404 for unmatched /api routes
  sendJson(res, 404, { success: false, error: `Route ${req.method} ${url} not found` });
}
