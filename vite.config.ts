import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { handleApiRequest } from './server/apiHandler.ts';

function apiBackendPlugin(): Plugin {
  const middleware = (server: any) => {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      const url = req.url ? req.url.split('?')[0] : '';
      if (url.startsWith('/api')) {
        try {
          await handleApiRequest(req, res);
        } catch (err: any) {
          console.error('[API Middleware] Error handling request:', err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message || 'Internal server error' }));
          }
        }
        return;
      }
      next();
    });
  };

  return {
    name: 'api-backend-plugin',
    configureServer(server) {
      middleware(server);
    },
    configurePreviewServer(server) {
      middleware(server);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env files (.env, .env.local, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  // Pass MongoDB configuration into process.env for server modules
  if (env.MONGODB_URI && !process.env.MONGODB_URI) {
    process.env.MONGODB_URI = env.MONGODB_URI;
  }
  if (env.MONGODB_DB_NAME && !process.env.MONGODB_DB_NAME) {
    process.env.MONGODB_DB_NAME = env.MONGODB_DB_NAME;
  }
  if (env.SESSION_SECRET && !process.env.SESSION_SECRET) {
    process.env.SESSION_SECRET = env.SESSION_SECRET;
  }
  if (env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  }

  return {
    plugins: [react(), apiBackendPlugin()],
  };
});
