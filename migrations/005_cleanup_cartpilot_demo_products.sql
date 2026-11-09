-- ==============================================================================
-- CartPilot AI - Migration 005: Clean Up Legacy Demo Products & Preserve Orders
-- ==============================================================================
-- Purpose:
--   1. Safely remove the original CartPilot demo products from public.products.
--   2. Maintain 100% data integrity for all existing orders, order_items, payments,
--      purchase_passports, and warranties.
--   3. Strictly PRESERVE all 50 Aptdot synthetic products and 135 variants.
-- ==============================================================================

BEGIN;

-- Step 1: Safely modify order_items foreign key to ON DELETE SET NULL
-- This allows deleting demo products without deleting historical order items.
-- Note: order_items already contains snapshot columns (title, brand, image_url,
-- unit_price, quantity, total_price, currency, serial_number) so no data is lost.
ALTER TABLE public.order_items 
  ALTER COLUMN product_id DROP NOT NULL;

ALTER TABLE public.order_items 
  DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;

ALTER TABLE public.order_items 
  ADD CONSTRAINT order_items_product_id_fkey 
  FOREIGN KEY (product_id) REFERENCES public.products(id) 
  ON DELETE SET NULL;

-- Step 2: Safely modify purchase_passports foreign key to ON DELETE SET NULL
-- This allows deleting demo products without deleting minted digital passports.
-- Note: purchase_passports already contains immutable snapshot columns (product_title,
-- brand, image_url, serial_number, transaction_hash, purchase_price, return_deadline).
ALTER TABLE public.purchase_passports 
  ALTER COLUMN product_id DROP NOT NULL;

ALTER TABLE public.purchase_passports 
  DROP CONSTRAINT IF EXISTS purchase_passports_product_id_fkey;

ALTER TABLE public.purchase_passports 
  ADD CONSTRAINT purchase_passports_product_id_fkey 
  FOREIGN KEY (product_id) REFERENCES public.products(id) 
  ON DELETE SET NULL;

-- Step 3: Safely modify warranties foreign key to ON DELETE SET NULL
-- This allows deleting demo products without deleting active warranty records.
-- Note: warranties is already linked to purchase_passports via passport_id,
-- and contains provider, duration_months, coverage_type, expires_at, claim_url, etc.
ALTER TABLE public.warranties 
  ALTER COLUMN product_id DROP NOT NULL;

ALTER TABLE public.warranties 
  DROP CONSTRAINT IF EXISTS warranties_product_id_fkey;

ALTER TABLE public.warranties 
  ADD CONSTRAINT warranties_product_id_fkey 
  FOREIGN KEY (product_id) REFERENCES public.products(id) 
  ON DELETE SET NULL;

-- Step 4: Delete ONLY the original CartPilot demo products
-- Explicitly filter by catalogue_source = 'cartpilot_demo' AND the exact UUID list.
-- This ensures Aptdot synthetic products (catalogue_source = 'aptdot_synthetic') are never touched.
DELETE FROM public.products
WHERE catalogue_source = 'cartpilot_demo'
  AND id IN (
    'a1000000-0000-0000-0000-000000000001',
    'a1000000-0000-0000-0000-000000000002',
    'a1000000-0000-0000-0000-000000000003',
    'a1000000-0000-0000-0000-000000000004',
    'a1000000-0000-0000-0000-000000000005',
    'a1000000-0000-0000-0000-000000000006',
    'a1000000-0000-0000-0000-000000000007',
    'a1000000-0000-0000-0000-000000000008',
    'a1000000-0000-0000-0000-000000000009',
    'a1000000-0000-0000-0000-000000000010',
    'a1000000-0000-0000-0000-000000000011',
    'a1000000-0000-0000-0000-000000000012'
  );

COMMIT;
