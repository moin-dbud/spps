import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function apiBackendPlugin(): Plugin {
  const dataDir = path.resolve(import.meta.dirname, 'data');
  const settingsPath = path.join(dataDir, 'settings.json');
  const newsPath = path.join(dataDir, 'news.json');
  const galleryPath = path.join(dataDir, 'gallery.json');

  const ADMIN_SECRET = 'spps_admin_secret_2026';

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

  const isAuthorized = (req: any): boolean => {
    const authHeader = req.headers['authorization'] || '';
    const adminToken = req.headers['x-admin-token'] || '';
    return authHeader === `Bearer ${ADMIN_SECRET}` || adminToken === ADMIN_SECRET;
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

      // --- AUTH CHECK: Login endpoint ---
      if (url === '/api/auth/login' && req.method === 'POST') {
        try {
          const { password } = await parseBody(req);
          if (password === 'admin123' || password === 'spps2026') {
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, token: ADMIN_SECRET }));
          }
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: false, error: 'Invalid password' }));
        } catch (e: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: e.message }));
        }
      }

      // --- SETTINGS ---
      // GET /api/settings (public)
      if (url === '/api/settings' && req.method === 'GET') {
        const settings = readJson(settingsPath, {});
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(settings));
      }

      // POST /api/settings (protected)
      if (url === '/api/settings' && req.method === 'POST') {
        if (!isAuthorized(req)) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }));
        }
        try {
          const body = await parseBody(req);
          writeJson(settingsPath, body);
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, settings: body }));
        } catch (err: any) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: err.message }));
        }
      }

      // --- NEWS & NOTICES ---
      // GET /api/news (public)
      if (url === '/api/news' && req.method === 'GET') {
        const news = readJson(newsPath, []);
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(news));
      }

      // POST /api/news (create or batch save, protected)
      if (url === '/api/news' && req.method === 'POST') {
        if (!isAuthorized(req)) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Unauthorized' }));
        }
        try {
          const body = await parseBody(req);
          if (Array.isArray(body)) {
            // Full array replacement
            writeJson(newsPath, body);
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, count: body.length }));
          } else {
            // Single new item
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

      // PUT /api/news/:id (protected)
      if (url.startsWith('/api/news/') && req.method === 'PUT') {
        if (!isAuthorized(req)) {
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

      // DELETE /api/news/:id (protected)
      if (url.startsWith('/api/news/') && req.method === 'DELETE') {
        if (!isAuthorized(req)) {
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
      // GET /api/gallery (public)
      if (url === '/api/gallery' && req.method === 'GET') {
        const gallery = readJson(galleryPath, []);
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(gallery));
      }

      // POST /api/gallery (create or batch save, protected)
      if (url === '/api/gallery' && req.method === 'POST') {
        if (!isAuthorized(req)) {
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

      // PUT /api/gallery/:id (protected)
      if (url.startsWith('/api/gallery/') && req.method === 'PUT') {
        if (!isAuthorized(req)) {
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

      // DELETE /api/gallery/:id (protected)
      if (url.startsWith('/api/gallery/') && req.method === 'DELETE') {
        if (!isAuthorized(req)) {
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
