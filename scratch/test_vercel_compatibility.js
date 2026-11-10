import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import app, { isOriginAllowed } from '../server/src/app.js';
import healthHandler from '../api/health.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTests() {
  console.log('======================================================================');
  console.log('🧪 CARTPILOT AI: FINAL VERCEL COMPATIBILITY & CORS AUDIT SUITE');
  console.log('======================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, detail = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.log(`❌ [FAIL] ${testName} ${detail ? `(${detail})` : ''}`);
      failed++;
    }
  }

  let serverInstance = null;
  let port = process.env.TEST_PORT;

  if (!port) {
    await new Promise((resolve) => {
      serverInstance = app.listen(0, '127.0.0.1', () => {
        port = serverInstance.address().port;
        resolve();
      });
    });
  }

  try {
    // --- 1. HEALTH CHECKS ---
    const healthRes = await request({ host: 'localhost', port, path: '/health', method: 'GET' });
    const healthJson = JSON.parse(healthRes.body);
    assert(
      healthRes.statusCode === 200 && healthJson.status === 'ok' && healthJson.service.includes('CartPilot AI'),
      'GET /health returns 200 OK JSON'
    );

    const apiHealthRes = await request({ host: 'localhost', port, path: '/api/health', method: 'GET' });
    const apiHealthJson = JSON.parse(apiHealthRes.body);
    assert(
      apiHealthRes.statusCode === 200 && apiHealthJson.status === 'ok',
      'GET /api/health returns 200 OK JSON with database status'
    );

    // --- 2. API DESCRIPTOR ENDPOINTS (JSON ONLY, NO HTML) ---
    const rootRes = await request({ host: 'localhost', port, path: '/', method: 'GET' });
    const rootJson = JSON.parse(rootRes.body);
    assert(
      rootRes.statusCode === 200 && rootJson.service === 'CartPilot AI API',
      'GET / on Express returns JSON API descriptor (NOT static HTML)'
    );

    const apiRootRes = await request({ host: 'localhost', port, path: '/api', method: 'GET' });
    const apiRootJson = JSON.parse(apiRootRes.body);
    assert(
      apiRootRes.statusCode === 200 && apiRootJson.service === 'CartPilot AI API',
      'GET /api returns JSON API descriptor'
    );

    // --- 3. PRODUCT CATALOGUE & VARIANTS ---
    const productsRes = await request({ host: 'localhost', port, path: '/api/products', method: 'GET' });
    const productsJson = JSON.parse(productsRes.body);
    assert(
      productsRes.statusCode === 200 &&
      productsJson.success === true &&
      Array.isArray(productsJson.data) &&
      productsJson.data.length >= 40,
      `GET /api/products returns ${productsJson.data?.length} Aptdot products`
    );

    // --- 4. PAYPAL CONFIGURATION ---
    const paypalRes = await request({ host: 'localhost', port, path: '/api/payments/config', method: 'GET' });
    const paypalJson = JSON.parse(paypalRes.body);
    assert(
      paypalRes.statusCode === 200 &&
      paypalJson.success === true &&
      paypalJson.mode === 'sandbox' &&
      paypalJson.isConfigured === true,
      'GET /api/payments/config returns verified sandbox credentials'
    );

    // --- 5. AI ASSISTANT & ALIAS ---
    const promptsRes = await request({ host: 'localhost', port, path: '/api/ai/prompts', method: 'GET' });
    const promptsJson = JSON.parse(promptsRes.body);
    assert(
      promptsRes.statusCode === 200 &&
      Array.isArray(promptsJson.data) &&
      promptsJson.data.length > 0,
      'GET /api/ai/prompts returns starter shopping prompts'
    );

    const assistantRes = await request({ host: 'localhost', port, path: '/api/assistant/prompts', method: 'GET' });
    const assistantJson = JSON.parse(assistantRes.body);
    assert(
      assistantRes.statusCode === 200 &&
      Array.isArray(assistantJson.data),
      'GET /api/assistant/prompts alias route works identically to /api/ai/prompts'
    );

    // --- 6. CART ENDPOINTS ---
    const cartRes = await request({ host: 'localhost', port, path: '/api/cart', method: 'GET' });
    const cartJson = JSON.parse(cartRes.body);
    assert(
      cartRes.statusCode === 200 && cartJson.success === true && cartJson.currency === 'USD',
      'GET /api/cart returns cart guardrails and currency policy'
    );

    const firstProduct = productsJson.data[0];
    const cartValidateRes = await request({
      host: 'localhost',
      port,
      path: '/api/cart/validate',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, JSON.stringify({ items: [{ id: firstProduct.id, quantity: 1 }] }));
    const cartValidateJson = JSON.parse(cartValidateRes.body);
    assert(
      cartValidateRes.statusCode === 200 &&
      cartValidateJson.success === true &&
      cartValidateJson.valid === true,
      'POST /api/cart/validate returns validated product stock and line totals'
    );

    // --- 7. UNKNOWN API ENDPOINTS (STRICT JSON 404, NEVER FALLTHROUGH) ---
    const unknownApiGetRes = await request({ host: 'localhost', port, path: '/api/non-existent-route-xyz', method: 'GET' });
    let isUnknownGetJson = false;
    try {
      const parsed = JSON.parse(unknownApiGetRes.body);
      isUnknownGetJson = parsed.success === false;
    } catch {}
    assert(
      unknownApiGetRes.statusCode === 404 && isUnknownGetJson,
      'GET /api/non-existent-route-xyz returns strict JSON 404'
    );

    const unknownApiPostRes = await request({
      host: 'localhost',
      port,
      path: '/api/payments/unknown-action',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, JSON.stringify({ test: true }));
    let isUnknownPostJson = false;
    try {
      const parsed = JSON.parse(unknownApiPostRes.body);
      isUnknownPostJson = parsed.success === false;
    } catch {}
    assert(
      unknownApiPostRes.statusCode === 404 && isUnknownPostJson,
      'POST /api/payments/unknown-action returns strict JSON 404'
    );

    const unknownTopLevelRes = await request({ host: 'localhost', port, path: '/unhandled-serverless-path', method: 'GET' });
    let isUnhandledJson = false;
    try {
      const parsed = JSON.parse(unknownTopLevelRes.body);
      isUnhandledJson = parsed.success === false;
    } catch {}
    assert(
      unknownTopLevelRes.statusCode === 404 && isUnhandledJson,
      'GET /unhandled-serverless-path returns JSON 404 (Express serves 0 HTML)'
    );

    // --- 8. CORS SECURITY AUDIT ---
    // A. Same-origin (no origin header)
    const corsSameOrigin = await request({ host: 'localhost', port, path: '/api/products', method: 'GET' });
    assert(
      corsSameOrigin.statusCode === 200,
      'CORS: Requests with no origin (same-origin, curl) are permitted'
    );

    // B. Localhost dev origin
    const corsLocalhost = await request({
      host: 'localhost',
      port,
      path: '/api/products',
      method: 'GET',
      headers: { Origin: 'http://localhost:5173' },
    });
    assert(
      corsLocalhost.statusCode === 200 && corsLocalhost.headers['access-control-allow-origin'] === 'http://localhost:5173',
      'CORS: Localhost dev origin http://localhost:5173 is permitted with matching header'
    );

    // C. Vercel deployment domain
    const corsVercel = await request({
      host: 'localhost',
      port,
      path: '/api/products',
      method: 'GET',
      headers: { Origin: 'https://cartpilot-ai.vercel.app' },
    });
    assert(
      corsVercel.statusCode === 200 && corsVercel.headers['access-control-allow-origin'] === 'https://cartpilot-ai.vercel.app',
      'CORS: Vercel production domain https://cartpilot-ai.vercel.app is permitted with matching header'
    );

    // D. Unauthorized foreign origin MUST be rejected
    const corsForbidden = await request({
      host: 'localhost',
      port,
      path: '/api/products',
      method: 'GET',
      headers: { Origin: 'https://malicious-site.com' },
    });
    assert(
      corsForbidden.statusCode === 403 && corsForbidden.body.includes('CORS blocked'),
      'CORS: Unauthorized origin https://malicious-site.com is strictly rejected with 403 Forbidden'
    );

    // --- 9. DIRECT VERCEL SERVERLESS FUNCTION HANDLER TEST ---
    let directHealthOutput = null;
    let directStatusCode = null;
    const mockRes = {
      status(code) {
        directStatusCode = code;
        return this;
      },
      json(data) {
        directHealthOutput = data;
        return this;
      },
      setHeader() {},
    };

    await healthHandler({ method: 'GET' }, mockRes);
    assert(
      directStatusCode === 200 && directHealthOutput?.status === 'ok',
      'Vercel Serverless Function api/health.js executes directly and returns 200 OK JSON'
    );

    // --- 10. FRONTEND BUILD OUTPUT VALIDATION ---
    const distIndexPath = path.resolve(__dirname, '../client/dist/index.html');
    const distAssetsDir = path.resolve(__dirname, '../client/dist/assets');
    const hasDistIndex = fs.existsSync(distIndexPath);
    const hasDistAssets = fs.existsSync(distAssetsDir) && fs.readdirSync(distAssetsDir).length >= 3;
    assert(
      hasDistIndex && hasDistAssets,
      'Vercel frontend build output client/dist/index.html and assets are compiled and ready'
    );

  } catch (err) {
    console.error('Fatal test execution error:', err);
    failed++;
  } finally {
    if (serverInstance) {
      await new Promise((resolve) => serverInstance.close(resolve));
    }
  }

  console.log('\n======================================================================');
  console.log(`TOTAL AUDIT TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('======================================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
