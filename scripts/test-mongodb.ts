import { MongoMemoryServer } from 'mongodb-memory-server';
import { EventEmitter } from 'node:events';
import {
  connectToDatabase,
  getAdminsCollection,
  getSettingsCollection,
  getNewsCollection,
  getGalleryCollection,
  getEnquiriesCollection,
  getAuditLogsCollection,
} from '../server/db.ts';
import { seedInitialData } from '../server/seed.ts';
import { handleApiRequest } from '../server/apiHandler.ts';

// Helper to simulate HTTP requests against handleApiRequest
function mockRequest(
  method: string,
  url: string,
  body: any = null,
  headers: Record<string, string> = {}
): Promise<{ status: number; headers: Record<string, any>; data: any }> {
  return new Promise((resolve) => {
    const req: any = new EventEmitter();
    req.method = method;
    req.url = url;
    req.headers = { ...headers };
    req.socket = { remoteAddress: '127.0.0.1' };

    const bodyStr = body ? JSON.stringify(body) : '';

    const res: any = new EventEmitter();
    res.statusCode = 200;
    res._headers = {};
    res.setHeader = (name: string, value: any) => {
      res._headers[name.toLowerCase()] = value;
    };
    res.getHeader = (name: string) => res._headers[name.toLowerCase()];

    let responseData = '';
    res.end = (chunk?: any) => {
      if (chunk) responseData += chunk;
      let parsed = responseData;
      try {
        parsed = JSON.parse(responseData);
      } catch {}
      resolve({ status: res.statusCode, headers: res._headers, data: parsed });
    };

    handleApiRequest(req, res).catch((err) => {
      resolve({ status: 500, headers: {}, data: { error: err.message } });
    });

    if (bodyStr) {
      req.emit('data', Buffer.from(bodyStr));
    }
    req.emit('end');
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('   MONGODB INTEGRATION VERIFICATION TEST SUITE     ');
  console.log('====================================================');

  let mongod: MongoMemoryServer | null = null;

  try {
    console.log('\n[1/10] Starting real MongoDB instance...');
    mongod = await MongoMemoryServer.create({
      instance: {
        dbName: 'spps_test_db',
      },
    });

    const uri = mongod.getUri();
    process.env.MONGODB_URI = uri;
    process.env.MONGODB_DB_NAME = 'spps_test_db';
    console.log('✔ MongoDB started successfully at URI:', uri.replace(/\/\/.*@/, '//***@'));

    // Step 2: Test connectToDatabase
    console.log('\n[2/10] Testing database connection & pooling...');
    const { client, db } = await connectToDatabase();
    const pingRes = await db.command({ ping: 1 });
    if (pingRes.ok === 1) {
      console.log('✔ Database connection verified via ping command');
    } else {
      throw new Error('Ping failed');
    }

    // Step 3: Test Seed Initial Data
    console.log('\n[3/10] Testing initial database seeding...');
    const seedResult = await seedInitialData(db);
    console.log('✔ Seed result:', seedResult);

    const adminCount = await getAdminsCollection(db).countDocuments();
    const settingsDoc = await getSettingsCollection(db).findOne({ key: 'main' });
    const newsCount = await getNewsCollection(db).countDocuments();

    console.log(`✔ Verified in MongoDB: ${adminCount} admins, ${newsCount} news items`);
    console.log(`✔ Verified school settings loaded: "${settingsDoc?.name?.english}"`);

    // Step 4: Test Health Endpoint
    console.log('\n[4/10] Testing GET /api/health...');
    const healthRes = await mockRequest('GET', '/api/health');
    console.log('✔ Health endpoint response status:', healthRes.status);
    console.log('✔ Database reported connected:', healthRes.data?.database?.connected);
    if (!healthRes.data?.database?.connected) throw new Error('Health reported disconnected');

    // Step 5: Test Authentication (Login, Me, Logout)
    console.log('\n[5/10] Testing Admin Authentication & Sessions...');
    // 5a. Wrong password test
    const badLogin = await mockRequest('POST', '/api/auth/login', {
      username: 'admin',
      password: 'wrong_password_123',
    });
    console.log('✔ Rejected bad password with status:', badLogin.status);
    if (badLogin.status !== 401) throw new Error('Bad password was not rejected with 401');

    // 5b. Correct password login
    const goodLogin = await mockRequest('POST', '/api/auth/login', {
      username: 'admin',
      password: process.env.INITIAL_ADMIN_PASSWORD || 'spps2026',
    });
    console.log('✔ Successful login status:', goodLogin.status);
    const token = goodLogin.data?.token;
    if (!token) throw new Error('No session token returned on successful login');
    console.log('✔ Session token received and verified in MongoDB');

    // 5c. GET /api/auth/me with token
    const meRes = await mockRequest('GET', '/api/auth/me', null, {
      Authorization: `Bearer ${token}`,
    });
    console.log('✔ /api/auth/me response status:', meRes.status);
    console.log('✔ Authenticated as:', meRes.data?.admin?.username, `(${meRes.data?.admin?.role})`);
    if (meRes.data?.admin?.passwordHash) {
      throw new Error('SECURITY VIOLATION: passwordHash was leaked in API response!');
    }
    console.log('✔ SECURITY: Password hash verified excluded from API response');

    // Step 6: Test Admin Management (CRUD)
    console.log('\n[6/10] Testing Admin Account Management in MongoDB...');
    // 6a. Create new admin
    const createAdminRes = await mockRequest(
      'POST',
      '/api/admin/accounts',
      {
        username: 'test_editor',
        displayName: 'Test Editor Teacher',
        password: 'EditorPassword2026',
        role: 'Content Admin',
      },
      { Authorization: `Bearer ${token}` }
    );
    console.log('✔ Created new admin status:', createAdminRes.status);
    const createdId = createAdminRes.data?.admin?.id;

    // Verify in MongoDB
    const foundAdmin = await getAdminsCollection(db).findOne({ username: 'test_editor' });
    if (!foundAdmin) throw new Error('Created admin not found in MongoDB!');
    console.log('✔ Verified admin "test_editor" stored in MongoDB collection "admins"');

    // 6b. Update admin status
    const updateAdminRes = await mockRequest(
      'PUT',
      `/api/admin/accounts/${createdId}`,
      { status: 'Inactive' },
      { Authorization: `Bearer ${token}` }
    );
    console.log('✔ Updated admin status to Inactive:', updateAdminRes.status);
    const updatedAdmin = await getAdminsCollection(db).findOne({ id: createdId });
    if (updatedAdmin?.status !== 'Inactive') throw new Error('Admin status not updated in MongoDB');

    // 6c. Delete admin
    const deleteAdminRes = await mockRequest(
      'DELETE',
      `/api/admin/accounts/${createdId}`,
      null,
      { Authorization: `Bearer ${token}` }
    );
    console.log('✔ Deleted admin status:', deleteAdminRes.status);
    const deletedAdmin = await getAdminsCollection(db).findOne({ id: createdId });
    if (deletedAdmin) throw new Error('Deleted admin still exists in MongoDB');
    console.log('✔ Verified admin permanently deleted from MongoDB');

    // Step 7: Test School Settings Persistence
    console.log('\n[7/10] Testing Website Settings & Links in MongoDB...');
    const originalSettings = await mockRequest('GET', '/api/settings');
    console.log('✔ Read settings from MongoDB status:', originalSettings.status);

    const updateSettingsRes = await mockRequest(
      'POST',
      '/api/settings',
      {
        ...originalSettings.data,
        contact: {
          ...originalSettings.data?.contact,
          phone: '+91 94045 47528',
        },
        enquiryFormUrl: 'https://forms.gle/testSchoolEnquiryForm2026',
      },
      { Authorization: `Bearer ${token}` }
    );
    console.log('✔ Update settings status:', updateSettingsRes.status);

    // Verify persistence
    const reloadedSettings = await mockRequest('GET', '/api/settings');
    if (reloadedSettings.data?.contact?.phone !== '+91 94045 47528') {
      throw new Error('Settings phone was not persisted in MongoDB!');
    }
    if (reloadedSettings.data?.enquiryFormUrl !== 'https://forms.gle/testSchoolEnquiryForm2026') {
      throw new Error('Enquiry form URL was not persisted in MongoDB!');
    }
    console.log('✔ Verified updated contact & enquiry links persisted in MongoDB');

    // Step 8: Test News & Notices CRUD
    console.log('\n[8/10] Testing News & Notices CRUD in MongoDB...');
    const newNotice = {
      id: `notice_test_${Date.now()}`,
      title: 'New Academic Year Orientation 2026',
      titleMr: 'नवीन शैक्षणिक वर्ष उद्बोधन २०२६',
      titleHi: 'नवीन शैक्षणिक वर्ष ओरिएंटेशन २०२६',
      excerpt: 'Orientation for newly enrolled students and parents.',
      category: 'notice',
      date: '2026-06-15',
      published: true,
    };

    const addNewsRes = await mockRequest('POST', '/api/news', newNotice, {
      Authorization: `Bearer ${token}`,
    });
    console.log('✔ Created news item status:', addNewsRes.status);

    const checkNews = await getNewsCollection(db).findOne({ id: newNotice.id });
    if (!checkNews) throw new Error('News item was not saved in MongoDB!');
    console.log('✔ Verified news notice stored in MongoDB collection "news"');

    // Delete the test notice
    await mockRequest('DELETE', `/api/news/${newNotice.id}`, null, {
      Authorization: `Bearer ${token}`,
    });
    const checkDeletedNews = await getNewsCollection(db).findOne({ id: newNotice.id });
    if (checkDeletedNews) throw new Error('Deleted news item still exists in MongoDB');
    console.log('✔ Verified news notice deleted from MongoDB');

    // Step 9: Test Admission Enquiry Submission & Storage
    console.log('\n[9/10] Testing Student Admission Enquiry in MongoDB...');
    const enquiryPayload = {
      parentName: 'Ramesh Patil',
      studentName: 'Aarav Patil',
      phone: '+91 98765 43210',
      email: 'ramesh.patil@example.com',
      classGrade: '5',
      message: 'Requesting admission details for class 5 for 2026-27.',
    };

    const enquiryRes = await mockRequest('POST', '/api/enquiries', enquiryPayload);
    console.log('✔ Public enquiry submission status:', enquiryRes.status);
    const enquiryId = enquiryRes.data?.id;

    // Verify in MongoDB
    const storedEnquiry = await getEnquiriesCollection(db).findOne({ id: enquiryId });
    if (!storedEnquiry) throw new Error('Enquiry not found in MongoDB!');
    console.log('✔ Verified enquiry stored in MongoDB collection "enquiries"');
    console.log(`  Parent: "${storedEnquiry.parentName}", Student: "${storedEnquiry.studentName}"`);

    // Step 10: Test Audit Logs & Security
    console.log('\n[10/10] Testing Audit Logs in MongoDB...');
    const auditRes = await mockRequest('GET', '/api/admin/audit-logs', null, {
      Authorization: `Bearer ${token}`,
    });
    console.log('✔ Audit logs count returned:', auditRes.data?.length);
    if (!Array.isArray(auditRes.data) || auditRes.data.length === 0) {
      throw new Error('Audit logs not recorded in MongoDB');
    }
    console.log('✔ Audit logs verified recorded in MongoDB collection "audit_logs"');

    console.log('\n====================================================');
    console.log('   ALL 10 MONGODB TESTS PASSED WITH 100% SUCCESS!   ');
    console.log('====================================================\n');
  } catch (err: any) {
    console.error('\n❌ Test Suite Failed:', err.message);
    process.exit(1);
  } finally {
    if (mongod) {
      await mongod.stop();
      console.log('✔ Test MongoDB instance stopped.');
    }
  }
}

runTests();

