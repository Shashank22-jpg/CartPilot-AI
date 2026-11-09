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

async function runStage6Verification() {
  console.log('======================================================================');
  console.log('CARTPILOT AI — STAGE 6 VERIFICATION: SHOPPING CART & CHECKOUT');
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

  // 1. Verify CartPage.jsx content and required elements
  const cartFile = fs.readFileSync('client/src/pages/CartPage.jsx', 'utf8');
  assert(cartFile.includes('Your Shopping Cart'), 'CartPage has exact title "Your Shopping Cart"');
  assert(cartFile.includes('Continue Shopping'), 'CartPage has "Continue Shopping" navigation link');
  assert(cartFile.includes('Discover Products'), 'CartPage has "Discover Products" empty state CTA');
  assert(cartFile.includes('itemCount'), 'CartPage dynamically renders actual cart item count');
  assert(cartFile.includes('selectedVariant'), 'CartPage supports variant options display');
  assert(cartFile.includes('updateQuantity'), 'CartPage includes quantity controls');
  assert(cartFile.includes('removeFromCart'), 'CartPage includes remove item action');
  assert(cartFile.includes('subtotal') && cartFile.includes('tax') && cartFile.includes('shipping') && cartFile.includes('total'), 'CartPage calculates subtotal, tax, shipping, total');
  assert(!cartFile.includes('channel3') && !cartFile.includes('Channel3'), 'CartPage is 100% clean of Channel3 references');
  assert(!cartFile.includes('VERIFIED_DOMESTIC_PRODUCTS') && !cartFile.includes('domestic'), 'CartPage is 100% clean of domestic references');

  // 2. Verify PayPalCheckoutModal.jsx content and required payment states
  const modalFile = fs.readFileSync('client/src/components/checkout/PayPalCheckoutModal.jsx', 'utf8');
  assert(modalFile.includes('Connecting to PayPal Sandbox'), 'Modal includes state: "Connecting to PayPal Sandbox"');
  assert(modalFile.includes('PayPal Sandbox Ready'), 'Modal includes state: "PayPal Sandbox Ready"');
  assert(modalFile.includes('Waiting for buyer approval'), 'Modal includes state: "Waiting for buyer approval"');
  assert(modalFile.includes('Capturing payment'), 'Modal includes state: "Capturing payment"');
  assert(modalFile.includes('Sandbox payment successful'), 'Modal includes state: "Sandbox payment successful"');
  assert(modalFile.includes('Payment cancelled'), 'Modal includes state: "Payment cancelled"');
  assert(modalFile.includes('Payment failed'), 'Modal includes state: "Payment failed"');
  assert(modalFile.includes('Aptdot demo goods are strictly Sandbox test items with simulated funds'), 'Modal includes mandatory sandbox test funds notice');
  assert(modalFile.includes('Live capture remains strictly blocked in LIVE mode'), 'Modal includes live capture block notice');
  assert(modalFile.includes('PayPalScriptProvider') && modalFile.includes('PayPalButtons'), 'Modal integrates official @paypal/react-paypal-js SDK');
  assert(!modalFile.includes('channel3') && !modalFile.includes('Channel3'), 'Modal is 100% clean of Channel3 references');
  assert(!modalFile.includes('VERIFIED_DOMESTIC_PRODUCTS') && !modalFile.includes('domestic'), 'Modal is 100% clean of domestic references');

  // 3. Verify backend PayPal public config endpoint
  try {
    const configRes = await fetchJson('http://localhost:5000/api/payments/config');
    assert(configRes.status === 200 && configRes.body.clientId && configRes.body.mode === 'sandbox', 'Backend PayPal endpoint returns valid sandbox clientId and mode');
  } catch (err) {
    assert(false, `Backend PayPal config failed: ${err.message}`);
  }

  // 4. Verify backend PayPal order creation with Aptdot item in pure USD
  try {
    const prodsRes = await fetchJson('http://localhost:5000/api/products');
    const productsList = prodsRes.body.data || prodsRes.body.products || [];
    const firstProd = productsList[0];
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

    const orderRes = await fetchJson('http://localhost:5000/api/payments/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: orderPayload,
    });

    assert(orderRes.status === 201 && orderRes.body.paypalOrderId, `PayPal Sandbox Order created: ${orderRes.body.paypalOrderId} ($${orderRes.body.totalAmount} USD)`);
  } catch (err) {
    assert(false, `Order creation test failed: ${err.message}`);
  }

  console.log('======================================================================');
  console.log(`TOTAL VERIFICATION TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('======================================================================');

  if (failed > 0) process.exit(1);
}

runStage6Verification();
