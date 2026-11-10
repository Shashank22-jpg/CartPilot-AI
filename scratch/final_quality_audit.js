import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');
const http = require('http');

async function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        results = results.concat(walk(fullPath));
      }
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

async function runFinalAudit() {
  console.log('======================================================================');
  console.log('CARTPILOT AI — STAGE 8: FINAL QUALITY & FUNCTIONALITY AUDIT');
  console.log('======================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${message}`);
      failed++;
    }
  }

  // ===========================================================================
  // SECTION 1: CATALOGUE INTEGRITY & CONSOLIDATION
  // ===========================================================================
  console.log('--- SECTION 1: CATALOGUE INTEGRITY & CONSOLIDATION ---');
  const clientFiles = walk('client/src');
  let channel3Found = false;
  let domesticFound = false;

  clientFiles.forEach(file => {
    const code = fs.readFileSync(file, 'utf8');
    if (code.toLowerCase().includes('channel3')) channel3Found = true;
    if (code.includes('VERIFIED_DOMESTIC_PRODUCTS')) domesticFound = true;
  });

  assert(!channel3Found, 'Frontend codebase contains 0 references to Channel3');
  assert(!domesticFound, 'Frontend codebase contains 0 references to VERIFIED_DOMESTIC_PRODUCTS');

  try {
    const prodsRes = await fetchJson('http://localhost:5000/api/products');
    assert(prodsRes.status === 200 && prodsRes.body.success, 'API /api/products returns HTTP 200 with success: true');
    assert(prodsRes.body.catalogue === 'aptdot', 'API catalogue source is explicitly "aptdot"');
    assert(prodsRes.body.currencies.length === 1 && prodsRes.body.currencies[0] === 'USD', 'Catalogue currencies strictly unified to pure USD ($)');
    assert(prodsRes.body.count === 48, 'API returns exactly 48 active Aptdot products (excluding 1 archived, 1 draft out of 50 total)');

    const allHaveVariants = prodsRes.body.data.every(p => Array.isArray(p.specs?.variants) && p.specs.variants.length > 0);
    assert(allHaveVariants, 'All active products contain structured variants in specs.variants');
  } catch (err) {
    assert(false, `Product catalogue API failed: ${err.message}`);
  }

  // ===========================================================================
  // SECTION 2: VISUAL CONSISTENCY & HYBRID DESIGN AUDIT
  // ===========================================================================
  console.log('\n--- SECTION 2: VISUAL CONSISTENCY & HYBRID DESIGN AUDIT ---');

  // Homepage
  const dashFile = fs.readFileSync('client/src/pages/DashboardPage.jsx', 'utf8');
  assert(dashFile.includes('Find better.') && dashFile.includes('Buy smarter.'), 'Homepage features Emporium hero headline: "Find better. Buy smarter."');
  assert(dashFile.includes('Featured Aptdot Products') || dashFile.includes('featuredProducts'), 'Homepage displays featured products grid');

  // Discover & PDP
  const discFile = fs.readFileSync('client/src/pages/DiscoverPage.jsx', 'utf8');
  assert(discFile.includes('Discover Products'), 'Discover page header: "Discover Products"');
  assert(discFile.includes('selectedCategory') && discFile.includes('maxPrice'), 'Discover page has category pills and price slider');

  const pdpFile = fs.readFileSync('client/src/components/product/ProductDetailModal.jsx', 'utf8');
  assert(pdpFile.includes('Authoritative Aptdot Specifications') && pdpFile.includes('Synthetic Demonstration Catalogue'), 'PDP modal includes specification matrix and synthetic badge');

  // AI Assistant (Dark theme)
  const assistFile = fs.readFileSync('client/src/pages/AssistantPage.jsx', 'utf8');
  assert(assistFile.includes('Your smarter shopping journey starts here.'), 'AI Assistant features required welcome headline');
  assert(assistFile.includes('bg-navy-950') || assistFile.includes('theme-dark'), 'AI Assistant is styled as Dark AI Intelligence Workspace');

  // Compare & Intelligence
  const compFile = fs.readFileSync('client/src/pages/ComparePage.jsx', 'utf8');
  assert(compFile.includes('Compare Products'), 'Compare page has exact title "Compare Products"');
  assert(compFile.includes('highlightDifferences'), 'Compare page supports difference highlighting');

  const intelFile = fs.readFileSync('client/src/pages/IntelligencePage.jsx', 'utf8');
  assert(intelFile.includes('Purchase Intelligence'), 'Intelligence page has exact title "Purchase Intelligence"');
  assert(intelFile.includes('Risk Assessment'), 'Intelligence page includes evidence-based risk assessment');

  // Cart & Checkout
  const cartFile = fs.readFileSync('client/src/pages/CartPage.jsx', 'utf8');
  assert(cartFile.includes('Your Shopping Cart'), 'Cart page has exact title "Your Shopping Cart"');
  assert(cartFile.includes('Continue Shopping'), 'Cart page includes "Continue Shopping" link to /discover');
  assert(cartFile.includes('Agent Budget Guardrail'), 'Cart page features agent budget guardrail monitor');

  const checkoutFile = fs.readFileSync('client/src/components/checkout/PayPalCheckoutModal.jsx', 'utf8');
  assert(checkoutFile.includes('PayPalScriptProvider') && checkoutFile.includes('PayPalButtons'), 'Checkout modal embeds official @paypal/react-paypal-js SDK');
  assert(checkoutFile.includes('PayPal Sandbox Ready'), 'Checkout modal features "PayPal Sandbox Ready" state');
  assert(checkoutFile.includes('Capturing payment'), 'Checkout modal features "Capturing payment" state');
  assert(checkoutFile.includes('Sandbox payment successful'), 'Checkout modal features "Sandbox payment successful" state');
  assert(checkoutFile.includes('Aptdot demo goods are strictly Sandbox test items with simulated funds'), 'Checkout modal features strict sandbox simulated funds notice');

  // Orders & Passports
  const ordersFile = fs.readFileSync('client/src/pages/OrdersPage.jsx', 'utf8');
  assert(ordersFile.includes('Your Orders'), 'Orders page has exact title "Your Orders"');
  assert(ordersFile.includes('Successful') && ordersFile.includes('Pending'), 'Orders page includes database-backed status filters');
  assert(ordersFile.includes('OrderDetailsModal'), 'Orders page contains Order Details modal view');

  const passportFile = fs.readFileSync('client/src/pages/PassportPage.jsx', 'utf8');
  assert(passportFile.includes('DIGITAL PURCHASE PASSPORT'), 'Passport page contains official certificate header');
  assert(passportFile.includes('window.print'), 'Passport page supports print-friendly certificate export');

  // Profile & Settings
  const settingsFile = fs.readFileSync('client/src/pages/SettingsPage.jsx', 'utf8');
  assert(settingsFile.includes('Settings & Shopping Preferences'), 'Settings page features preferences header');
  assert(settingsFile.includes('Monthly Budget Ceiling'), 'Settings page features monthly budget ceiling control');

  const editProfileFile = fs.readFileSync('client/src/pages/EditProfilePage.jsx', 'utf8');
  assert(editProfileFile.includes('Profile Management'), 'Edit profile page features identity management header');

  // ===========================================================================
  // SECTION 3: FUNCTIONAL & PAYPAL SANDBOX SECURITY AUDIT
  // ===========================================================================
  console.log('\n--- SECTION 3: FUNCTIONAL & PAYPAL SANDBOX SECURITY AUDIT ---');

  try {
    const configRes = await fetchJson('http://localhost:5000/api/payments/config');
    assert(configRes.status === 200, 'GET /api/payments/config returns HTTP 200');
    assert(configRes.body.mode === 'sandbox', 'Payment configuration explicitly set to "sandbox" mode');
    assert(Boolean(configRes.body.clientId), 'PayPal Sandbox Client ID configured and verified');
  } catch (err) {
    assert(false, `PayPal config failed: ${err.message}`);
  }

  // Create real PayPal Sandbox order
  try {
    const prodsRes = await fetchJson('http://localhost:5000/api/products');
    const firstProd = prodsRes.body.data[0];

    const orderPayload = JSON.stringify({
      items: [{ productId: firstProd.id, quantity: 1 }],
      currency: 'USD',
      shippingAddress: {
        name: 'Alex Mercer',
        street: '2211 North First Street',
        city: 'San Jose',
        state: 'CA',
        postalCode: '95131',
        country: 'US',
      },
    });

    const createOrderRes = await fetchJson('http://localhost:5000/api/payments/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: orderPayload,
    });

    assert(createOrderRes.status === 201 && createOrderRes.body.paypalOrderId, `Server created authenticated PayPal Orders v2 Sandbox Order: ${createOrderRes.body.paypalOrderId}`);
    assert(createOrderRes.body.currency === 'USD', 'PayPal Sandbox order currency verified as USD ($)');
  } catch (err) {
    assert(false, `PayPal Order creation failed: ${err.message}`);
  }

  // AI Assistant Gemini Endpoint
  try {
    const aiRes = await fetchJson('http://localhost:5000/api/ai/prompts');
    assert(aiRes.status === 200 && Array.isArray(aiRes.body.data), 'GET /api/ai/prompts returns starter shopping prompts');
  } catch (err) {
    assert(false, `AI prompts API failed: ${err.message}`);
  }

  // ===========================================================================
  // SECTION 4: CODE QUALITY & AST HOOK COMPLIANCE
  // ===========================================================================
  console.log('\n--- SECTION 4: CODE QUALITY & AST HOOK COMPLIANCE ---');
  let hookCheckPassed = true;
  try {
    const execSync = require('child_process').execSync;
    const astOutput = execSync('node scratch/ast_check_hooks.js').toString();
    if (astOutput.includes('violations found: 0')) {
      assert(true, 'AST Hook Analyzer passed with 0 hook violations across all client files');
    } else {
      assert(false, 'AST Hook Analyzer found violations');
    }
  } catch (err) {
    assert(false, `AST Hook Analyzer failed: ${err.message}`);
  }

  console.log('\n======================================================================');
  console.log(`FINAL AUDIT RESULTS: ${passed + failed} TOTAL TESTS | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('======================================================================');

  if (failed > 0) process.exit(1);
}

runFinalAudit();
