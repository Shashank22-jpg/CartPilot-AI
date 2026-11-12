import https from 'https';
import http from 'http';
import { URL } from 'url';
import app from '../server/src/app.js';

/**
 * High-fidelity reverse proxy to forward requests to an external backend (e.g. Render)
 * Preserves HTTP method, headers, query strings, and body streaming
 */
export function forwardToExternalBackend(req, res, targetBaseUrl) {
  try {
    const target = new URL(targetBaseUrl);
    const basePath = target.pathname === '/' ? '' : target.pathname.replace(/\/$/, '');

    // Resolve the true client requested path from Vercel rewrite headers or req.url
    let incomingPath =
      req.headers['x-matched-path'] ||
      req.headers['x-forwarded-uri'] ||
      req.headers['x-invoke-path'] ||
      req.url ||
      '';

    // If incomingPath was rewritten to internal function path (/api/index.js), restore the intended route
    if (incomingPath.startsWith('/api/index.js')) {
      if (req.query && req.query.match) {
        const matchPart = Array.isArray(req.query.match) ? req.query.match.join('/') : req.query.match;
        incomingPath = `/api/${matchPart}`;
      } else {
        incomingPath = incomingPath.replace(/^\/api\/index\.js/, '/api');
      }
    } else if (incomingPath.startsWith('/api/health.js')) {
      incomingPath = '/health';
    }

    // Preserve original query parameters if not present in incomingPath, filtering out internal Vercel params (e.g. match)
    const reqUrl = req.url || '';
    const qIndex = reqUrl.indexOf('?');
    if (qIndex !== -1 && !incomingPath.includes('?')) {
      const searchParams = new URLSearchParams(reqUrl.slice(qIndex + 1));
      searchParams.delete('match'); // Strip Vercel rewrite capture parameter
      const filteredQuery = searchParams.toString();
      if (filteredQuery) {
        incomingPath += `?${filteredQuery}`;
      }
    }

    const targetPath = `${basePath}${incomingPath}`;

    // Prepare body payload if pre-parsed by serverless runtime
    let bodyBuffer = null;
    if (req.body !== undefined && req.body !== null) {
      if (Buffer.isBuffer(req.body)) {
        bodyBuffer = req.body;
      } else if (typeof req.body === 'string') {
        bodyBuffer = Buffer.from(req.body, 'utf8');
      } else if (typeof req.body === 'object') {
        bodyBuffer = Buffer.from(JSON.stringify(req.body), 'utf8');
      }
    }

    // Clone incoming headers and set Host to target domain
    const headers = { ...req.headers };
    headers.host = target.host;
    if (!headers['x-forwarded-host']) {
      headers['x-forwarded-host'] = req.headers['host'] || '';
    }
    if (!headers['x-forwarded-proto']) {
      headers['x-forwarded-proto'] = 'https';
    }

    if (bodyBuffer) {
      headers['content-length'] = bodyBuffer.length;
      headers['content-type'] = headers['content-type'] || 'application/json';
      delete headers['transfer-encoding'];
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
      console.error('[Vercel->Render Proxy Error]:', err.message);
      if (!res.headersSent) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Bad Gateway: Unable to reach Render backend service.',
          details: err.message,
          timestamp: new Date().toISOString(),
        }));
      }
    });

    if (bodyBuffer) {
      proxyReq.write(bodyBuffer);
      proxyReq.end();
    } else {
      req.pipe(proxyReq, { end: true });
    }
  } catch (err) {
    console.error('[Vercel->Render Proxy Exception]:', err.message);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: 'Proxy Configuration Error: Invalid RENDER_API_URL.',
        details: err.message,
      }));
    }
  }
}

/**
 * CartPilot AI - Vercel Serverless Function Entrypoint
 * - When RENDER_API_URL is set: Transparently proxies to Render backend
 * - When RENDER_API_URL is not set: Runs embedded Express app serverlessly
 */
export default async function handler(req, res) {
  const backendUrl = (process.env.RENDER_API_URL || process.env.RAILWAY_API_URL)?.trim();

  if (backendUrl) {
    return forwardToExternalBackend(req, res, backendUrl);
  }

  return app(req, res);
}

