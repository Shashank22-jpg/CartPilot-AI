import http from 'http';
import assert from 'assert';
import { resolveIncomingPath, forwardToExternalBackend } from '../api/index.js';
import { resolveIncomingPath as clientResolve, forwardToExternalBackend as clientForward } from '../client/api/index.js';

console.log('=== RUNNING SEQUENTIAL REWRITE & PROXY VERIFICATION AUDIT ===\n');

// -------------------------------------------------------------
// Test 1: Vercel Sequential Rewrite Evaluation
// -------------------------------------------------------------
console.log('1. Testing Sequential Rewrite Evaluation:');

// Simulate Vercel's sequential rewrite matching engine
const rules = [
  { sourcePattern: /^\/health$/, dest: '/api/health', isApi: true },
  { sourcePattern: /^\/api\/health$/, dest: '/api/health', isApi: true },
  { sourcePattern: /^\/api$/, dest: '/api', isApi: true },
  { sourcePattern: /^\/api(?:\/(.*))?$/, dest: '/api/:path*', isApi: true },
  { sourcePattern: /^(?:\/(.*))?$/, dest: '/index.html', isApi: false },
];

function evaluateRewrite(pathname) {
  for (let i = 0; i < rules.length; i++) {
    const r = rules[i];
    if (r.sourcePattern.test(pathname)) {
      return { matchedRule: i, dest: r.dest, isApi: r.isApi };
    }
  }
  return { matchedRule: -1, dest: null, isApi: false };
}

const testRoutes = [
  // Must be captured by API rules (Rules 0-3) -> NEVER reach Rule 4 (/index.html)
  { path: '/health', expectRule: 0, expectApi: true },
  { path: '/api/health', expectRule: 1, expectApi: true },
  { path: '/api', expectRule: 2, expectApi: true },
  { path: '/api/auth/register', expectRule: 3, expectApi: true },
  { path: '/api/auth/login', expectRule: 3, expectApi: true },
  { path: '/api/auth/me', expectRule: 3, expectApi: true },
  { path: '/api/products', expectRule: 3, expectApi: true },
  { path: '/api/products/aptdot', expectRule: 3, expectApi: true },
  { path: '/api/products/01953224-61c0-7ce2-a7c6-eae8d5405eaa', expectRule: 3, expectApi: true },
  { path: '/api/cart', expectRule: 3, expectApi: true },
  { path: '/api/orders', expectRule: 3, expectApi: true },
  { path: '/api/orders/passports', expectRule: 3, expectApi: true },
  { path: '/api/payments/create-order', expectRule: 3, expectApi: true },
  { path: '/api/payments/capture-order', expectRule: 3, expectApi: true },
  { path: '/api/ai/chat', expectRule: 3, expectApi: true },
  { path: '/api/ai/prompts', expectRule: 3, expectApi: true },

  // Must fall through to Rule 4 (Frontend SPA -> index.html)
  { path: '/', expectRule: 4, expectApi: false },
  { path: '/register', expectRule: 4, expectApi: false },
  { path: '/login', expectRule: 4, expectApi: false },
  { path: '/dashboard', expectRule: 4, expectApi: false },
  { path: '/discover', expectRule: 4, expectApi: false },
  { path: '/compare', expectRule: 4, expectApi: false },
  { path: '/intelligence', expectRule: 4, expectApi: false },
  { path: '/cart', expectRule: 4, expectApi: false },
  { path: '/orders', expectRule: 4, expectApi: false },
  { path: '/passports', expectRule: 4, expectApi: false },
  { path: '/settings', expectRule: 4, expectApi: false },
];

for (const { path, expectRule, expectApi } of testRoutes) {
  const result = evaluateRewrite(path);
  assert.strictEqual(result.matchedRule, expectRule, `Path ${path} expected rule ${expectRule}, got ${result.matchedRule}`);
  assert.strictEqual(result.isApi, expectApi, `Path ${path} expected isApi=${expectApi}, got ${result.isApi}`);
  console.log(`  ✓ ${path.padEnd(55)} -> Rule [${result.matchedRule}] (${result.dest}) [${result.isApi ? 'API PROXY' : 'SPA INDEX.HTML'}]`);
}

