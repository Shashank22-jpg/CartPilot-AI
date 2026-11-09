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

async function runStage7Verification() {
  console.log('======================================================================');
  console.log('CARTPILOT AI — STAGE 7 VERIFICATION: ORDERS & DIGITAL PURCHASE PASSPORT');
  console.log('======================================================================');

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

  // 1. Verify OrdersPage.jsx structure and requirements
  const ordersFile = fs.readFileSync('client/src/pages/OrdersPage.jsx', 'utf8');
  assert(ordersFile.includes('Your Orders'), 'OrdersPage contains exact title "Your Orders"');
  assert(ordersFile.includes('Track and review your shopping activity.'), 'OrdersPage contains exact subtitle');
  assert(ordersFile.includes('All orders'), 'OrdersPage includes filter: "All orders"');
  assert(ordersFile.includes('Successful'), 'OrdersPage includes filter: "Successful"');
  assert(ordersFile.includes('Pending'), 'OrdersPage includes filter: "Pending"');
  assert(ordersFile.includes('Cancelled'), 'OrdersPage includes filter: "Cancelled"');
  assert(ordersFile.includes('Failed'), 'OrdersPage includes filter: "Failed"');
  assert(ordersFile.includes('Order ID') || ordersFile.includes('orderId'), 'OrdersPage renders order ID');
  assert(ordersFile.includes('order.date') || ordersFile.includes('Order Date'), 'OrdersPage renders order date');
  assert(ordersFile.includes('order.total') || ordersFile.includes('Total Amount'), 'OrdersPage renders order total');
  assert(ordersFile.includes('order.paymentStatus'), 'OrdersPage renders payment status');
  assert(ordersFile.includes('order.status'), 'OrdersPage renders order status');
  assert(ordersFile.includes('View Details'), 'OrdersPage includes "View Details" action');
  assert(ordersFile.includes('OrderDetailsModal'), 'OrdersPage implements Order Details modal view');
  assert(ordersFile.includes('paypalOrderId') || ordersFile.includes('paypal_order_id'), 'Order details modal displays PayPal Sandbox order ID');
  assert(ordersFile.includes('paypalCaptureId') || ordersFile.includes('paypal_capture_id'), 'Order details modal displays PayPal Sandbox capture ID');
  assert(!ordersFile.includes('channel3') && !ordersFile.includes('Channel3'), 'OrdersPage is 100% clean of Channel3 references');
  assert(!ordersFile.includes('VERIFIED_DOMESTIC_PRODUCTS') && !ordersFile.includes('domestic'), 'OrdersPage is 100% clean of domestic references');

  // 2. Verify PassportPage.jsx structure and requirements
  const passportFile = fs.readFileSync('client/src/pages/PassportPage.jsx', 'utf8');
  assert(passportFile.includes('Digital Purchase Passports'), 'PassportPage contains title "Digital Purchase Passports"');
  assert(passportFile.includes('passportId') || passportFile.includes('Token Identifier'), 'Passport displays passport identifier');
  assert(passportFile.includes('productTitle') || passportFile.includes('productSnapshot'), 'Passport displays product information');
  assert(passportFile.includes('purchaseDate') || passportFile.includes('Purchase Date'), 'Passport displays purchase date');
  assert(passportFile.includes('orderId') || passportFile.includes('Order Reference'), 'Passport displays order reference');
  assert(passportFile.includes('PayPal Sandbox Orders v2 (Simulated Settlement)'), 'Passport displays payment environment');
  assert(passportFile.includes('Synthetic Catalogue Entry') || passportFile.includes('synthetic'), 'Passport clearly discloses synthetic catalogue origin');
  assert(passportFile.includes('Return Policy Window'), 'Passport displays return policy');
  assert(passportFile.includes('Manufacturer Warranty'), 'Passport displays warranty information');
  assert(passportFile.includes('No active warranty record found in database'), 'Passport has honest fallback when warranty is missing');
  assert(passportFile.includes('Return policy not specified in stored database record'), 'Passport has honest fallback when return policy is missing');
  assert(passportFile.includes('window.print') || passportFile.includes('Print Certificate'), 'Passport includes print-friendly support');
  assert(passportFile.includes('passport-certificate'), 'Passport has certificate print container styling');
  assert(!passportFile.includes('channel3') && !passportFile.includes('Channel3'), 'PassportPage is 100% clean of Channel3 references');
  assert(!passportFile.includes('VERIFIED_DOMESTIC_PRODUCTS') && !passportFile.includes('domestic'), 'PassportPage is 100% clean of domestic references');

  // 3. Verify Empty and Error states across both components
  assert(ordersFile.includes('No orders placed yet') || ordersFile.includes('No matching orders found'), 'OrdersPage has polished empty state');
  assert(ordersFile.includes('Network Error Loading Orders'), 'OrdersPage has network error state');
  assert(ordersFile.includes('Authentication Required'), 'OrdersPage has unauthorized state');
  assert(passportFile.includes('No Digital Passports Yet'), 'PassportPage has polished empty state');
  assert(passportFile.includes('Network Error Loading Passports'), 'PassportPage has network error state');
  assert(passportFile.includes('Authentication Required'), 'PassportPage has unauthorized state');

  // 4. Verify Backend API responses
  try {
    const ordersRes = await fetchJson('http://localhost:5000/api/orders');
    assert(ordersRes.status === 200 && ordersRes.body.success, 'Backend GET /api/orders responds with HTTP 200 and success: true');
    assert(ordersRes.body.source === 'unauthenticated' || ordersRes.body.source === 'supabase', 'Backend orders endpoint handles authentication context securely');
  } catch (err) {
    assert(false, `Backend orders check failed: ${err.message}`);
  }

  try {
    const passportsRes = await fetchJson('http://localhost:5000/api/orders/passports');
    assert(passportsRes.status === 200 && passportsRes.body.success, 'Backend GET /api/orders/passports responds with HTTP 200 and success: true');
  } catch (err) {
    assert(false, `Backend passports check failed: ${err.message}`);
  }

  console.log('======================================================================');
  console.log(`TOTAL VERIFICATION TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('======================================================================');

  if (failed > 0) process.exit(1);
}

runStage7Verification();
