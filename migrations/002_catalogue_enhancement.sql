-- ==============================================================================
-- CartPilot AI - Database Migration 002: Catalogue Enhancement
-- Description: Adds price timestamping, verification tiers, and attribution indexes
-- Safety: Non-destructive, idempotent, preserves all existing data and RLS policies
-- ==============================================================================

-- 1. Add price_updated_at column with default now()
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS price_updated_at TIMESTAMPTZ DEFAULT now();

-- 2. Add verification_tier column with constraint check
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'products' 
      AND column_name = 'verification_tier'
  ) THEN
    ALTER TABLE public.products
      ADD COLUMN verification_tier VARCHAR(20) DEFAULT 'demo';
  END IF;
END $$;

-- Enforce verification tier values: verified, seller_claim, demo, unknown
DO $$ BEGIN
  ALTER TABLE public.products 
    DROP CONSTRAINT IF EXISTS chk_products_verification_tier;
  ALTER TABLE public.products 
    ADD CONSTRAINT chk_products_verification_tier 
    CHECK (verification_tier IN ('verified', 'seller_claim', 'demo', 'unknown'));
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. Tag all 12 existing demonstration items explicitly as 'demo' tier
UPDATE public.products
SET 
  verification_tier = 'demo',
  price_updated_at = COALESCE(price_updated_at, created_at, now())
WHERE is_demo = true OR verification_tier IS NULL;

-- 4. Create optimized indexes for category browsing and verification filtering
CREATE INDEX IF NOT EXISTS idx_products_verification_tier 
  ON public.products(verification_tier);

CREATE INDEX IF NOT EXISTS idx_products_price_updated_at 
  ON public.products(price_updated_at);

CREATE INDEX IF NOT EXISTS idx_products_category_verified 
  ON public.products(category, verification_tier);

-- 5. Verification notice
COMMENT ON COLUMN public.products.verification_tier IS 
  'Authenticity classification: verified (independently corroborated), seller_claim (merchant claim), demo (prototype sample), unknown (unverified)';

COMMENT ON COLUMN public.products.price_updated_at IS 
  'Timestamp when the price in INR was last checked and corroborated against authorized seller records';
