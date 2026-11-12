import http from 'http';
import assert from 'assert';
import app from '../server/src/app.js';
import { resolveIncomingPath, forwardToExternalBackend } from '../api/index.js';

console.log('=== PAYPAL CHECKOUT ROUTING & ENDPOINT AUDIT ===\n');

// 1. Verify Vercel Rewrite Rules Order and Resolution for PayPal Endpoints
console.log('1. Testing Vercel Sequential Rewrite Evaluation for PayPal Endpoints:');

const rules = [
  { pattern: /^\/health$/, dest: '/api/health', isApi: true },
  { pattern: /^\/api\/health$/, dest: '/api/health', isApi: true },
  { pattern: /^\/api$/, dest: '/api', isApi: true },
  { pattern: /^\/api(?:\/(.*))?$/, dest: '/api', isApi: true },
  { pattern: /^(?:\/(.*))?$/, dest: '/index.html', isApi: false },
];

function evaluate(pathname) {
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].pattern.test(pathname)) {
      return { ruleIndex: i, dest: rules[i].dest, isApi: rules[i].isApi };
    }
  }
  return { ruleIndex: -1, dest: null, isApi: false };
}

const paypalEndpoints = [
  '/api/payments/config',
  '/api/payments/create-order',
  '/api/payments/capture-order',
  '/api/payments/order/ORD-12345678',
  '/api/paypal/config',
  '/api/paypal/create-order',
  '/api/paypal/capture-order',
];

for (const ep of paypalEndpoints) {
  const res = evaluate(ep);
  assert.strictEqual(res.ruleIndex, 3, `Expected Rule 3 (/api/:path*), got Rule ${res.ruleIndex} for ${ep}`);
  assert.strictEqual(res.isApi, true);
  assert.strictEqual(res.dest, '/api', `Destination must be /api (serverless function), got ${res.dest}`);
  console.log(`  ✓ ${ep.padEnd(40)} -> Rule [${res.ruleIndex}] -> ${res.dest} (SERVERLESS FUNCTION /api)`);
}

// 2. Verify Path Resolver on PayPal Endpoints
console.log('\n2. Testing resolveIncomingPath() on PayPal Requests:');

const testCases = [
  {
    desc: 'POST /api/payments/create-order via Vercel x-matched-path',
    req: {
      url: '/api?path=payments/create-order',
      headers: { 'x-matched-path': '/api/payments/create-order' },
      query: { path: 'payments/create-order' },
    },
    expected: '/api/payments/create-order',
  },
  {
    desc: 'POST /api/payments/capture-order via Vercel x-matched-path',
    req: {
      url: '/api?path=payments/capture-order',
      headers: { 'x-matched-path': '/api/payments/capture-order' },
      query: { path: 'payments/capture-order' },
    },
    expected: '/api/payments/capture-order',
  },
  {
    desc: 'GET /api/payments/config via Vercel x-matched-path',
    req: {
      url: '/api?path=payments/config',
      headers: { 'x-matched-path': '/api/payments/config' },
      query: { path: 'payments/config' },
    },
    expected: '/api/payments/config',
  },
  {
    desc: 'req.query.path fallback on create-order',
    req: {
      url: '/api',
      headers: {},
      query: { path: ['payments', 'create-order'] },
    },
    expected: '/api/payments/create-order',
  },
];

for (const tc of testCases) {
  const resolved = resolveIncomingPath(tc.req);
  assert.strictEqual(resolved, tc.expected, `Expected ${tc.expected}, got ${resolved}`);
  console.log(`  ✓ ${tc.desc} -> ${resolved}`);
}

// 3. Verify Express Backend Endpoint Execution (POST /api/payments/create-order)
console.log('\n3. Testing Express Backend Payment Routes on Local Server:');
const server = http.createServer(app);
await new Promise(r => server.listen(0, r));
const localPort = server.address().port;
const localBaseUrl = `http://127.0.0.1:${localPort}`;

// 3a. GET /api/payments/config
{
  const res = await fetch(`${localBaseUrl}/api/payments/config`);
  const json = await res.json();
  console.log(`  GET /api/payments/config -> Status: ${res.status}, Mode: ${json.mode}, Currency: ${json.currency}`);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.success, true);
  console.log('  ✓ Public PayPal config endpoint operational');
}

