import { forwardToExternalBackend } from './index.js';

export default async function handler(req, res) {
  const backendUrl = (process.env.RENDER_API_URL || process.env.RAILWAY_API_URL)?.trim();
  if (backendUrl) {
    return forwardToExternalBackend(req, res, backendUrl);
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    service: 'CartPilot AI API Gateway',
    status: 'ok',
    mode: 'client-edge',
    timestamp: new Date().toISOString(),
  }));
}
