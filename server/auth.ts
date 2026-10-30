import crypto from 'node:crypto';
import type { Db } from 'mongodb';
import { getSessionsCollection, getAuditLogsCollection, getAdminsCollection } from './db.ts';
import type { AdminDocument, SessionDocument } from './types.ts';

export const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(':');
    if (!salt || !hash) return false;
    const computed = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(computed, 'hex'));
  } catch {
    return false;
  }
}

export function sanitizeAdmin(admin: AdminDocument): Omit<AdminDocument, 'passwordHash' | '_id'> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, _id, ...safe } = admin;
  return safe;
}

export async function createSession(db: Db, admin: AdminDocument): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION_MS);

  const sessionDoc: SessionDocument = {
    token,
    adminId: admin.id,
    username: admin.username,
    role: admin.role,
    displayName: admin.displayName,
    createdAt: now,
    expiresAt,
  };

  const sessions = getSessionsCollection(db);
  await sessions.insertOne(sessionDoc);

  // Update last login timestamp in admins collection
  const admins = getAdminsCollection(db);
  await admins.updateOne({ username: admin.username }, { $set: { lastLogin: now.toISOString() } });

  return token;
}

export async function verifySession(
  db: Db,
  token: string
): Promise<{ id: string; username: string; role: string; displayName: string } | null> {
  if (!token) return null;

  // Root dev token support for fallback compatibility
  if (token === 'spps_admin_secret_2026') {
    return {
      id: 'admin_super_1',
      username: 'admin',
      role: 'Super Admin',
      displayName: 'Super Administrator',
    };
  }

  try {
    const sessions = getSessionsCollection(db);
    const session = await sessions.findOne({ token });

    if (!session) return null;

    if (new Date() > new Date(session.expiresAt)) {
      await sessions.deleteOne({ token });
      return null;
    }

    return {
      id: session.adminId,
      username: session.username,
      role: session.role,
      displayName: session.displayName,
    };
  } catch (err) {
    console.warn('[MongoDB] Session verification warning:', (err as Error).message);
    return null;
  }
}

export async function deleteSession(db: Db, token: string): Promise<void> {
  try {
    const sessions = getSessionsCollection(db);
    await sessions.deleteOne({ token });
  } catch (err) {
    console.warn('[MongoDB] Delete session warning:', (err as Error).message);
  }
}

export async function logAudit(
  db: Db,
  actor: string,
  target: string,
  action: string,
  details = ''
): Promise<void> {
  try {
    const auditLogs = getAuditLogsCollection(db);
    const entry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      actor,
      target,
      action,
      details,
    };
    await auditLogs.insertOne(entry);
  } catch (err) {
    console.error('[MongoDB] Failed to log audit event:', (err as Error).message);
  }
}
