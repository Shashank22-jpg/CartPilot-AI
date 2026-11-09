import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config();

import { supabaseAdmin, isSupabaseConfigured } from '../config/supabase.js';

async function audit() {
  if (!isSupabaseConfigured()) {
    console.error('Supabase not configured');
    process.exit(1);
  }

  console.log('--- 1. INSPECTING ALL PRODUCTS ---');
  const { data: allProducts, error: pErr } = await supabaseAdmin
    .from('products')
    .select('id, slug, title, catalogue_source, verification_tier, currency, price, stock, is_demo')
    .order('created_at', { ascending: true });

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
    console.log('Referencing Order Items:');
    orderItems.forEach(oi => {
      console.log(`  - OrderItem ID: ${oi.id} -> Product ID: ${oi.product_id} (${oi.title}) in Order ID: ${oi.order_id}`);
    });
    const orderIds = [...new Set(orderItems.map(oi => oi.order_id))];
    console.log(`Associated Order IDs (${orderIds.length}):`, orderIds);

    // Inspect the orders referencing these
    const { data: matchedOrders } = await supabaseAdmin
      .from('orders')
      .select('id, order_number, total, currency, status, user_id, created_at')
      .in('id', orderIds);
    console.log('Matched Orders:');
    matchedOrders?.forEach(mo => {
      console.log(`  - Order ${mo.order_number} (${mo.id}) | Total: ${mo.currency} ${mo.total} | Status: ${mo.status}`);
    });

    // Inspect payments for these orders
    const { data: matchedPayments } = await supabaseAdmin
      .from('payments')
      .select('id, order_id, status, amount, currency, paypal_order_id, paypal_capture_id')
      .in('order_id', orderIds);
    console.log('Matched Payments:');
    matchedPayments?.forEach(mp => {
      console.log(`  - Payment ${mp.id} | Order: ${mp.order_id} | Status: ${mp.status} | Capture: ${mp.paypal_capture_id}`);
    });
  }

  // Check purchase_passports
  const { data: passports, error: passErr } = await supabaseAdmin
    .from('purchase_passports')
    .select('id, passport_token_id, product_id, product_title, order_id')
    .in('product_id', originalDemoIds);

  console.log(`\nPurchase Passports referencing original demo products: ${passports?.length || 0}`);
  if (passports && passports.length > 0) {
    console.log('Referencing Purchase Passports:');
    passports.forEach(pp => {
      console.log(`  - Passport ${pp.passport_token_id} (${pp.id}) -> Product: ${pp.product_id} (${pp.product_title}) | Order: ${pp.order_id}`);
    });
  }

  // Check user_profiles / users
  const { data: profiles } = await supabaseAdmin
    .from('user_profiles')
    .select('id, full_name, email');
  console.log(`\nTotal User Profiles in DB: ${profiles?.length || 0}`);

  // Total orders & total passports in entire DB
  const { data: totalOrders } = await supabaseAdmin.from('orders').select('id');
  const { data: totalPassports } = await supabaseAdmin.from('purchase_passports').select('id');
  const { data: totalOrderItems } = await supabaseAdmin.from('order_items').select('id');
  console.log(`\nGlobal Database Counts:`);
  console.log(`  - Total Orders: ${totalOrders?.length || 0}`);
  console.log(`  - Total Order Items: ${totalOrderItems?.length || 0}`);
  console.log(`  - Total Passports: ${totalPassports?.length || 0}`);
}

audit().catch(console.error);
