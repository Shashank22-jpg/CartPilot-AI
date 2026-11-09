import express from 'express';
import cors from 'cors';
import requestLogger from './middlewares/requestLogger.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import apiRouter from './routes/index.js';
import config from './config/env.js';

const app = express();

// Middlewares
app.use(cors({
  origin: [config.clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// API Root Router
app.use('/api', apiRouter);

// Root index endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'CartPilot AI API',
    description: 'Intelligent Agentic Commerce Platform for PayPal AI Hackathon 2026',
    healthCheck: '/api/health',
    version: '1.0.0',
    documentation: 'See README.md for complete endpoints',
  });
});

// Fallback error and 404 handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
