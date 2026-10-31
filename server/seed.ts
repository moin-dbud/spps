import fs from 'node:fs';
import path from 'node:path';
import type { Db } from 'mongodb';
import {
  getAdminsCollection,
  getSettingsCollection,
  getNewsCollection,
  getGalleryCollection,
  getAuditLogsCollection,
} from './db.ts';
import { hashPassword } from './auth.ts';
import type {
  AdminDocument,
  SettingsDocument,
  NewsDocument,
  GalleryDocument,
  AuditLogDocument,
} from './types.ts';

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return content ? (JSON.parse(content) as T) : fallback;
    }
  } catch (err) {
    console.warn(`[Seed] Could not read ${filePath}:`, (err as Error).message);
  }
  return fallback;
}

export async function seedInitialData(db: Db, baseDir?: string): Promise<{
  adminsSeeded: number;
  settingsSeeded: boolean;
  newsSeeded: number;
  gallerySeeded: number;
}> {
  const rootDir = baseDir || process.cwd();
  const dataDir = path.join(rootDir, 'data');
  const result = {
    adminsSeeded: 0,
    settingsSeeded: false,
    newsSeeded: 0,
    gallerySeeded: 0,
  };

  try {
    // 1. Seed Admins
    const adminsCol = getAdminsCollection(db);
    const adminCount = await adminsCol.countDocuments();
    if (adminCount === 0) {
      const adminsFile = path.join(dataDir, 'admins.json');
      const jsonAdmins = readJsonFile<AdminDocument[]>(adminsFile, []);

      if (jsonAdmins.length > 0) {
        await adminsCol.insertMany(jsonAdmins);
        result.adminsSeeded = jsonAdmins.length;
        console.log(`[Seed] Seeded ${jsonAdmins.length} administrators from admins.json`);
      } else {
        // Fallback default super admin
        const defaultAdmin: AdminDocument = {
          id: 'admin_super_1',
          username: 'admin',
          displayName: 'Super Administrator',
          passwordHash: hashPassword(process.env.INITIAL_ADMIN_PASSWORD || 'spps2026'),
          role: 'Super Admin',
          status: 'Active',
          createdAt: new Date().toISOString(),
          lastLogin: null,
        };
        await adminsCol.insertOne(defaultAdmin);
        result.adminsSeeded = 1;
        console.log('[Seed] Created default initial super admin account');
      }
    }

    // 2. Seed Settings
    const settingsCol = getSettingsCollection(db);
    const settingsCount = await settingsCol.countDocuments();
    if (settingsCount === 0) {
      const settingsFile = path.join(dataDir, 'settings.json');
      const jsonSettings = readJsonFile<Partial<SettingsDocument>>(settingsFile, {});

      const defaultSettings: SettingsDocument = {
        key: 'main',
        name: {
          marathi: 'पी.एम. श्री. सावित्रीबाई फुले हायस्कूल, महानगरपालिका, चंद्रपूर',
          hindi: 'पी.एम. श्री. सावित्रीबाई फुले हाई स्कूल, महानगरपालिका, चंद्रपुर',
          english: 'P.M. Shri Savitribai Phule High School, Municipal Corporation, Chandrapur',
          short: 'P.M. Shri Savitribai Phule High School',
          ...(jsonSettings.name || {}),
        },
        address: {
          line1: 'Netaji Chowk',
          area: 'Babupeth',
          city: 'Chandrapur',
          state: 'Maharashtra',
          pincode: '442403',
          fullAddress: 'Netaji Chowk, Babupeth, Chandrapur, Maharashtra 442403',
          ...(jsonSettings.address || {}),
        },
        classesServed: jsonSettings.classesServed || 'Classes 1–10 (Upper Primary & High School)',
        medium: jsonSettings.medium || 'Marathi / Semi-English',
        management: jsonSettings.management || 'Municipal Corporation, Chandrapur (मनपा)',
        contact: {
          phone: '+91 12345 67890',
          whatsapp: '+91 12345 67890',
          email: 'savitribaiphule.school@gmail.com',
          ...(jsonSettings.contact || {}),
        },
        social: {
          facebook: 'https://facebook.com/pmshrisavitribaiphulechandrapur',
          youtube: 'https://youtube.com/@pmshrisavitribaiphuleschool',
          instagram: 'https://instagram.com/pmshrisavitribaiphuleschool',
          ...(jsonSettings.social || {}),
        },
        enquiryFormUrl:
          jsonSettings.enquiryFormUrl ||
          'https://docs.google.com/forms/d/e/1FAIpQLSdoh1QzH_GNGcbcqi9AeYXjz6pSMws2QNFq7E88tQu1EvuaPw/viewform?embedded=true',
        defaultLanguage: jsonSettings.defaultLanguage || 'en',
        canonicalUrl: jsonSettings.canonicalUrl || 'https://pmshrispps-chandrapur.edu.in',
        principal: jsonSettings.principal || 'Shivlal Irpate Sir (शिवलाल इरपाते)',
        headTeacher: jsonSettings.headTeacher || 'Ajay Madot Sir (अजय माडोत)',
        academicYear: jsonSettings.academicYear || '2026-27',
        maintenanceMode: jsonSettings.maintenanceMode || false,
        maintenanceMessage: jsonSettings.maintenanceMessage || {
          english: 'Our school website is currently undergoing scheduled maintenance to improve our digital services. Please check back shortly.',
          marathi: 'शाळेची वेबसाईट सध्या नियोजित देखभालीखाली (मेंटेनन्स) आहे. नवीन अद्यतनांसह आम्ही लवकरच पूर्ववत उपलब्ध होऊ. गैरसोयीबद्दल क्षमस्व.',
          hindi: 'विद्यालय की वेबसाइट वर्तमान में निर्धारित रखरखाव के अधीन है। डिजिटल सेवाओं को बेहतर बनाने का कार्य जारी है। कृपया कुछ समय बाद पुनः प्रयास करें।',
        },
        updatedAt: new Date().toISOString(),
      };

      await settingsCol.insertOne(defaultSettings);
      result.settingsSeeded = true;
      console.log('[Seed] Seeded school settings from settings.json');
    }

    // 3. Seed News & Notices
    const newsCol = getNewsCollection(db);
    const newsCount = await newsCol.countDocuments();
    if (newsCount === 0) {
      const newsFile = path.join(dataDir, 'news.json');
      const jsonNews = readJsonFile<NewsDocument[]>(newsFile, []);
      if (jsonNews.length > 0) {
        await newsCol.insertMany(jsonNews);
        result.newsSeeded = jsonNews.length;
        console.log(`[Seed] Seeded ${jsonNews.length} news items from news.json`);
      }
    }

    // 4. Seed Gallery
    const galleryCol = getGalleryCollection(db);
    const galleryCount = await galleryCol.countDocuments();
    if (galleryCount === 0) {
      const galleryFile = path.join(dataDir, 'gallery.json');
      const jsonGallery = readJsonFile<GalleryDocument[]>(galleryFile, []);
      if (jsonGallery.length > 0) {
        await galleryCol.insertMany(jsonGallery);
        result.gallerySeeded = jsonGallery.length;
        console.log(`[Seed] Seeded ${jsonGallery.length} gallery items from gallery.json`);
      }
    }

    // 5. Seed Audit Logs
    const auditCol = getAuditLogsCollection(db);
    const auditCount = await auditCol.countDocuments();
    if (auditCount === 0) {
      const auditFile = path.join(dataDir, 'audit.json');
      const jsonAudit = readJsonFile<AuditLogDocument[]>(auditFile, []);
      if (jsonAudit.length > 0) {
        await auditCol.insertMany(jsonAudit);
        console.log(`[Seed] Seeded ${jsonAudit.length} audit log entries from audit.json`);
      }
    }
  } catch (err) {
    console.warn('[Seed] Warning during data seeding:', (err as Error).message);
  }

  return result;
}