// -------------------------------------------------------------
// Test 2: resolveIncomingPath on Nested and Parameterized Routes
// -------------------------------------------------------------
console.log('\n2. Testing resolveIncomingPath() with Vercel Rewrite Headers & Query:');

const resolutionCases = [
  // Scenario A: x-matched-path provided by Vercel edge on POST /api/auth/register
  {
    desc: 'x-matched-path on nested POST /api/auth/register',
    req: {
      url: '/api/[...path]?path=auth&path=register',
      headers: { 'x-matched-path': '/api/auth/register' },
      query: { path: ['auth', 'register'] },
    },
    expected: '/api/auth/register',
  },
  // Scenario B: nested GET with query parameters
  {
    desc: 'nested GET /api/products with query string and Vercel internal query',
    req: {
      url: '/api/[...path]?path=products&catalogue=aptdot&limit=50',
      headers: { 'x-matched-path': '/api/products' },
      query: { path: ['products'] },
    },
    expected: '/api/products?catalogue=aptdot&limit=50',
  },
  // Scenario C: req.query.path fallback (no x-matched-path)
  {
    desc: 'req.query.path fallback on /api/orders/passports',
    req: {
      url: '/api/[...path]',
      headers: {},
      query: { path: ['orders', 'passports'] },
    },
    expected: '/api/orders/passports',
  },
  // Scenario D: payments create-order POST
  {
    desc: 'x-matched-path on /api/payments/create-order',
    req: {
      url: '/api/[...path]?path=payments&path=create-order',
      headers: { 'x-matched-path': '/api/payments/create-order' },
      query: { path: ['payments', 'create-order'] },
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
// Test 3: End-to-End Mock Render Proxy with All HTTP Methods & Payloads
// -------------------------------------------------------------
console.log('\n3. Testing HTTP Methods (POST, GET, PUT, PATCH, DELETE) and Payload Forwarding to Mock Render:');

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
    targetRes.writeHead(200, {
      'Content-Type': 'application/json',
      'X-Mock-Render': 'true',
    });
    targetRes.end(JSON.stringify({ success: true, method: targetReq.method }));
  });
});

await new Promise(r => mockRenderServer.listen(0, r));
const mockPort = mockRenderServer.address().port;
const mockRenderUrl = `http://127.0.0.1:${mockPort}`;

const methodsToTest = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'];

for (const method of methodsToTest) {
  capturedTargetReq = null;
  const fakeReq = {
    method,
    url: '/api/[...path]?path=auth&path=register',
    headers: {
      'x-matched-path': '/api/auth/register',
      'content-type': 'application/json',
      authorization: 'Bearer token-123',
    },
    body: method !== 'GET' ? { testMethod: method, payload: 'data' } : undefined,
  };

  const fakeRes = new (await import('stream')).PassThrough();
  fakeRes.headersSent = false;
  fakeRes.writeHead = (status, headers) => {};

  forwardToExternalBackend(fakeReq, fakeRes, mockRenderUrl);
  await new Promise(r => setTimeout(r, 150));

  assert(capturedTargetReq !== null, `Target request should have been received for ${method}`);
  assert.strictEqual(capturedTargetReq.method, method, `HTTP method should be ${method}`);
  assert.strictEqual(capturedTargetReq.url, '/api/auth/register');
  assert.strictEqual(capturedTargetReq.headers['authorization'], 'Bearer token-123');
  if (method !== 'GET') {
    assert(capturedTargetReq.body.includes(method), `Body should contain ${method}`);
  }
  console.log(`  ✓ ${method.padEnd(7)} forwarded with method, path, headers & body preserved`);
}

mockRenderServer.close();

console.log('\n=== ALL SEQUENTIAL ROUTING & PROXY TESTS PASSED SUCCESSFULLY! ===\n');
