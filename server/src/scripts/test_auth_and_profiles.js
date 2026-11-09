import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

async function runTests() {
  console.log('='.repeat(70));
  console.log('CARTPILOT AI — AUTHENTICATION & USER PROFILE VERIFICATION SUITE');
  console.log(`Backend Target: ${BASE_URL}`);
  console.log('='.repeat(70));

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, extra = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName} ${extra}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} ${extra}`);
      failed++;
    }
  }

  // 1. Health & DB Check
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    const data = await res.json();
    assert(res.status === 200 && data.status === 'ok', '1. System Health Check', `(status: ${data.status})`);
  } catch (err) {
    assert(false, '1. System Health Check', err.message);
  }

  // Unique test email for registration
  const uniqueId = Date.now().toString().slice(-6);
  const testEmail = `test_user_${uniqueId}@cartpilot.test`;
  const testPassword = 'Password123!Secure';
  const testName = `Verified User ${uniqueId}`;
  const testPhone = '+919876543210';
  let createdUserId = null;
  let userToken = null;

  // 2. Register New User via Backend API
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: testName,
        email: testEmail,
        password: testPassword,
        phone: testPhone,
      }),
    });
    const data = await res.json();
    createdUserId = data.user?.id;
    assert(
      res.status === 201 && data.success === true && createdUserId,
      '2. User Registration (Supabase Auth & Profiles)',
      `Created User ID: ${createdUserId}`
    );
  } catch (err) {
    assert(false, '2. User Registration', err.message);
  }

  // 3. Duplicate Email Registration Rejection
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Duplicate User',
        email: testEmail,
        password: testPassword,
        phone: testPhone,
      }),
    });
    const data = await res.json();
    assert(
      res.status === 409 || res.status === 400,
      '3. Duplicate Email Rejection',
      `HTTP ${res.status}: ${data.error || 'Blocked'}`
    );
  } catch (err) {
    assert(false, '3. Duplicate Email Rejection', err.message);
  }

  // 4. Invalid Password Sign In Attempt via Supabase Client/API
  try {
    const { supabaseAdmin } = await import('../config/supabase.js');
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email: testEmail,
      password: 'WrongPassword999!',
    });
    assert(error !== null && !data.session, '4. Invalid Password Rejection', `Error: ${error?.message}`);
  } catch (err) {
    assert(false, '4. Invalid Password Rejection', err.message);
  }

  // 5. Valid Sign In via Supabase Client & Token Generation
  try {
    const { supabaseAdmin } = await import('../config/supabase.js');
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });
    userToken = data.session?.access_token;
    assert(
      error === null && userToken && data.user?.id === createdUserId,
      '5. Valid User Authentication & Session Token Issuance',
      `Session established for: ${data.user?.email}`
    );
  } catch (err) {
    assert(false, '5. Valid User Authentication', err.message);
  }

  // 6. Protected Route Rejection without Bearer Token
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`);
    assert(res.status === 401, '6. Protected Route Security (Reject Missing Bearer)', `HTTP ${res.status}`);
  } catch (err) {
    assert(false, '6. Protected Route Security', err.message);
  }

  // 7. Protected Route Access with Valid Bearer Token (`GET /api/auth/me`)
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const data = await res.json();
    assert(
      res.status === 200 && data.success && data.profile?.id === createdUserId,
      '7. Retrieve Authenticated Profile via Bearer Token (/api/auth/me)',
      `Name: ${data.profile?.full_name}`
    );
  } catch (err) {
    assert(false, '7. Retrieve Authenticated Profile', err.message);
  }

  // 8. Update User Profile (`PUT /api/auth/profile/:userId`)
  const updatedBio = 'AI Hardware Enthusiast and Benchmark Evaluator';
  const updatedCity = 'Bengaluru Tech Corridor';
  try {
    const res = await fetch(`${BASE_URL}/api/auth/profile/${createdUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        fullName: `${testName} (Updated)`,
        bio: updatedBio,
        location: { city: updatedCity, state: 'Karnataka', country: 'India' },
        monthlyBudgetLimit: 300000,
        currency: 'INR',
      }),
    });
    const data = await res.json();
    assert(
      res.status === 200 && data.success && data.profile?.shopping_preferences?.bio === updatedBio,
      '8. Update User Profile with Validation',
      `Updated City: ${data.profile?.shipping_address?.city}`
    );
  } catch (err) {
    assert(false, '8. Update User Profile', err.message);
  }

  // 9. Profile Ownership Security: Attempt to Modify ANOTHER user's profile
  const targetOtherUserId = '3df047b0-a8ee-4c73-b9b7-672143d33508'; // demo user
  try {
    const res = await fetch(`${BASE_URL}/api/auth/profile/${targetOtherUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`, // Authenticated as test user, NOT demo user
      },
      body: JSON.stringify({
        fullName: 'Hacked Name',
      }),
    });
    const data = await res.json();
    assert(
      res.status === 403,
      '9. Cross-User Profile Modification Blocked (403 Forbidden)',
      `HTTP ${res.status}: ${data.error}`
    );
  } catch (err) {
    assert(false, '9. Cross-User Profile Security', err.message);
  }

  // 10. Order History for New User (Returns 0 orders, no leaked data)
  try {
    const res = await fetch(`${BASE_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const data = await res.json();
    assert(
      res.status === 200 && Array.isArray(data.data) && data.data.length === 0,
      '10. Empty State for New User Orders (No Leaked Orders)',
      `Returned count: ${data.data?.length}`
    );
  } catch (err) {
    assert(false, '10. New User Orders Empty State', err.message);
  }

  // 11. Order History for Demo User with Existing Orders
  try {
    const res = await fetch(`${BASE_URL}/api/orders`, {
      headers: { 'x-user-id': '3df047b0-a8ee-4c73-b9b7-672143d33508' },
    });
    const data = await res.json();
    assert(
      res.status === 200 && Array.isArray(data.data) && data.data.length === 4,
      '11. Order History Retrieval for User with Past Transactions',
      `Found ${data.data?.length} real orders`
    );
  } catch (err) {
    assert(false, '11. Existing Order History', err.message);
  }

  // 12. Passport Retrieval for Existing Transactions
  try {
    const res = await fetch(`${BASE_URL}/api/orders/passports`, {
      headers: { 'x-user-id': '3df047b0-a8ee-4c73-b9b7-672143d33508' },
    });
    const data = await res.json();
    assert(
      res.status === 200 && Array.isArray(data.data) && data.data.length === 1,
      '12. Purchase Passport Retrieval for User Transactions',
      `Passport ID: ${data.data?.[0]?.passport_token_id}`
    );
  } catch (err) {
    assert(false, '12. Purchase Passport Retrieval', err.message);
  }

  // 13. Server-side PayPal Checkout: Verification of Aptdot Sandbox Order Creation
  try {
    const res = await fetch(`${BASE_URL}/api/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        items: [
          {
            id: '01975eb3-5320-7d43-900d-e55f210221ab',
            quantity: 1,
          },
        ],
        currency: 'USD',
      }),
    });
    const data = await res.json();
    assert(
      res.status === 201 && data.success && data.paypalOrderId,
      '13. Server-Side PayPal Sandbox: Successfully Created Order for Aptdot Item',
      `PayPal Order ID: ${data.paypalOrderId} (${data.paypalStatus})`
    );
  } catch (err) {
    assert(false, '13. PayPal Aptdot Order Creation', err.message);
  }

  // 14. Clean Up Test User from Auth & Profiles
  try {
    const { supabaseAdmin } = await import('../config/supabase.js');
    if (createdUserId) {
      await supabaseAdmin.from('profiles').delete().eq('id', createdUserId);
      await supabaseAdmin.auth.admin.deleteUser(createdUserId);
      console.log(`🧹 Cleaned up temporary test user: ${createdUserId}`);
    }
    assert(true, '14. Post-Test Cleanup Completed Safely');
  } catch (err) {
    assert(false, '14. Post-Test Cleanup', err.message);
  }

  console.log('='.repeat(70));
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('='.repeat(70));

  if (failed > 0) process.exit(1);
}

runTests();
