import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

function apiBackendPlugin(): Plugin {
  const dataDir = path.resolve(import.meta.dirname, 'data');
  const settingsPath = path.join(dataDir, 'settings.json');
  const newsPath = path.join(dataDir, 'news.json');
  const galleryPath = path.join(dataDir, 'gallery.json');
  const adminsPath = path.join(dataDir, 'admins.json');
  const auditPath = path.join(dataDir, 'audit.json');

  // In-memory active sessions: token -> { id, username, role, displayName, expiresAt }
  const activeSessions = new Map<string, { id: string; username: string; role: string; displayName: string; expiresAt: number }>();

  // In-memory rate limiting map for login and sensitive actions: ip -> { count, resetTime }
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

  const hashPassword = (password: string): string => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  };

  const verifyPassword = (password: string, stored: string): boolean => {
    try {
      const [salt, hash] = stored.split(':');
      if (!salt || !hash) return false;
      const computed = crypto.scryptSync(password, salt, 64).toString('hex');
      return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(computed, 'hex'));
    } catch {
      return false;
    }
  };

  const readJson = (file: string, fallback: any) => {
    try {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf-8');
        return content ? JSON.parse(content) : fallback;
      }
    } catch (e) {
      console.error(`Failed to read ${file}:`, e);
    }
    return fallback;
  };

  const writeJson = (file: string, data: any) => {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  };

  const logAudit = (actor: string, target: string, action: string, details?: string) => {
    try {
      const logs = readJson(auditPath, []);
      const entry = {
        id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: new Date().toISOString(),
        actor,
        target,
        action,
        details: details || '',
      };
      logs.unshift(entry);
      // Keep last 200 audit entries
      if (logs.length > 200) logs.length = 200;
      writeJson(auditPath, logs);
    } catch (e) {
      console.error('Failed to log audit event:', e);
    }
  };

  const parseBody = (req: any): Promise<any> => {
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
  };

  // Extract authenticated session from request
  const getSession = (req: any) => {
    const authHeader = req.headers['authorization'] || '';
    const adminToken = req.headers['x-admin-token'] || '';
    let token = '';
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7).trim();
    } else if (adminToken) {
      token = adminToken;
    }

    if (!token) return null;

    // Check in-memory active session
    const session = activeSessions.get(token);
    if (session) {
      if (Date.now() > session.expiresAt) {
        activeSessions.delete(token);
        return null;
      }
      return session;
    }

    // Fallback for root dev token compatibility
    if (token === 'spps_admin_secret_2026') {
      return { id: 'admin_super_1', username: 'admin', role: 'Super Admin', displayName: 'Super Administrator', expiresAt: Date.now() + 86400000 };
    }

    return null;
  };

  const checkRateLimit = (req: any, maxAttempts = 10, windowMs = 60000): boolean => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'localhost';
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
  };

  // Sanitize admin object before returning to client (NEVER return password hashes)
  const sanitizeAdmin = (admin: any) => {
    const { passwordHash, ...safe } = admin;
    return safe;
  };

  const configureMiddleware = (server: any) => {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      const url = req.url ? req.url.split('?')[0] : '';
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Token');

      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        return res.end();
      }

      // --- AUTH: Login endpoint with Scrypt Verification & Rate Limiting ---
      if (url === '/api/auth/login' && req.method === 'POST') {
        if (!checkRateLimit(req, 8, 60000)) {
          res.statusCode = 429;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: false, error: 'Too many login attempts. Please wait 1 minute.' }));
        }

        try {
          const { username, password } = await parseBody(req);
          const admins = readJson(adminsPath, []);

          // Find admin by username (case-insensitive)
          const admin = admins.find((a: any) => a.username.toLowerCase() === (username || '').toLowerCase().trim());

          if (!admin) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: false, error: 'Invalid username or password' }));
          }

          if (admin.status === 'Inactive') {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: false, error: 'Account is deactivated. Contact a Super Admin.' }));
          }

          const isValid = verifyPassword(password || '', admin.passwordHash);
          if (!isValid) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: false, error: 'Invalid username or password' }));
          }

          // Generate secure session token
          const token = crypto.randomBytes(32).toString('hex');
          const session = {
            id: admin.id,
            username: admin.username,
            role: admin.role,
            displayName: admin.displayName,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
          };
          activeSessions.set(token, session);

          // Update last login
          admin.lastLogin = new Date().toISOString();
          writeJson(adminsPath, admins);

          logAudit(admin.username, admin.username, 'Login successful');

          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({
            success: true,
            token,
            admin: sanitizeAdmin(admin),
          }));
        } catch (e: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: e.message }));
        }
      }

      // --- AUTH: Get Current User (Session verification) ---
      if (url === '/api/auth/me' && req.method === 'GET') {
        const session = getSession(req);
        if (!session) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Unauthorized' }));
        }
        const admins = readJson(adminsPath, []);
        const admin = admins.find((a: any) => a.id === session.id);
        if (!admin || admin.status === 'Inactive') {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Account inactive or not found' }));
        }
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ success: true, admin: sanitizeAdmin(admin) }));
      }

      // --- AUTH: Logout ---
      if (url === '/api/auth/logout' && req.method === 'POST') {
        const authHeader = req.headers['authorization'] || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : req.headers['x-admin-token'];
        if (token) activeSessions.delete(token);
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ success: true }));
      }

      // --- PROFILE: Update Username & Display Name ---
      if (url === '/api/admin/profile' && req.method === 'PUT') {
        const session = getSession(req);
        if (!session) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Unauthorized' }));
        }

        try {
          const { username, displayName } = await parseBody(req);
          const admins = readJson(adminsPath, []);
          const admin = admins.find((a: any) => a.id === session.id);
          if (!admin) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: 'Admin account not found' }));
          }

          const newUsername = (username || '').trim().toLowerCase();
          if (!newUsername || newUsername.length < 3) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'Username must be at least 3 characters' }));
          }

          // Check if username is taken by someone else
          const taken = admins.find((a: any) => a.id !== session.id && a.username.toLowerCase() === newUsername);
          if (taken) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'Username is already taken by another account' }));
          }

          const oldUsername = admin.username;
          admin.username = newUsername;
          if (displayName && displayName.trim()) {
            admin.displayName = displayName.trim();
          }

          // Update active session metadata
          session.username = admin.username;
          session.displayName = admin.displayName;

          writeJson(adminsPath, admins);
          logAudit(oldUsername, admin.username, 'Profile updated', `Username changed from ${oldUsername} to ${admin.username}`);

          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, admin: sanitizeAdmin(admin) }));
        } catch (e: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: e.message }));
        }
      }

      // --- PROFILE: Change Password ---
      if (url === '/api/admin/change-password' && req.method === 'POST') {
        const session = getSession(req);
        if (!session) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Unauthorized' }));
        }

        try {
          const { currentPassword, newPassword } = await parseBody(req);
          const admins = readJson(adminsPath, []);
          const admin = admins.find((a: any) => a.id === session.id);
          if (!admin) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: 'Admin account not found' }));
          }

          if (!verifyPassword(currentPassword || '', admin.passwordHash)) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'Incorrect current password' }));
          }

          if (!newPassword || newPassword.length < 6) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'New password must be at least 6 characters' }));
          }

          admin.passwordHash = hashPassword(newPassword);
          writeJson(adminsPath, admins);

          logAudit(session.username, admin.username, 'Password changed');

          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, message: 'Password updated successfully' }));
        } catch (e: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: e.message }));
        }
      }

      // --- ADMIN MANAGEMENT: List Accounts (Super Admin Only) ---
      if (url === '/api/admin/accounts' && req.method === 'GET') {
        const session = getSession(req);
        if (!session || session.role !== 'Super Admin') {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Forbidden: Requires Super Admin privileges' }));
        }

        const admins = readJson(adminsPath, []);
        const sanitized = admins.map(sanitizeAdmin);
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(sanitized));
      }

      // --- ADMIN MANAGEMENT: Create Account (Super Admin Only) ---
      if (url === '/api/admin/accounts' && req.method === 'POST') {
        const session = getSession(req);
        if (!session || session.role !== 'Super Admin') {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Forbidden: Requires Super Admin privileges' }));
        }

        try {
          const { username, displayName, password, role } = await parseBody(req);

          const cleanUsername = (username || '').trim().toLowerCase();
          if (!cleanUsername || cleanUsername.length < 3) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'Username must be at least 3 characters' }));
          }

          if (!password || password.length < 6) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'Password must be at least 6 characters' }));
          }

          const admins = readJson(adminsPath, []);
          if (admins.some((a: any) => a.username.toLowerCase() === cleanUsername)) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'Username already exists' }));
          }

          const newAdmin = {
            id: `admin_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            username: cleanUsername,
            displayName: (displayName || cleanUsername).trim(),
            passwordHash: hashPassword(password),
            role: role === 'Super Admin' ? 'Super Admin' : 'Content Admin',
            status: 'Active',
            createdAt: new Date().toISOString(),
            lastLogin: null,
          };

          admins.push(newAdmin);
          writeJson(adminsPath, admins);

          logAudit(session.username, cleanUsername, 'Administrator account created', `Role: ${newAdmin.role}`);

          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, admin: sanitizeAdmin(newAdmin) }));
        } catch (e: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: e.message }));
        }
      }

      // --- ADMIN MANAGEMENT: Update / Toggle / Reset (Super Admin Only) ---
      if (url.startsWith('/api/admin/accounts/') && req.method === 'PUT') {
        const session = getSession(req);
        if (!session || session.role !== 'Super Admin') {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Forbidden: Requires Super Admin privileges' }));
        }

        try {
          const id = url.replace('/api/admin/accounts/', '');
          const body = await parseBody(req);
          const admins = readJson(adminsPath, []);
          const target = admins.find((a: any) => a.id === id);

          if (!target) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: 'Account not found' }));
          }

          // Safety rule: Prevent deactivating the last active Super Admin
          if (body.status === 'Inactive' && target.role === 'Super Admin') {
            const activeSuperAdmins = admins.filter((a: any) => a.role === 'Super Admin' && a.status === 'Active');
            if (activeSuperAdmins.length <= 1 && activeSuperAdmins[0].id === target.id) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Cannot deactivate the last active Super Admin account' }));
            }
          }

          // Safety rule: Prevent demoting the last active Super Admin
          if (body.role && body.role !== 'Super Admin' && target.role === 'Super Admin') {
            const activeSuperAdmins = admins.filter((a: any) => a.role === 'Super Admin' && a.status === 'Active');
            if (activeSuperAdmins.length <= 1 && activeSuperAdmins[0].id === target.id) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Cannot demote the last active Super Admin account' }));
            }
          }

          if (body.displayName !== undefined) target.displayName = body.displayName.trim();
          if (body.role !== undefined) target.role = body.role === 'Super Admin' ? 'Super Admin' : 'Content Admin';
          if (body.status !== undefined) target.status = body.status === 'Inactive' ? 'Inactive' : 'Active';
          if (body.newPassword) {
            if (body.newPassword.length < 6) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Password must be at least 6 characters' }));
            }
            target.passwordHash = hashPassword(body.newPassword);
            logAudit(session.username, target.username, 'Password reset by admin');
          }

          // If deactivated, revoke their active sessions
          if (target.status === 'Inactive') {
            for (const [token, sess] of activeSessions.entries()) {
              if (sess.id === target.id) {
                activeSessions.delete(token);
              }
            }
          }

          writeJson(adminsPath, admins);
          logAudit(session.username, target.username, 'Admin account updated', `Status: ${target.status}, Role: ${target.role}`);

          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, admin: sanitizeAdmin(target) }));
        } catch (e: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: e.message }));
        }
      }

      // --- ADMIN MANAGEMENT: Delete Account (Super Admin Only) ---
      if (url.startsWith('/api/admin/accounts/') && req.method === 'DELETE') {
        const session = getSession(req);
        if (!session || session.role !== 'Super Admin') {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Forbidden: Requires Super Admin privileges' }));
        }

        try {
          const id = url.replace('/api/admin/accounts/', '');
          const admins = readJson(adminsPath, []);
          const targetIndex = admins.findIndex((a: any) => a.id === id);

          if (targetIndex === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: 'Account not found' }));
          }

          const target = admins[targetIndex];

          // Cannot delete yourself
          if (target.id === session.id) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'You cannot delete your own account while logged in' }));
          }

          // Safety rule: Prevent deleting the last active Super Admin
          if (target.role === 'Super Admin') {
            const activeSuperAdmins = admins.filter((a: any) => a.role === 'Super Admin' && a.status === 'Active');
            if (activeSuperAdmins.length <= 1) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Cannot delete the only remaining active Super Admin account' }));
            }
          }

          // Revoke any active sessions for this deleted user
          for (const [token, sess] of activeSessions.entries()) {
            if (sess.id === target.id) {
              activeSessions.delete(token);
            }
          }

          admins.splice(targetIndex, 1);
          writeJson(adminsPath, admins);

          logAudit(session.username, target.username, 'Administrator account deleted');

          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, id }));
        } catch (e: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: e.message }));
        }
      }

      // --- ADMIN MANAGEMENT: Audit Logs (Super Admin Only) ---
      if (url === '/api/admin/audit-logs' && req.method === 'GET') {
        const session = getSession(req);
        if (!session || session.role !== 'Super Admin') {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Forbidden' }));
        }
        const logs = readJson(auditPath, []);
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(logs));
      }

      // --- ADMIN MANAGEMENT: Clear Audit Logs (Super Admin Only) ---
      if (url === '/api/admin/audit-logs' && req.method === 'DELETE') {
        const session = getSession(req);
        if (!session || session.role !== 'Super Admin') {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Forbidden: Requires Super Admin privileges' }));
        }

        try {
          // Clear and record the clear action itself
          const freshLog = [
            {
              id: `audit_${Date.now()}`,
              timestamp: new Date().toISOString(),
              actor: session.username,
              target: 'audit_logs',
              action: 'Audit logs cleared by Super Admin',
              details: 'Previous log history cleared',
            },
          ];
          writeJson(auditPath, freshLog);

          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, logs: freshLog }));
        } catch (e: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: e.message }));
        }
      }

      // --- SETTINGS (Protected) ---
      if (url === '/api/settings' && req.method === 'GET') {
        const settings = readJson(settingsPath, {});
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(settings));
      }

      if (url === '/api/settings' && req.method === 'POST') {
        const session = getSession(req);
        if (!session) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }));
        }
        // Super Admin or authorized Content Admin
        try {
          const body = await parseBody(req);
          writeJson(settingsPath, body);
          logAudit(session.username, 'settings', 'School settings updated');
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, settings: body }));
        } catch (err: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: err.message }));
        }
      }

      // --- NEWS & NOTICES ---
      if (url === '/api/news' && req.method === 'GET') {
        const news = readJson(newsPath, []);
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(news));
      }

      if (url === '/api/news' && req.method === 'POST') {
        const session = getSession(req);
        if (!session) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Unauthorized' }));
        }
        try {
          const body = await parseBody(req);
          if (Array.isArray(body)) {
            writeJson(newsPath, body);
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, count: body.length }));
          } else {
            const newItem = body;
            const currentNews = readJson(newsPath, []);
            const updated = [newItem, ...currentNews.filter((n: any) => n.id !== newItem.id)];
            writeJson(newsPath, updated);
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, item: newItem }));
          }
        } catch (err: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: err.message }));
        }
      }

      if (url.startsWith('/api/news/') && req.method === 'PUT') {
        const session = getSession(req);
        if (!session) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Unauthorized' }));
        }
        try {
          const id = url.replace('/api/news/', '');
          const body = await parseBody(req);
          const currentNews = readJson(newsPath, []);
          const updated = currentNews.map((item: any) => (item.id === id ? { ...item, ...body } : item));
          writeJson(newsPath, updated);
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, item: { ...body, id } }));
        } catch (err: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: err.message }));
        }
      }

      if (url.startsWith('/api/news/') && req.method === 'DELETE') {
        const session = getSession(req);
        if (!session) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Unauthorized' }));
        }
        try {
          const id = url.replace('/api/news/', '');
          const currentNews = readJson(newsPath, []);
          const updated = currentNews.filter((item: any) => item.id !== id);
          writeJson(newsPath, updated);
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, id }));
        } catch (err: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: err.message }));
        }
      }

      // --- GALLERY ---
      if (url === '/api/gallery' && req.method === 'GET') {
        const gallery = readJson(galleryPath, []);
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(gallery));
      }

      if (url === '/api/gallery' && req.method === 'POST') {
        const session = getSession(req);
        if (!session) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Unauthorized' }));
        }
        try {
          const body = await parseBody(req);
          if (Array.isArray(body)) {
            writeJson(galleryPath, body);
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, count: body.length }));
          } else {
            const newItem = body;
            const currentGallery = readJson(galleryPath, []);
            const updated = [newItem, ...currentGallery.filter((g: any) => g.id !== newItem.id)];
            writeJson(galleryPath, updated);
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, item: newItem }));
          }
        } catch (err: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: err.message }));
        }
      }

      if (url.startsWith('/api/gallery/') && req.method === 'PUT') {
        const session = getSession(req);
        if (!session) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Unauthorized' }));
        }
        try {
          const id = url.replace('/api/gallery/', '');
          const body = await parseBody(req);
          const currentGallery = readJson(galleryPath, []);
          const updated = currentGallery.map((item: any) => (item.id === id ? { ...item, ...body } : item));
          writeJson(galleryPath, updated);
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, item: { ...body, id } }));
        } catch (err: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: err.message }));
        }
      }

      if (url.startsWith('/api/gallery/') && req.method === 'DELETE') {
        const session = getSession(req);
        if (!session) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Unauthorized' }));
        }
        try {
          const id = url.replace('/api/gallery/', '');
          const currentGallery = readJson(galleryPath, []);
          const updated = currentGallery.filter((item: any) => item.id !== id);
          writeJson(galleryPath, updated);
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, id }));
        } catch (err: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: err.message }));
        }
      }

      next();
    });
  };

  return {
    name: 'api-backend-plugin',
    configureServer(server) {
      configureMiddleware(server);
    },
    configurePreviewServer(server) {
      configureMiddleware(server);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiBackendPlugin()],
});
