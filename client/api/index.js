import https from 'https';
import http from 'http';
import { URL } from 'url';

/**
 * Resolves the true intended request path from Vercel edge headers,
 * query parameters (catch-all segments), or raw request URL.
 */
export function resolveIncomingPath(req) {
  const matchedPath = req.headers?.['x-matched-path'];
  const forwardedUri = req.headers?.['x-forwarded-uri'];
  const invokePath = req.headers?.['x-invoke-path'];

  let candidate = '';
  if (
    matchedPath &&
    !matchedPath.includes('[...all]') &&
    !matchedPath.endsWith('/api/index.js') &&
    !matchedPath.endsWith('/api/index') &&
    !matchedPath.endsWith('/api/health.js')
  ) {
    candidate = matchedPath;
  } else if (
    forwardedUri &&
    !forwardedUri.includes('[...all]') &&
    !forwardedUri.endsWith('/api/index.js') &&
    !forwardedUri.endsWith('/api/index')
  ) {
    candidate = forwardedUri;
  } else if (
    invokePath &&
    !invokePath.includes('[...all]') &&
    !invokePath.endsWith('/api/index.js') &&
    !invokePath.endsWith('/api/index')
  ) {
    candidate = invokePath;
  } else if (req.query?.all) {
    const segments = Array.isArray(req.query.all) ? req.query.all.join('/') : req.query.all;
    candidate = `/api/${segments}`;
  } else if (req.query?.match) {
    const segments = Array.isArray(req.query.match) ? req.query.match.join('/') : req.query.match;
    candidate = `/api/${segments}`;
  } else if (req.query?.path) {
    const segments = Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path;
    candidate = `/api/${segments}`;
  } else {
    candidate = req.url || '/api';
    const qIndex = candidate.indexOf('?');
    if (qIndex !== -1) {
      candidate = candidate.slice(0, qIndex);
    }
    if (
      candidate === '/api/index.js' ||
      candidate === '/api/index' ||
      candidate.includes('[...all]')
    ) {
      candidate = '/api';
    } else if (candidate === '/api/health.js' || candidate === '/api/health') {
      candidate = '/health';
    }
  }

  if (!candidate.startsWith('/')) {
    candidate = `/${candidate}`;
  }

  const rawUrl = req.url || '';
  const qIndex = rawUrl.indexOf('?');
  if (qIndex !== -1) {
    const searchParams = new URLSearchParams(rawUrl.slice(qIndex + 1));
    searchParams.delete('all');
    searchParams.delete('match');
    searchParams.delete('path');
    searchParams.delete('slug');
    const filtered = searchParams.toString();
    if (filtered) {
      candidate += `?${filtered}`;
    }
  }

  return candidate;
}

/**
 * High-fidelity reverse proxy to forward requests to external backend (Render)
 */
export function forwardToExternalBackend(req, res, targetBaseUrl) {
  try {
    const target = new URL(targetBaseUrl);
    const basePath = target.pathname === '/' ? '' : target.pathname.replace(/\/$/, '');

    const incomingPath = resolveIncomingPath(req);
    const targetPath = `${basePath}${incomingPath}`;

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
    } else if (typeof req.pipe === 'function') {
      req.pipe(proxyReq, { end: true });
    } else {
      proxyReq.end();
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

export default async function handler(req, res) {
  const backendUrl = (process.env.RENDER_API_URL || process.env.RAILWAY_API_URL)?.trim();

  if (backendUrl) {
    return forwardToExternalBackend(req, res, backendUrl);
  }

  res.writeHead(503, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: false,
    error: 'RENDER_API_URL is not configured in Vercel environment variables.',
    timestamp: new Date().toISOString(),
  }));
}
