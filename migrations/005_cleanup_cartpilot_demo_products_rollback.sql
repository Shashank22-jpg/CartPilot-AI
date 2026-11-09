-- ==============================================================================
-- CartPilot AI - Rollback 005: Re-insert Demo Products & Restore Foreign Keys
-- ==============================================================================

BEGIN;

-- 1. Re-insert the 12 original CartPilot demo products if needed

-- 2. Restore constraints if desired (only after re-associating product_ids)
-- ALTER TABLE public.order_items ALTER COLUMN product_id SET NOT NULL;
-- ALTER TABLE public.purchase_passports ALTER COLUMN product_id SET NOT NULL;
-- ALTER TABLE public.warranties ALTER COLUMN product_id SET NOT NULL;

COMMIT;
