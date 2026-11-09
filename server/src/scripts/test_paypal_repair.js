const BASE_URL = 'http://localhost:5000';

async function runPayPalRepairTests() {
  console.log('======================================================================');
  console.log('CARTPILOT AI — APTDOT UNIFIED CATALOGUE & PAYPAL SANDBOX TEST SUITE');
  console.log(`Target: ${BASE_URL}`);
  console.log('======================================================================\n');

  let passed = 0;
  let failed = 0;

  // TEST 1: Config endpoint returns valid Sandbox Client ID and USD currency
  try {
    const res = await fetch(`${BASE_URL}/api/payments/config`);
    const data = await res.json();
    if (data.success && data.mode === 'sandbox' && data.clientId && data.currency === 'USD') {
      console.log('✅ [PASS] 1. PayPal Public Configuration: Mode: sandbox, Currency: USD, ClientId configured');
      passed++;
    } else {
      console.error('❌ [FAIL] 1. PayPal Public Configuration invalid:', data);
      failed++;
    }
  } catch (e) {
    console.error('❌ [FAIL] 1. Config error:', e.message);
    failed++;
  }

  // TEST 2: Unified Aptdot catalogue endpoint returns 48 active products in USD
  try {
    const res = await fetch(`${BASE_URL}/api/products`);
    const data = await res.json();
    const hasAptdot = data.data?.every(p => p.catalogue_source === 'aptdot_synthetic');
    const allUsd = data.data?.every(p => p.currency === 'USD');
    const count = data.data?.length || 0;

    if (data.success && hasAptdot && allUsd && count >= 40) {
      console.log(`✅ [PASS] 2. Unified Aptdot Catalogue: Returned ${count} products in pure USD (100% Aptdot, 0 domestic, 0 channel3)`);
      passed++;
    } else {
      console.error('❌ [FAIL] 2. Catalogue validation failed:', data);
      failed++;
    }
  } catch (e) {
    console.error('❌ [FAIL] 2. Catalogue error:', e.message);
    failed++;
  }

  // TEST 3: Aptdot product order creation generates real PayPal Sandbox Order ID in USD
  let createdPayPalOrderId = null;
  let createdOrderId = null;
  try {
    const res = await fetch(`${BASE_URL}/api/payments/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ productId: '01975eb3-5320-7d43-900d-e55f210221ab', quantity: 1 }],
        currency: 'USD',
        shippingAddress: {
          name: 'Alex Mercer',
          street: '2211 North First Street',
          city: 'San Jose',
          state: 'CA',
          postalCode: '95131',
          country: 'US',
        },
      }),
    });
    const data = await res.json();
    if (res.status === 201 && data.success && data.paypalOrderId && data.paypalStatus === 'CREATED') {
      createdPayPalOrderId = data.paypalOrderId;
      createdOrderId = data.orderId;
      console.log(`✅ [PASS] 3. PayPal Sandbox Order Creation: Order ID: ${data.orderId}, PayPal ID: ${data.paypalOrderId} ($${data.amount?.usdTotal || data.amount?.total} USD)`);
      passed++;
    } else {
      console.error('❌ [FAIL] 3. Aptdot product order creation failed:', res.status, data);
      failed++;
    }
  } catch (e) {
    console.error('❌ [FAIL] 3. Order creation error:', e.message);
    failed++;
  }

  // TEST 4: Verify created PayPal order directly with api-m.sandbox.paypal.com
  try {
    if (!createdPayPalOrderId) {
      throw new Error('No created PayPal Order ID available from Test 3');
    }
    const { getPayPalAccessToken } = await import('../config/paypal.js');
    const token = await getPayPalAccessToken();
    const ppRes = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${createdPayPalOrderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const ppData = await ppRes.json();
    if (ppRes.ok && ppData.id === createdPayPalOrderId && ppData.status === 'CREATED') {
      console.log(`✅ [PASS] 4. PayPal Sandbox Remote Verification: Confirmed status CREATED at api-m.sandbox.paypal.com (Currency: ${ppData.purchase_units?.[0]?.amount?.currency_code})`);
      passed++;
    } else {
      console.error('❌ [FAIL] 4. Remote PayPal order verification failed:', ppRes.status, ppData);
      failed++;
    }
  } catch (e) {
    console.error('❌ [FAIL] 4. Remote verification error:', e.message);
    failed++;
  }

  // TEST 5: Error Handling — Empty Items Array
  try {
    const res = await fetch(`${BASE_URL}/api/payments/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [] }),
    });
    const data = await res.json();
    if (res.status === 400 && !data.success) {
      console.log('✅ [PASS] 5. Error Handling: Empty items rejected with HTTP 400');
      passed++;
    } else {
      console.error('❌ [FAIL] 5. Empty items did not reject with 400:', res.status, data);
      failed++;
    }
  } catch (e) {
    console.error('❌ [FAIL] 5. Empty items error:', e.message);
    failed++;
  }

  // TEST 6: Error Handling — Non-existent Product Identifier
  try {
    const res = await fetch(`${BASE_URL}/api/payments/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ productId: 'b2000000-0000-0000-0000-999999999999', quantity: 1 }],
      }),
    });
    const data = await res.json();
    if (res.status === 404 && data.code === 'PRODUCT_NOT_FOUND') {
      console.log('✅ [PASS] 6. Error Handling: Non-existent product rejected with HTTP 404 (PRODUCT_NOT_FOUND)');
      passed++;
    } else {
      console.error('❌ [FAIL] 6. Non-existent product did not return 404:', res.status, data);
      failed++;
    }
  } catch (e) {
    console.error('❌ [FAIL] 6. Non-existent product error:', e.message);
    failed++;
  }

  // TEST 7: Error Handling — Capture Without Order ID
  try {
    const res = await fetch(`${BASE_URL}/api/payments/capture-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    if (res.status === 400 && !data.success) {
      console.log('✅ [PASS] 7. Error Handling: Capture without Order ID rejected with HTTP 400');
      passed++;
    } else {
      console.error('❌ [FAIL] 7. Capture without Order ID did not reject with 400:', res.status, data);
      failed++;
    }
  } catch (e) {
    console.error('❌ [FAIL] 7. Capture error handling error:', e.message);
    failed++;
  }

  console.log('\n======================================================================');
  console.log(`TOTAL REPAIR TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('======================================================================');

  if (failed > 0) process.exit(1);
}

runPayPalRepairTests();
