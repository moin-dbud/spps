import { MongoClient, Db, type Collection, ServerApiVersion } from 'mongodb';
import type {
  AdminDocument,
  SettingsDocument,
  NewsDocument,
  GalleryDocument,
  EnquiryDocument,
  AuditLogDocument,
  SessionDocument,
  StaffDocument,
  ContributionDocument,
} from './types.ts';

// Global cache for serverless environments (e.g. Vercel) and hot module reloading
interface MongoConnectionCache {
  client: MongoClient | null;
  db: Db | null;
  promise: Promise<{ client: MongoClient; db: Db }> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoConnectionCache: MongoConnectionCache | undefined;
}

const cache: MongoConnectionCache = global._mongoConnectionCache || {
  client: null,
  db: null,
  promise: null,
};

if (process.env.NODE_ENV !== 'production') {
  global._mongoConnectionCache = cache;
}

export const COLLECTIONS = {
  ADMINS: 'admins',
  SETTINGS: 'settings',
  NEWS: 'news',
  GALLERY: 'gallery',
  ENQUIRIES: 'enquiries',
  AUDIT_LOGS: 'audit_logs',
  SESSIONS: 'sessions',
  STAFF: 'staff',
  CONTRIBUTIONS: 'contributions',
} as const;

let indexesInitialized = false;

/**
 * Initializes essential indexes for collections:
 * - admins: unique index on lowercase username
 * - news: index on id, date, published
 * - gallery: index on id, category
 * - sessions: TTL index on expiresAt (auto-expiration)
 * - enquiries: index on submittedAt
 * - audit_logs: index on timestamp
 */
export async function initIndexes(db: Db): Promise<void> {
  if (indexesInitialized) return;
  try {
    const adminsCol = db.collection<AdminDocument>(COLLECTIONS.ADMINS);
    await adminsCol.createIndex({ username: 1 }, { unique: true });

    const newsCol = db.collection<NewsDocument>(COLLECTIONS.NEWS);
    await newsCol.createIndex({ id: 1 }, { unique: true });
    await newsCol.createIndex({ date: -1, published: 1 });

    const galleryCol = db.collection<GalleryDocument>(COLLECTIONS.GALLERY);
    await galleryCol.createIndex({ id: 1 }, { unique: true });
    await galleryCol.createIndex({ category: 1, published: 1 });

    const sessionsCol = db.collection<SessionDocument>(COLLECTIONS.SESSIONS);
    await sessionsCol.createIndex({ token: 1 }, { unique: true });
    // MongoDB TTL Index: automatically removes document after expiresAt
    await sessionsCol.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

    const enquiriesCol = db.collection<EnquiryDocument>(COLLECTIONS.ENQUIRIES);
    await enquiriesCol.createIndex({ submittedAt: -1 });

    const auditCol = db.collection<AuditLogDocument>(COLLECTIONS.AUDIT_LOGS);
    await auditCol.createIndex({ timestamp: -1 });

    const staffCol = db.collection<StaffDocument>(COLLECTIONS.STAFF);
    await staffCol.createIndex({ id: 1 }, { unique: true });
    await staffCol.createIndex({ displayOrder: 1, published: 1 });

    const contribCol = db.collection<ContributionDocument>(COLLECTIONS.CONTRIBUTIONS);
    await contribCol.createIndex({ id: 1 }, { unique: true });
    await contribCol.createIndex({ submittedAt: -1, status: 1 });

    indexesInitialized = true;
  } catch (err) {
    console.warn('[MongoDB] Warning initializing indexes:', (err as Error).message);
  }
}

/**
 * Connects to MongoDB, reusing client and database across invocations in serverless.
 */
export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  // If already connected and active, return cached instances
  if (cache.client && cache.db) {
    try {
      // Fast ping check to verify connection is alive
      await cache.db.command({ ping: 1 });
      return { client: cache.client, db: cache.db };
    } catch {
      // Connection dropped, recreate
      cache.client = null;
      cache.db = null;
      cache.promise = null;
    }
  }

  if (cache.promise) {
    return cache.promise;
  }

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'spps_db';

  if (!uri) {
    throw new Error(
      'MONGODB_URI is not set. Please configure MONGODB_URI in your environment variables (.env / Vercel).'
    );
  }

  cache.promise = (async () => {
    try {
      const client = new MongoClient(uri, {
        serverApi: uri.includes('mongodb+srv')
          ? {
              version: ServerApiVersion.v1,
              strict: false,
              deprecationErrors: true,
            }
          : undefined,
        maxPoolSize: 10,
        minPoolSize: 1,
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 10000,
      });

      await client.connect();
      const db = client.db(dbName);

      // Verify connection with a ping
      await db.command({ ping: 1 });

      cache.client = client;
      cache.db = db;

      // Initialize collection indexes
      await initIndexes(db);

      console.log(`[MongoDB] Successfully connected to database: "${dbName}"`);
      return { client, db };
    } catch (err: any) {
      cache.promise = null;
      cache.client = null;
      cache.db = null;
      console.error('[MongoDB] Connection failure:', err.message);
      throw new Error(`Database connection failed: ${err.message}`);
    }
  })();

  return cache.promise;
}

/**
 * Checks whether MongoDB is reachable.
 */
export async function isDbConnected(): Promise<{ connected: boolean; dbName?: string; error?: string }> {
  try {
    const { db } = await connectToDatabase();
    await db.command({ ping: 1 });
    return { connected: true, dbName: db.databaseName };
  } catch (err: any) {
    return { connected: false, error: err.message };
  }
}

// Typed Collection Getters
export function getAdminsCollection(db: Db): Collection<AdminDocument> {
  return db.collection<AdminDocument>(COLLECTIONS.ADMINS);
}

export function getSettingsCollection(db: Db): Collection<SettingsDocument> {
  return db.collection<SettingsDocument>(COLLECTIONS.SETTINGS);
}

export function getNewsCollection(db: Db): Collection<NewsDocument> {
  return db.collection<NewsDocument>(COLLECTIONS.NEWS);
}

export function getGalleryCollection(db: Db): Collection<GalleryDocument> {
  return db.collection<GalleryDocument>(COLLECTIONS.GALLERY);
}

export function getEnquiriesCollection(db: Db): Collection<EnquiryDocument> {
  return db.collection<EnquiryDocument>(COLLECTIONS.ENQUIRIES);
}

export function getAuditLogsCollection(db: Db): Collection<AuditLogDocument> {
  return db.collection<AuditLogDocument>(COLLECTIONS.AUDIT_LOGS);
}

export function getSessionsCollection(db: Db): Collection<SessionDocument> {
  return db.collection<SessionDocument>(COLLECTIONS.SESSIONS);
}

export function getStaffCollection(db: Db): Collection<StaffDocument> {
  return db.collection<StaffDocument>(COLLECTIONS.STAFF);
}

export function getContributionsCollection(db: Db): Collection<ContributionDocument> {
  return db.collection<ContributionDocument>(COLLECTIONS.CONTRIBUTIONS);
}

