import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import requestLogger from './middlewares/requestLogger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import apiRouter from './routes/index.js';
import config from './config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

const app = express();

// Allowed Origins for CORS (Support same-origin, Render deployments, and local dev)
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5000',
  'http://127.0.0.1:5000',
];

// CORS Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, same-origin SPA)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.onrender.com') ||
      !config.isProduction
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Dedicated top-level health check endpoint for Render / external monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'CartPilot AI',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// API Routes (Priority 1)
app.use('/api', apiRouter);

// Strict JSON 404 for any unknown /api/* endpoint - NEVER intercepted by SPA fallback
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `API endpoint not found: ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
  });
});

// Production Frontend Static File Serving & SPA Fallback (Priority 2)
if (fs.existsSync(clientDistPath)) {
  // Serve static assets from client/dist with caching
  app.use(express.static(clientDistPath, {
    maxAge: '1d',
    index: false, // Explicitly handle index via SPA fallback
  }));

  // SPA fallback for root and all client-side React routes
  app.get('*', (req, res) => {
    const indexPath = path.join(clientDistPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Frontend build index.html not found.');
    }
  });
} else {
  // Fallback if client/dist is not built yet
  app.get('/', (req, res) => {
    res.json({
      service: 'CartPilot AI API',
      description: 'Intelligent Agentic Commerce Platform for PayPal AI Hackathon 2026',
      healthCheck: '/health',
      notice: 'Client build directory (client/dist) not found. Run "npm run build" to build frontend assets.',
      version: '1.0.0',
    });
  });
}

// Global production-safe error handler
app.use(errorHandler);

export default app;
