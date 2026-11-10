import https from 'https';
import http from 'http';
import { URL } from 'url';
import app from '../server/src/app.js';

/**
 * High-fidelity reverse proxy to forward requests to an external backend (e.g. Railway)
 * Preserves HTTP method, headers, query strings, and body streaming
 */
export function forwardToExternalBackend(req, res, targetBaseUrl) {
  try {
    const target = new URL(targetBaseUrl);
    const targetPath = req.url || '';

    // Clone incoming headers and set Host to target domain
    const headers = { ...req.headers };
    headers.host = target.host;
    if (!headers['x-forwarded-host']) {
      headers['x-forwarded-host'] = req.headers['host'] || '';
    }
    if (!headers['x-forwarded-proto']) {
      headers['x-forwarded-proto'] = 'https';
    }

    const options = {
      protocol: target.protocol,
      hostname: target.hostname,
      port: target.port || (target.protocol === 'https:' ? 443 : 80),
      method: req.method,
      path: targetPath,
      headers,
    };

    const client = target.protocol === 'https:' ? https : http;
    const proxyReq = client.request(options, (proxyRes) => {
      // Forward status code and all headers (including Set-Cookie, Content-Type)
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      console.error('[Vercel->Railway Proxy Error]:', err.message);
      if (!res.headersSent) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Bad Gateway: Unable to reach Railway backend service.',
          details: err.message,
          timestamp: new Date().toISOString(),
        }));
      }
    });

    // Pipe the request body directly (JSON, form data, streams)
    req.pipe(proxyReq, { end: true });
  } catch (err) {
    console.error('[Vercel->Railway Proxy Exception]:', err.message);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: 'Proxy Configuration Error: Invalid RAILWAY_API_URL.',
        details: err.message,
      }));
    }
  }
}

/**
 * CartPilot AI - Vercel Serverless Function Entrypoint
 * - When RAILWAY_API_URL is set: Transparently proxies to Railway backend
 * - When RAILWAY_API_URL is not set: Runs embedded Express app serverlessly
 */
export default async function handler(req, res) {
  const railwayUrl = process.env.RAILWAY_API_URL?.trim();

  if (railwayUrl) {
    return forwardToExternalBackend(req, res, railwayUrl);
  }

  return app(req, res);
}
