import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });

import { supabaseAdmin, isSupabaseConfigured } from './server/src/config/supabase.js';

async function audit() {
  if (!isSupabaseConfigured()) {
    console.error('Supabase not configured');
    process.exit(1);
  }

  console.log('--- 1. INSPECTING ALL PRODUCTS ---');
  const { data: allProducts, error: pErr } = await supabaseAdmin
    .from('products')
    .select('id, slug, title, catalogue_source, verification_tier, currency, price, stock, is_demo');

  if (pErr) {
    console.error('Error fetching products:', pErr);
    process.exit(1);
  }

  const originalDemo = allProducts.filter(p => p.catalogue_source !== 'aptdot_synthetic');
  const aptdotSynthetic = allProducts.filter(p => p.catalogue_source === 'aptdot_synthetic');

  console.log(`Total DB Products: ${allProducts.length}`);
  console.log(`Aptdot Synthetic Products to KEEP: ${aptdotSynthetic.length}`);
  console.log(`Original Demo Products to REMOVE: ${originalDemo.length}\n`);

  console.log('Original Demo Products Detail:');
  originalDemo.forEach((p, idx) => {
    console.log(`  [${idx + 1}] ID: ${p.id} | Slug: ${p.slug} | Price: ${p.currency} ${p.price} | Title: ${p.title} (source: ${p.catalogue_source}, tier: ${p.verification_tier})`);
  });

  const originalDemoIds = originalDemo.map(p => p.id);

  console.log('\n--- 2. CHECKING FOREIGN KEY DEPENDENCIES ---');

  // Check order_items
  const { data: orderItems, error: oiErr } = await supabaseAdmin
    .from('order_items')
    .select('id, order_id, product_id, title, unit_price, quantity')
    .in('product_id', originalDemoIds);

  console.log(`Order Items referencing original demo products: ${orderItems?.length || 0}`);
  if (orderItems && orderItems.length > 0) {
    console.log('Referencing Order Items:', JSON.stringify(orderItems, null, 2));
    const orderIds = [...new Set(orderItems.map(oi => oi.order_id))];
    console.log(`Associated Order IDs (${orderIds.length}):`, orderIds);
  }

  // Check purchase_passports
  const { data: passports, error: passErr } = await supabaseAdmin
    .from('purchase_passports')
    .select('id, passport_token_id, product_id, product_title, order_id')
    .in('product_id', originalDemoIds);

  console.log(`Purchase Passports referencing original demo products: ${passports?.length || 0}`);
  if (passports && passports.length > 0) {
    console.log('Referencing Purchase Passports:', JSON.stringify(passports, null, 2));
  }

  // Check orders
  const { data: allOrders, error: ordErr } = await supabaseAdmin
    .from('orders')
    .select('id, order_number, total, currency, status, user_id');
  console.log(`Total Orders in DB: ${allOrders?.length || 0}`);

  // Check payments
  const { data: allPayments, error: payErr } = await supabaseAdmin
    .from('payments')
    .select('id, order_id, status, amount, currency, paypal_order_id, paypal_capture_id');
  console.log(`Total Payments in DB: ${allPayments?.length || 0}`);

  // Check cart_items if table exists
  try {
    const { data: cartItems, error: ciErr } = await supabaseAdmin
      .from('cart_items')
      .select('id, cart_id, product_id, quantity')
      .in('product_id', originalDemoIds);
    if (!ciErr) {
      console.log(`Cart Items referencing original demo products: ${cartItems?.length || 0}`);
    } else {
      console.log('cart_items table check:', ciErr.message);
    }
  } catch (e) {
    console.log('No cart_items table or error:', e.message);
  }

  // Check user_profiles / users
  const { data: profiles, error: profErr } = await supabaseAdmin
    .from('user_profiles')
    .select('id, full_name, email');
  console.log(`Total User Profiles in DB: ${profiles?.length || 0}`);

  console.log('\n--- 3. DATABASE SCHEMA & CONSTRAINT INSPECTION ---');
  // Check foreign key definitions on order_items and purchase_passports
  const { data: constraints, error: cErr } = await supabaseAdmin.rpc('get_foreign_keys_info').catch(() => ({ data: null }));
  if (!constraints) {
    console.log('RPC get_foreign_keys_info not available, checking raw query or migrations...');
  }
}

audit().catch(console.error);
