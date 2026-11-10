import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper for making HTTP requests
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
  console.log('🧪 CARTPILOT AI: UNIFIED VERCEL & SERVERLESS API SUITE');
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

  const port = process.env.TEST_PORT || 5000;

  try {
    // 1. Health check top-level
    const healthRes = await request({ host: 'localhost', port, path: '/health', method: 'GET' });
    const healthJson = JSON.parse(healthRes.body);
    assert(
      healthRes.statusCode === 200 && healthJson.status === 'ok' && healthJson.service === 'CartPilot AI',
      'Top-level health check endpoint GET /health returns 200 OK JSON'
    );

    // 2. API health check
    const apiHealthRes = await request({ host: 'localhost', port, path: '/api/health', method: 'GET' });
    const apiHealthJson = JSON.parse(apiHealthRes.body);
    assert(
      apiHealthRes.statusCode === 200 && apiHealthJson.status === 'ok',
      'API health check endpoint GET /api/health returns 200 OK JSON'
    );

    // 3. Database health check
    const dbHealthRes = await request({ host: 'localhost', port, path: '/api/health/db', method: 'GET' });
    const dbHealthJson = JSON.parse(dbHealthRes.body);
    assert(
      dbHealthRes.statusCode === 200 && dbHealthJson.connected === true && dbHealthJson.status === 'operational',
      `Supabase Database health check GET /api/health/db returns operational (products: ${dbHealthJson.productsCount})`
    );

    // 4. Products API endpoint
    const productsRes = await request({ host: 'localhost', port, path: '/api/products', method: 'GET' });
    const productsJson = JSON.parse(productsRes.body);
    assert(
      productsRes.statusCode === 200 &&
      productsJson.success === true &&
      Array.isArray(productsJson.data) &&
      productsJson.data.length >= 40,
      `Catalogue API GET /api/products returns ${productsJson.data?.length || 0} Aptdot products`
    );

    // 5. PayPal config API
    const paypalConfigRes = await request({ host: 'localhost', port, path: '/api/payments/config', method: 'GET' });
    const paypalConfigJson = JSON.parse(paypalConfigRes.body);
    assert(
      paypalConfigRes.statusCode === 200 &&
      paypalConfigJson.success === true &&
      paypalConfigJson.mode === 'sandbox' &&
      paypalConfigJson.isConfigured === true &&
      Boolean(paypalConfigJson.clientId),
      'PayPal Config API GET /api/payments/config returns sandbox credentials & client-safe ID'
    );

    // 6. AI prompts API
    const aiPromptsRes = await request({ host: 'localhost', port, path: '/api/ai/prompts', method: 'GET' });
    const aiPromptsJson = JSON.parse(aiPromptsRes.body);
    assert(
      aiPromptsRes.statusCode === 200 &&
      aiPromptsJson.success === true &&
      Array.isArray(aiPromptsJson.data) &&
      aiPromptsJson.data.length > 0,
      `AI Shopping Prompts API GET /api/ai/prompts returns ${aiPromptsJson.data?.length || 0} prompt chips`
    );

    // 7. Assistant alias API
    const assistantPromptsRes = await request({ host: 'localhost', port, path: '/api/assistant/prompts', method: 'GET' });
    const assistantPromptsJson = JSON.parse(assistantPromptsRes.body);
    assert(
      assistantPromptsRes.statusCode === 200 &&
      assistantPromptsJson.success === true &&
      Array.isArray(assistantPromptsJson.data),
      'Assistant Alias API GET /api/assistant/prompts resolves identically to /api/ai/prompts'
    );

    // 8. Cart Policy API
    const cartRes = await request({ host: 'localhost', port, path: '/api/cart', method: 'GET' });
    const cartJson = JSON.parse(cartRes.body);
    assert(
      cartRes.statusCode === 200 &&
      cartJson.success === true &&
      cartJson.currency === 'USD',
      'Cart API GET /api/cart returns currency and guardrails policy'
    );

    // 9. Cart Validation API
    const firstProduct = productsJson.data[0];
    const cartValidateRes = await request({
      host: 'localhost',
      port,
      path: '/api/cart/validate',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, JSON.stringify({ items: [{ id: firstProduct.id, quantity: 2 }] }));
    const cartValidateJson = JSON.parse(cartValidateRes.body);
    assert(
      cartValidateRes.statusCode === 200 &&
      cartValidateJson.success === true &&
      cartValidateJson.valid === true &&
      cartValidateJson.items[0]?.quantity === 2,
      'Cart Validation API POST /api/cart/validate correctly validates stock and item prices'
    );

    // 10. Unknown API Route 404 (GET) - MUST NOT return HTML index.html
    const unknownApiRes = await request({ host: 'localhost', port, path: '/api/non-existent-route-xyz', method: 'GET' });
    let isUnknownJson = false;
    try {
      const parsed = JSON.parse(unknownApiRes.body);
      isUnknownJson = parsed.success === false;
    } catch {}
    assert(
      unknownApiRes.statusCode === 404 && isUnknownJson,
      'Unknown API route GET /api/non-existent-route-xyz returns JSON 404 (NOT SPA HTML fallback)'
    );

    // 11. Unknown API Route 404 (POST)
    const unknownApiPostRes = await request({
      host: 'localhost',
      port,
      path: '/api/orders/random-missing-action',
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
      'Unknown API route POST /api/orders/random-missing-action returns JSON 404'
    );

    // 12. Root path GET / serves frontend index.html
    const rootRes = await request({ host: 'localhost', port, path: '/', method: 'GET' });
    assert(
      rootRes.statusCode === 200 &&
      rootRes.body.toLowerCase().includes('<!doctype html>') &&
      rootRes.body.includes('CartPilot AI'),
      'Root GET / correctly serves client/dist/index.html'
    );

    // 13. SPA Direct Route Refresh: /discover
    const discoverRes = await request({ host: 'localhost', port, path: '/discover', method: 'GET' });
    assert(
      discoverRes.statusCode === 200 && discoverRes.body.toLowerCase().includes('<!doctype html>'),
      'Direct route refresh GET /discover falls back to SPA index.html'
    );

    // 14. SPA Direct Route Refresh: /assistant
    const assistantRes = await request({ host: 'localhost', port, path: '/assistant', method: 'GET' });
    assert(
      assistantRes.statusCode === 200 && assistantRes.body.toLowerCase().includes('<!doctype html>'),
      'Direct route refresh GET /assistant falls back to SPA index.html'
    );

    // 15. SPA Direct Route Refresh: /compare
    const compareRes = await request({ host: 'localhost', port, path: '/compare', method: 'GET' });
    assert(
      compareRes.statusCode === 200 && compareRes.body.toLowerCase().includes('<!doctype html>'),
      'Direct route refresh GET /compare falls back to SPA index.html'
    );

    // 16. SPA Direct Route Refresh: /intelligence
    const intelRes = await request({ host: 'localhost', port, path: '/intelligence', method: 'GET' });
    assert(
      intelRes.statusCode === 200 && intelRes.body.toLowerCase().includes('<!doctype html>'),
      'Direct route refresh GET /intelligence falls back to SPA index.html'
    );

    // 17. SPA Direct Route Refresh: /orders
    const ordersRes = await request({ host: 'localhost', port, path: '/orders', method: 'GET' });
    assert(
      ordersRes.statusCode === 200 && ordersRes.body.toLowerCase().includes('<!doctype html>'),
      'Direct route refresh GET /orders falls back to SPA index.html'
    );

    // 18. SPA Direct Route Refresh: /passport
    const passportRes = await request({ host: 'localhost', port, path: '/passport', method: 'GET' });
    assert(
      passportRes.statusCode === 200 && passportRes.body.toLowerCase().includes('<!doctype html>'),
      'Direct route refresh GET /passport falls back to SPA index.html'
    );

    // 19. SPA Direct Route Refresh: /settings
    const settingsRes = await request({ host: 'localhost', port, path: '/settings', method: 'GET' });
    assert(
      settingsRes.statusCode === 200 && settingsRes.body.toLowerCase().includes('<!doctype html>'),
      'Direct route refresh GET /settings falls back to SPA index.html'
    );

    // 20. Static assets MIME type check (CSS & JS)
    const distAssetsDir = path.resolve(__dirname, '../client/dist/assets');
    const assetFiles = fs.readdirSync(distAssetsDir);
    const cssFile = assetFiles.find((f) => f.endsWith('.css'));
    const jsFile = assetFiles.find((f) => f.endsWith('.js'));

    if (cssFile) {
      const cssRes = await request({ host: 'localhost', port, path: `/assets/${cssFile}`, method: 'GET' });
      assert(
        cssRes.statusCode === 200 && cssRes.headers['content-type']?.includes('text/css'),
        `Static CSS file /assets/${cssFile} served with Content-Type: text/css`
      );
    }

    if (jsFile) {
      const jsRes = await request({ host: 'localhost', port, path: `/assets/${jsFile}`, method: 'GET' });
      assert(
        jsRes.statusCode === 200 && (jsRes.headers['content-type']?.includes('javascript') || jsRes.headers['content-type']?.includes('application/javascript')),
        `Static JS file /assets/${jsFile} served with Content-Type: application/javascript`
      );
    }

  } catch (err) {
    console.error('Fatal test execution error:', err);
    failed++;
  }

  console.log('\n======================================================================');
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('======================================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
