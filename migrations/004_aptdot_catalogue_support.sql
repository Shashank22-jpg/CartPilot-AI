-- ==============================================================================
-- CartPilot AI - Database Migration 004: Aptdot Catalogue Support & Provenance Partitioning (REVISED)
-- Description: Adds catalogue_source, lifecycle_status, verification_tier, and price_updated_at.
-- Safety: Non-destructive, idempotent, preserves all existing data and RLS policies.
-- Constraints: Safe defaults ('unknown'), preserves existing demo records as 'cartpilot_demo',
--              does not assume non-demo items are verified, nullable price_updated_at without now() default.
-- Date: 2026-11-07
-- ==============================================================================

-- 1. Add catalogue_source column with safe 'unknown' default
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS catalogue_source VARCHAR(30) DEFAULT 'unknown';

-- 2. Enforce strict catalogue provenance constraint including 'unknown'
DO $$ BEGIN
  ALTER TABLE public.products 
    DROP CONSTRAINT IF EXISTS chk_products_catalogue_source;
  ALTER TABLE public.products 
    ADD CONSTRAINT chk_products_catalogue_source 
    CHECK (catalogue_source IN ('domestic_verified', 'cartpilot_demo', 'aptdot_synthetic', 'channel3_external', 'unknown'));
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. Explicitly classify existing records preserving their genuine identity
-- Existing 12 rows are CartPilot's built-in demo items (is_demo = true).
-- They are classified as 'cartpilot_demo'.
-- Any non-demo record whose origin is unverified is assigned 'unknown' (never assumed to be domestic_verified).
UPDATE public.products
SET catalogue_source = CASE
  WHEN is_demo = true THEN 'cartpilot_demo'
  WHEN catalogue_source IS NOT NULL AND catalogue_source <> 'unknown' THEN catalogue_source
  ELSE 'unknown'
END
WHERE catalogue_source IS NULL OR catalogue_source = 'unknown';

-- Ensure default for future unclassified inserts remains 'unknown'
ALTER TABLE public.products
  ALTER COLUMN catalogue_source SET DEFAULT 'unknown';

-- 4. Add lifecycle_status column with safe check constraint
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS lifecycle_status VARCHAR(20) DEFAULT 'active';

UPDATE public.products
SET lifecycle_status = 'active'
WHERE lifecycle_status IS NULL;

DO $$ BEGIN
  ALTER TABLE public.products 
    DROP CONSTRAINT IF EXISTS chk_products_lifecycle_status;
  ALTER TABLE public.products 
    ADD CONSTRAINT chk_products_lifecycle_status 
    CHECK (lifecycle_status IN ('active', 'draft', 'archived'));
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 5. Safe verification_tier column handling
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'products' 
      AND column_name = 'verification_tier'
  ) THEN
    ALTER TABLE public.products
      ADD COLUMN verification_tier VARCHAR(20) DEFAULT 'unknown';
  END IF;
END $$;

-- Enforce verification tier values
DO $$ BEGIN
  ALTER TABLE public.products 
    DROP CONSTRAINT IF EXISTS chk_products_verification_tier;
  ALTER TABLE public.products 
    ADD CONSTRAINT chk_products_verification_tier 
    CHECK (verification_tier IN ('verified', 'seller_claim', 'demo', 'unknown'));
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Safe classification of existing records for verification_tier:
-- Existing demo items (is_demo = true) -> 'demo'
-- Any existing non-demo items with null verification_tier -> 'unknown' (NEVER assume verified)
-- Existing non-null verification_tier values are strictly preserved.
UPDATE public.products
SET verification_tier = CASE
  WHEN is_demo = true THEN 'demo'
  ELSE 'unknown'
END
WHERE verification_tier IS NULL;

-- Default for future unclassified inserts is 'unknown'
ALTER TABLE public.products
  ALTER COLUMN verification_tier SET DEFAULT 'unknown';

-- 6. Safe price_updated_at handling: Nullable TIMESTAMPTZ, NO DEFAULT now(), NO backfill with migration execution time
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS price_updated_at TIMESTAMPTZ;

-- If price_updated_at has a default now(), drop it so new records without known price verification remain NULL
ALTER TABLE public.products
  ALTER COLUMN price_updated_at DROP DEFAULT;

-- 7. Create optimized composite and partitioned indexes
CREATE INDEX IF NOT EXISTS idx_products_catalogue_source 
  ON public.products(catalogue_source);

CREATE INDEX IF NOT EXISTS idx_products_catalogue_lifecycle 
  ON public.products(catalogue_source, lifecycle_status, in_stock);

CREATE INDEX IF NOT EXISTS idx_products_aptdot_slug 
  ON public.products(slug) 
  WHERE catalogue_source = 'aptdot_synthetic';

-- 8. Documentation comments
COMMENT ON COLUMN public.products.catalogue_source IS 
  'Provenance origin: domestic_verified (verified Indian electronics), cartpilot_demo (initial 12 simulated INR items), aptdot_synthetic (50 CC0 benchmark items in USD), channel3_external (Channel3 discovery), unknown (unverified default)';

COMMENT ON COLUMN public.products.verification_tier IS 
  'Verification tier: verified (independently corroborated), seller_claim (unverified seller claim), demo (mock demonstration data), unknown (unverified default)';

COMMENT ON COLUMN public.products.price_updated_at IS 
  'Nullable timestamp when product price was last verified against an authoritative source. Null if unknown or unverified.';