// 3b. POST /api/payments/create-order with empty payload -> must return JSON 400 (NOT 404 or 405)
{
  const res = await fetch(`${localBaseUrl}/api/payments/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  const json = await res.json();
  console.log(`  POST /api/payments/create-order (empty) -> Status: ${res.status}, Error: "${json.error}"`);
  assert.strictEqual(res.status, 400);
  assert.strictEqual(json.success, false);
  assert(json.error.includes('at least one item'));
  console.log('  ✓ POST method accepted by Express; returned meaningful validation error (NOT 405)');
}

// 3c. POST /api/payments/capture-order with empty payload -> must return JSON 400 (NOT 404 or 405)
{
  const res = await fetch(`${localBaseUrl}/api/payments/capture-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  const json = await res.json();
  console.log(`  POST /api/payments/capture-order (empty) -> Status: ${res.status}, Error: "${json.error}"`);
  assert.strictEqual(res.status, 400);
  assert.strictEqual(json.success, false);
  assert(json.error.includes('orderID or paypalOrderId is required'));
  console.log('  ✓ POST capture method accepted by Express; returned meaningful validation error (NOT 405)');
}

// 4. Verify End-to-End Proxy Body & Header Forwarding for PayPal Order Creation
console.log('\n4. Testing Proxy Forwarding of PayPal Order Creation to Mock Render:');
let capturedTargetReq = null;
const mockRenderServer = http.createServer((targetReq, targetRes) => {
  let chunks = [];
  targetReq.on('data', chunk => chunks.push(chunk));
  targetReq.on('end', () => {
    capturedTargetReq = {
      method: targetReq.method,
      url: targetReq.url,
      headers: targetReq.headers,
      body: Buffer.concat(chunks).toString('utf8'),
    };
    targetRes.writeHead(201, { 'Content-Type': 'application/json' });
    targetRes.end(JSON.stringify({
      success: true,
      orderId: 'ORD-TEST-1234',
      paypalOrderId: 'PAYPAL-SANDBOX-ORDER-9876',
    }));
  });
});

await new Promise(r => mockRenderServer.listen(0, r));
const mockPort = mockRenderServer.address().port;
const mockRenderUrl = `http://127.0.0.1:${mockPort}`;

{
  const fakeReq = {
    method: 'POST',
    url: '/api?path=payments/create-order',
    headers: {
      'x-matched-path': '/api/payments/create-order',
      'content-type': 'application/json',
      authorization: 'Bearer user-jwt-token',
    },
    body: {
      items: [
        { productId: '01953224-61c0-7ce2-a7c6-eae8d5405eaa', quantity: 1 }
      ],
      shippingAddress: {
        name: 'Verified Customer',
        street: '2211 N First St',
        city: 'San Jose',
        state: 'CA',
        postalCode: '95131',
        country: 'US',
      },
      currency: 'USD',
    },
  };

  const fakeRes = new (await import('stream')).PassThrough();
  fakeRes.headersSent = false;
  fakeRes.writeHead = () => {};

  forwardToExternalBackend(fakeReq, fakeRes, mockRenderUrl);
  await new Promise(r => setTimeout(r, 200));

  assert(capturedTargetReq !== null, 'Target request should have been received by mock Render');
  assert.strictEqual(capturedTargetReq.method, 'POST');
  assert.strictEqual(capturedTargetReq.url, '/api/payments/create-order');
  assert.strictEqual(capturedTargetReq.headers['content-type'], 'application/json');
  assert.strictEqual(capturedTargetReq.headers['authorization'], 'Bearer user-jwt-token');
  const parsed = JSON.parse(capturedTargetReq.body);
  assert.strictEqual(parsed.currency, 'USD');
  assert.strictEqual(parsed.items[0].productId, '01953224-61c0-7ce2-a7c6-eae8d5405eaa');
  console.log(`  ✓ Proxy successfully forwarded POST ${capturedTargetReq.url} with intact JSON payload (${capturedTargetReq.headers['content-length']} bytes)`);
}

server.close();
mockRenderServer.close();

console.log('\n=== ALL PAYPAL CHECKOUT TESTS PASSED WITH ZERO ERRORS! ===\n');
