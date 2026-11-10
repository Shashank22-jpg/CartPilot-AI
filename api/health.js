import { getHealth } from '../server/src/controllers/healthController.js';
import { isOriginAllowed } from '../server/src/app.js';

/**
 * Dedicated Vercel Serverless Health Function
 * Serves /health and /api/health with database and service status
 */
export default async function handler(req, res) {
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

