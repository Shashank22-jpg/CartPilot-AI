import http from 'http';
import assert from 'assert';
import { resolveIncomingPath, forwardToExternalBackend } from '../api/index.js';
import { resolveIncomingPath as clientResolve, forwardToExternalBackend as clientForward } from '../client/api/index.js';

console.log('=== RUNNING NESTED ROUTING & PROXY VERIFICATION AUDIT ===\n');

// -------------------------------------------------------------
// Test 1: Rewrite Negative Lookahead & Fallback Regex
// -------------------------------------------------------------
console.log('1. Testing SPA Fallback Rewrite Regex:');
const spaExcludeRegex = /^\/((?!api($|\/)|health($|\/)).*)$/;

const testRoutes = [
  // Must NOT match SPA fallback (MUST go to API / Render)
  { path: '/api', expectSPA: false },
  { path: '/api/', expectSPA: false },
  { path: '/api/auth/register', expectSPA: false },
  { path: '/api/auth/login', expectSPA: false },
  { path: '/api/auth/me', expectSPA: false },
  { path: '/api/products', expectSPA: false },
  { path: '/api/products/aptdot', expectSPA: false },
  { path: '/api/products/01953224-61c0-7ce2-a7c6-eae8d5405eaa', expectSPA: false },
  { path: '/api/cart', expectSPA: false },
  { path: '/api/orders', expectSPA: false },
  { path: '/api/orders/passports', expectSPA: false },
  { path: '/api/payments/create-order', expectSPA: false },
  { path: '/api/payments/capture-order', expectSPA: false },
  { path: '/api/ai/chat', expectSPA: false },
  { path: '/api/ai/prompts', expectSPA: false },
  { path: '/health', expectSPA: false },
  { path: '/health/', expectSPA: false },
  { path: '/api/health', expectSPA: false },

  // MUST match SPA fallback (Frontend routes -> index.html)
  { path: '/', expectSPA: true },
  { path: '/register', expectSPA: true },
  { path: '/login', expectSPA: true },
  { path: '/dashboard', expectSPA: true },
  { path: '/discover', expectSPA: true },
  { path: '/compare', expectSPA: true },
  { path: '/intelligence', expectSPA: true },
  { path: '/cart', expectSPA: true },
  { path: '/orders', expectSPA: true },
  { path: '/passports', expectSPA: true },
  { path: '/settings', expectSPA: true },
];

for (const { path, expectSPA } of testRoutes) {
  const isSPA = spaExcludeRegex.test(path);
  assert.strictEqual(isSPA, expectSPA, `Path ${path} expected expectSPA=${expectSPA}, got ${isSPA}`);
  console.log(`  ✓ ${path.padEnd(55)} -> ${isSPA ? 'Frontend SPA (index.html)' : 'API / Backend (PROXY)'}`);
}

// -------------------------------------------------------------
// Test 2: resolveIncomingPath on Nested and Parameterized Routes
// -------------------------------------------------------------
console.log('\n2. Testing resolveIncomingPath() with Vercel Rewrite Headers & Query:');

const resolutionCases = [
  // Scenario A: x-matched-path provided by Vercel edge
  {
    desc: 'x-matched-path on nested POST /api/auth/register',
    req: {
      url: '/api/[...all]?all=auth&all=register',
      headers: { 'x-matched-path': '/api/auth/register' },
      query: { all: ['auth', 'register'] },
    },
    expected: '/api/auth/register',
  },
  // Scenario B: nested GET with query parameters
  {
    desc: 'nested GET /api/products with query string and Vercel internal query',
    req: {
      url: '/api/[...all]?all=products&catalogue=aptdot&limit=50',
      headers: { 'x-matched-path': '/api/products' },
      query: { all: ['products'] },
    },
    expected: '/api/products?catalogue=aptdot&limit=50',
  },
  // Scenario C: req.query.all fallback (no x-matched-path)
  {
    desc: 'req.query.all fallback on /api/orders/passports',
    req: {
      url: '/api/[...all]',
      headers: {},
      query: { all: ['orders', 'passports'] },
    },
    expected: '/api/orders/passports',
  },
  // Scenario D: payments create-order POST
  {
    desc: 'x-matched-path on /api/payments/create-order',
    req: {
      url: '/api/[...all]?all=payments&all=create-order',
      headers: { 'x-matched-path': '/api/payments/create-order' },
      query: { all: ['payments', 'create-order'] },
    },
    expected: '/api/payments/create-order',
  },
  // Scenario E: Dedicated /health endpoint
  {
    desc: 'direct /health check',
    req: {
      url: '/health',
      headers: { 'x-matched-path': '/health' },
    },
    expected: '/health',
  },
  // Scenario F: Dedicated /api/health endpoint
  {
    desc: 'direct /api/health check',
    req: {
      url: '/api/health',
      headers: { 'x-matched-path': '/api/health' },
    },
    expected: '/api/health',
  },
];

