import { getHealth } from '../server/src/controllers/healthController.js';
import { isOriginAllowed } from '../server/src/app.js';
import { forwardToExternalBackend } from './index.js';

/**
 * Dedicated Vercel Serverless Health Function
 * Serves /health and /api/health
 * - When RENDER_API_URL is set: Proxies to Render backend /health
 * - When RENDER_API_URL is not set: Executes local getHealth check
 */
export default async function handler(req, res) {
  const backendUrl = (process.env.RENDER_API_URL || process.env.RAILWAY_API_URL)?.trim();
  if (backendUrl) {
    return forwardToExternalBackend(req, res, backendUrl);
  }

  const origin = req.headers?.origin;
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD, OPTIONS');
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed`,
    });
  }

  return getHealth(req, res);
}

