import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import requestLogger from './middlewares/requestLogger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { getHealth } from './controllers/healthController.js';
import apiRouter from './routes/index.js';
import config from './config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

const app = express();

// Allowed Origins for CORS
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5000',
  'http://127.0.0.1:5000',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
].filter(Boolean);

/**
 * Validates whether an incoming HTTP origin is permitted
 */
export function isOriginAllowed(origin) {
  // 1. Allow same-origin / server-to-server / curl requests with no origin header
  if (!origin) return true;

  const normalized = origin.trim().replace(/\/$/, '');

  // 2. Allow configured production client URL (safely normalize origin even if path was included)
  if (config.clientUrl) {
    try {
      const parsedOrigin = new URL(config.clientUrl).origin;
      if (normalized === parsedOrigin || normalized === config.clientUrl.trim().replace(/\/$/, '')) {
        return true;
      }
    } catch {
      if (normalized === config.clientUrl.trim().replace(/\/$/, '')) {
        return true;
      }
    }
  }

  // 3. Allow standard Vercel deployments (*.vercel.app)
  if (/^https:\/\/[a-z0-9_-]+\.vercel\.app$/i.test(normalized)) {
    return true;
  }

  // 4. Allow standard Render deployments (*.onrender.com)
  if (/^https:\/\/[a-z0-9_-]+\.onrender\.com$/i.test(normalized)) {
    return true;
  }

  // 4. Allow explicit development origins
  if (allowedOrigins.includes(normalized)) {
    return true;
  }

  // 5. In non-production environments, allow any localhost/127.0.0.1 port
  if (!config.isProduction && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(normalized)) {
    return true;
  }

  return false;
}

// CORS Middleware with strict origin validation and credentials support
app.use(cors({
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }
    const corsError = new Error(`CORS blocked: Origin ${origin} not permitted.`);
    corsError.status = 403;
    return callback(corsError);
  },
  credentials: true,
}));

// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Dedicated health check endpoint (returns JSON with database and integrations status)
app.get('/health', getHealth);

// API Root descriptor endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    service: 'CartPilot AI API',
    status: 'ok',
    documentation: '/api/health',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Mount core API master router
app.use('/api', apiRouter);

// Strict JSON 404 for unknown /api/* endpoints
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `API endpoint not found: ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend static build if client/dist exists (Fullstack Render / Production mode)
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  // SPA fallback for non-API client GET routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/health') {
      return next();
    }
    const indexPath = path.join(clientDistPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
    return next();
  });
} else {
  // Pure JSON API descriptor fallback when frontend static build is not present
  app.get('/', (req, res) => {
    res.status(200).json({
      service: 'CartPilot AI API',
      status: 'ok',
      healthCheck: '/health',
      apiRoot: '/api',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  });
}

// Catch-all 404 for any remaining unhandled routes on the Express API
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
  });
});

// Global production-safe error handler
app.use(errorHandler);

export default app;