for (const testCase of resolutionCases) {
  const rootResult = resolveIncomingPath(testCase.req);
  assert.strictEqual(rootResult, testCase.expected, `Root resolver failed on "${testCase.desc}": got ${rootResult}, expected ${testCase.expected}`);

  const clientResult = clientResolve(testCase.req);
  assert.strictEqual(clientResult, testCase.expected, `Client resolver failed on "${testCase.desc}": got ${clientResult}, expected ${testCase.expected}`);

  console.log(`  ✓ ${testCase.desc} -> ${rootResult}`);
}

// -------------------------------------------------------------
// Test 3: End-to-End Mock Render Proxy with Request Payload & Headers
// -------------------------------------------------------------
console.log('\n3. Testing End-to-End HTTP Method, Body, and Header Forwarding to Mock Render:');

let capturedTargetReq = null;
const mockRenderServer = http.createServer((targetReq, targetRes) => {
  let bodyChunks = [];
  targetReq.on('data', chunk => bodyChunks.push(chunk));
  targetReq.on('end', () => {
    const rawBody = Buffer.concat(bodyChunks).toString('utf8');
    capturedTargetReq = {
      method: targetReq.method,
      url: targetReq.url,
      headers: targetReq.headers,
      body: rawBody,
    };
    targetRes.writeHead(201, {
      'Content-Type': 'application/json',
      'X-Render-Mock': 'true',
    });
    targetRes.end(JSON.stringify({ success: true, message: 'Received by mock Render' }));
  });
});

await new Promise(r => mockRenderServer.listen(0, r));
const mockPort = mockRenderServer.address().port;
const mockRenderUrl = `http://127.0.0.1:${mockPort}`;

// Test 3a: POST /api/auth/register with user payload
{
  capturedTargetReq = null;
  const fakeReq = {
    method: 'POST',
    url: '/api/[...all]?all=auth&all=register',
    headers: {
      'x-matched-path': '/api/auth/register',
      'content-type': 'application/json',
      authorization: 'Bearer mock-client-token',
      'user-agent': 'DevTools-Chrome/128.0',
    },
    body: {
      fullName: 'Jane Merchant',
      email: 'jane@cartpilot.test',
      phone: '+14155552671',
      password: 'SecurePassword2026!',
    },
  };

  const fakeRes = new (await import('stream')).PassThrough();
  fakeRes.headersSent = false;
  fakeRes.writeHead = (status, headers) => {};

  forwardToExternalBackend(fakeReq, fakeRes, mockRenderUrl);
  await new Promise(r => setTimeout(r, 200));

  assert(capturedTargetReq !== null, 'Target request should have been received');
  assert.strictEqual(capturedTargetReq.method, 'POST');
  assert.strictEqual(capturedTargetReq.url, '/api/auth/register');
  assert.strictEqual(capturedTargetReq.headers['content-type'], 'application/json');
  assert.strictEqual(capturedTargetReq.headers['authorization'], 'Bearer mock-client-token');
  const parsed = JSON.parse(capturedTargetReq.body);
  assert.strictEqual(parsed.email, 'jane@cartpilot.test');
  assert.strictEqual(parsed.fullName, 'Jane Merchant');
  console.log('  ✓ POST /api/auth/register delivered to Render backend with accurate URL, JSON body & headers');
}

// Test 3b: POST /api/payments/create-order
{
  capturedTargetReq = null;
  const fakeReq = {
    method: 'POST',
    url: '/api/[...all]?all=payments&all=create-order',
    headers: {
      'x-matched-path': '/api/payments/create-order',
      'content-type': 'application/json',
    },
    body: {
      items: [{ productId: 'p-1', quantity: 1, price: 99.99 }],
      currency: 'USD',
    },
  };

  const fakeRes = new (await import('stream')).PassThrough();
  fakeRes.headersSent = false;
  fakeRes.writeHead = () => {};

  forwardToExternalBackend(fakeReq, fakeRes, mockRenderUrl);
  await new Promise(r => setTimeout(r, 200));

  assert(capturedTargetReq !== null);
  assert.strictEqual(capturedTargetReq.method, 'POST');
  assert.strictEqual(capturedTargetReq.url, '/api/payments/create-order');
  console.log('  ✓ POST /api/payments/create-order delivered to Render backend');
}

// Test 3c: GET /api/products?category=Electronics
{
  capturedTargetReq = null;
  const fakeReq = {
    method: 'GET',
    url: '/api/[...all]?all=products&category=Electronics&limit=20',
    headers: {
      'x-matched-path': '/api/products',
    },
  };

  const fakeRes = new (await import('stream')).PassThrough();
  fakeRes.headersSent = false;
  fakeRes.writeHead = () => {};

  forwardToExternalBackend(fakeReq, fakeRes, mockRenderUrl);
  await new Promise(r => setTimeout(r, 200));

  assert(capturedTargetReq !== null);
  assert.strictEqual(capturedTargetReq.method, 'GET');
  assert.strictEqual(capturedTargetReq.url, '/api/products?category=Electronics&limit=20');
  console.log('  ✓ GET /api/products with query parameters preserved: ' + capturedTargetReq.url);
}

mockRenderServer.close();

console.log('\n=== ALL NESTED ROUTING AUDIT TESTS PASSED SUCCESSFULLY! ===\n');
