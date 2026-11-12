import http from 'http';
import assert from 'assert';
import app from '../server/src/app.js';
import { forwardToExternalBackend } from '../api/index.js';

console.log('=== STARTING REGISTRATION & PROXY VERIFICATION TESTS ===\n');

// 1. Regex test for Vercel Rewrites
console.log('1. Testing Vercel Rewrite Regex:');
const spaExcludeRegex = /^\/((?!api($|\/)|health($|\/)).*)$/;

const testUrls = [
  { url: '/', shouldMatchSPA: true },
  { url: '/register', shouldMatchSPA: true },
  { url: '/login', shouldMatchSPA: true },
  { url: '/dashboard', shouldMatchSPA: true },
  { url: '/products/some-slug', shouldMatchSPA: true },
  { url: '/api', shouldMatchSPA: false },
  { url: '/api/', shouldMatchSPA: false },
  { url: '/api/auth/register', shouldMatchSPA: false },
  { url: '/api/auth/login', shouldMatchSPA: false },
  { url: '/api/products', shouldMatchSPA: false },
  { url: '/health', shouldMatchSPA: false },
  { url: '/health/', shouldMatchSPA: false },
  { url: '/api/health', shouldMatchSPA: false },
];

for (const { url, shouldMatchSPA } of testUrls) {
  const matches = spaExcludeRegex.test(url);
  assert.strictEqual(matches, shouldMatchSPA, `URL ${url} expected shouldMatchSPA=${shouldMatchSPA}, got ${matches}`);
  console.log(`  ✓ ${url.padEnd(25)} -> ${matches ? 'Rewrites to /index.html (SPA)' : 'BYPASSES SPA (Passes to API / Proxy)'}`);
}

// 2. Express Backend Registration Endpoint Method & Validation Tests
console.log('\n2. Testing Express Backend /api/auth/register:');
const server = http.createServer(app);

await new Promise((resolve) => server.listen(0, resolve));
const port = server.address().port;
const baseUrl = `http://127.0.0.1:${port}`;

// Helper fetch function
async function req(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, options);
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch {}
  return { status: res.status, headers: res.headers, text, json };
}

// 2a. POST /api/auth/register with empty body -> must return 400 JSON (NOT 404 or 405)
{
  const res = await req('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  console.log(`  POST /api/auth/register (empty body) -> Status: ${res.status}, Error: "${res.json?.error}"`);
  assert.strictEqual(res.status, 400, 'Should return HTTP 400 for missing fields');
  assert.strictEqual(res.json?.success, false);
  console.log('  ✓ POST is supported and returned meaningful validation JSON');
}

// 2b. POST /api/auth/register with invalid email -> must return 400 JSON
{
  const res = await req('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'John Doe',
      email: 'not-an-email',
      phone: '+1234567890',
      password: 'StrongPassword123!',
    }),
  });
  console.log(`  POST /api/auth/register (invalid email) -> Status: ${res.status}, Error: "${res.json?.error}"`);
  assert.strictEqual(res.status, 400);
  assert(res.json?.error?.includes('valid email'));
  console.log('  ✓ Email validation functions correctly');
}

// 2c. POST /api/auth/register with short password -> must return 400 JSON
{
  const res = await req('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      password: 'short',
    }),
  });
  console.log(`  POST /api/auth/register (short password) -> Status: ${res.status}, Error: "${res.json?.error}"`);
  assert.strictEqual(res.status, 400);
  assert(res.json?.error?.includes('8 characters'));
  console.log('  ✓ Password validation functions correctly');
}

// 3. Testing Reverse Proxy Path and Body Forwarding
console.log('\n3. Testing Vercel-to-Render Proxy Implementation:');

// Create mock Render target server
let receivedRequest = null;
const mockRenderServer = http.createServer((targetReq, targetRes) => {
  let body = '';
  targetReq.on('data', chunk => { body += chunk; });
  targetReq.on('end', () => {
    receivedRequest = {
      method: targetReq.method,
      url: targetReq.url,
      headers: targetReq.headers,
      body,
    };
    targetRes.writeHead(200, { 'Content-Type': 'application/json' });
    targetRes.end(JSON.stringify({ proxied: true, receivedUrl: targetReq.url }));
  });
});

await new Promise((resolve) => mockRenderServer.listen(0, resolve));
const mockRenderPort = mockRenderServer.address().port;
const mockRenderUrl = `http://127.0.0.1:${mockRenderPort}`;

// Test 3a: Request with Vercel rewrite headers (x-matched-path)
{
  const fakeReq = {
    method: 'POST',
    url: '/api/index.js?match=auth/register',
    headers: {
      'x-matched-path': '/api/auth/register',
      'content-type': 'application/json',
    },
    body: {
      fullName: 'Alex River',
      email: 'alex@example.com',
      phone: '+15551234567',
      password: 'SecurePassword123!',
    },
  };

  const fakeRes = new (await import('stream')).PassThrough();
  fakeRes.headersSent = false;
  fakeRes.writeHead = (code, headers) => {};

  forwardToExternalBackend(fakeReq, fakeRes, mockRenderUrl);

  // Give short delay for http client to complete
  await new Promise(r => setTimeout(r, 200));

  assert(receivedRequest !== null, 'Proxy should have delivered request to mock Render target');
  assert.strictEqual(receivedRequest.method, 'POST', 'HTTP method must be POST');
  assert.strictEqual(receivedRequest.url, '/api/auth/register', `Expected /api/auth/register, got ${receivedRequest.url}`);
  assert.strictEqual(receivedRequest.headers['content-type'], 'application/json');
  assert(Number(receivedRequest.headers['content-length']) > 0, 'Content-Length must be set');
  const parsedBody = JSON.parse(receivedRequest.body);
  assert.strictEqual(parsedBody.email, 'alex@example.com');
  console.log(`  ✓ Proxy correctly translated x-matched-path -> ${receivedRequest.url} with method ${receivedRequest.method} and body (${receivedRequest.headers['content-length']} bytes)`);
}

// Test 3b: Request with req.query.match fallback
{
  receivedRequest = null;
  const fakeReq = {
    method: 'POST',
    url: '/api/index.js?match=auth/register',
    query: { match: 'auth/register' },
    headers: {
      'content-type': 'application/json',
    },
    body: { test: 123 },
  };

  const fakeRes = new (await import('stream')).PassThrough();
  fakeRes.headersSent = false;
  fakeRes.writeHead = () => {};

  forwardToExternalBackend(fakeReq, fakeRes, mockRenderUrl);
  await new Promise(r => setTimeout(r, 200));

  assert(receivedRequest !== null);
  assert.strictEqual(receivedRequest.url, '/api/auth/register');
  console.log(`  ✓ Proxy recovered path from req.query.match -> ${receivedRequest.url}`);
}

server.close();
mockRenderServer.close();

console.log('\n=== ALL REGISTRATION & PROXY TESTS PASSED SUCCESSFULLY! ===\n');
