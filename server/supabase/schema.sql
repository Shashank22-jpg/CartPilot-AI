-- ==============================================================================
-- CartPilot AI - Supabase PostgreSQL Schema Migration
-- Version: 1.0.0
-- Environment: Supabase PostgreSQL (Supports RLS & Auth Integration)
-- Description: Core tables for Agentic Commerce, Product Discovery, Shopping Carts,
--              Order History, Server-Side Verified Payments & Digital Purchase Passports.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. EXTENSIONS & ENUMS
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Order processing lifecycle statuses
DO $$ BEGIN
  CREATE TYPE order_status AS ENUM (
    'pending',
    'processing',
    'in_transit',
    'delivered',
    'cancelled'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Strict server-verified payment statuses
DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM (
    'pending',
    'authorized',
    'captured',
    'failed',
    'refunded'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Digital Purchase Passport ownership & warranty lifecycle
DO $$ BEGIN
  CREATE TYPE passport_status AS ENUM (
    'active',
    'transferred',
    'claimed',
    'expired'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Automated customer protection and deadline reminders
DO $$ BEGIN
  CREATE TYPE reminder_type AS ENUM (
    'return_deadline',
    'warranty_expiration',
    'budget_alert',
    'claim_followup'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ------------------------------------------------------------------------------
-- 2. REUSABLE TRIGGER FUNCTIONS
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------
-- 3. PROFILES TABLE
-- Extends Supabase auth.users with user preferences, delivery details & budget caps
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  shipping_address JSONB DEFAULT '{"street": "", "city": "Bengaluru", "state": "Karnataka", "postalCode": "560038", "country": "IN"}'::jsonb,
  monthly_budget_limit NUMERIC(12, 2) NOT NULL DEFAULT 250000.00 CHECK (monthly_budget_limit >= 0),
  alert_threshold_percent INTEGER NOT NULL DEFAULT 80 CHECK (alert_threshold_percent BETWEEN 10 AND 100),
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  shopping_preferences JSONB DEFAULT '{"priority": "Durability & Specs Verification", "riskThreshold": "Strict"}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ------------------------------------------------------------------------------
-- 4. PRODUCTS TABLE
-- Structured hardware catalogue with specifications, risk dossiers & telemetry
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  original_price NUMERIC(12, 2) CHECK (original_price IS NULL OR original_price >= price),
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  rating NUMERIC(3, 2) DEFAULT 4.5 CHECK (rating BETWEEN 0 AND 5),
  reviews_count INTEGER DEFAULT 0 CHECK (reviews_count >= 0),
  in_stock BOOLEAN DEFAULT true,
  image_url TEXT NOT NULL,
  tag TEXT,
  badge_type TEXT DEFAULT 'sample',
  specs JSONB NOT NULL DEFAULT '{}'::jsonb,
  pros TEXT[] DEFAULT ARRAY[]::TEXT[],
  cons TEXT[] DEFAULT ARRAY[]::TEXT[],
  seller JSONB NOT NULL DEFAULT '{}'::jsonb,
  evidence JSONB NOT NULL DEFAULT '{}'::jsonb,
  warranty JSONB NOT NULL DEFAULT '{}'::jsonb,
  return_policy JSONB NOT NULL DEFAULT '{}'::jsonb,
  risk_assessment JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_demo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);

-- ------------------------------------------------------------------------------
-- 5. CARTS TABLE
-- Agent-curated shopping carts with single active cart enforcement per user
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'converted', 'abandoned')),
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_active_user_cart
  ON public.carts(user_id)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_carts_user_id ON public.carts(user_id);

-- ------------------------------------------------------------------------------
-- 6. CART ITEMS TABLE
-- Individual items inside active shopping carts
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_cart_item_product UNIQUE (cart_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON public.cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON public.cart_items(product_id);

-- ------------------------------------------------------------------------------
-- 7. ORDERS TABLE
-- Completed client purchase orders with delivery logistics & carrier data
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  status order_status NOT NULL DEFAULT 'pending',
  subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
  tax NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (tax >= 0),
  shipping_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (shipping_cost >= 0),
  total NUMERIC(12, 2) NOT NULL CHECK (total >= 0),
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  shipping_address JSONB NOT NULL DEFAULT '{}'::jsonb,
  tracking_number TEXT,
  carrier TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- ------------------------------------------------------------------------------
-- 8. ORDER ITEMS TABLE
-- Line items with snapshot product pricing and allocated serial numbers
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  image_url TEXT,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
  total_price NUMERIC(12, 2) NOT NULL CHECK (total_price >= 0),
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  serial_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_order_items_serial ON public.order_items(serial_number);

-- ------------------------------------------------------------------------------
-- 9. PAYMENTS TABLE
-- Strict server-verified PayPal sandbox and production transaction settlements
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  payment_gateway TEXT NOT NULL DEFAULT 'paypal',
  paypal_order_id TEXT UNIQUE,
  paypal_capture_id TEXT UNIQUE,
  amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  status payment_status NOT NULL DEFAULT 'pending',
  raw_response JSONB DEFAULT '{}'::jsonb,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_order_id ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_paypal_capture_id ON public.payments(paypal_capture_id);
CREATE INDEX IF NOT EXISTS idx_payments_paypal_order_id ON public.payments(paypal_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);

-- ------------------------------------------------------------------------------
-- 10. PURCHASE PASSPORTS TABLE
-- Digital ownership certificates with serial hashes, live return windows & AI warranty tracking
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.purchase_passports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passport_token_id TEXT UNIQUE NOT NULL,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE RESTRICT,
  order_item_id UUID REFERENCES public.order_items(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  product_title TEXT NOT NULL,
  brand TEXT NOT NULL,
  image_url TEXT,
  serial_number TEXT NOT NULL,
  transaction_hash TEXT NOT NULL,
  purchase_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  purchase_price NUMERIC(12, 2) NOT NULL CHECK (purchase_price >= 0),
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  return_window_days INTEGER NOT NULL DEFAULT 30,
  return_deadline TIMESTAMPTZ NOT NULL,
  return_status TEXT NOT NULL DEFAULT 'Window Active',
  status passport_status NOT NULL DEFAULT 'active',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_passports_user_id ON public.purchase_passports(user_id);
CREATE INDEX IF NOT EXISTS idx_passports_token_id ON public.purchase_passports(passport_token_id);
CREATE INDEX IF NOT EXISTS idx_passports_serial ON public.purchase_passports(serial_number);
CREATE INDEX IF NOT EXISTS idx_passports_deadline ON public.purchase_passports(return_deadline);

-- ------------------------------------------------------------------------------
-- 11. WARRANTIES TABLE
-- Detailed warranty contracts, durations, claim portals & status
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.warranties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passport_id UUID NOT NULL REFERENCES public.purchase_passports(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  provider TEXT NOT NULL,
  duration_months INTEGER NOT NULL CHECK (duration_months > 0),
  coverage_type TEXT NOT NULL DEFAULT 'Manufacturer Comprehensive',
  start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  claim_url TEXT,
  claim_status TEXT NOT NULL DEFAULT 'Active (Unclaimed)',
  terms JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_warranties_user_id ON public.warranties(user_id);
CREATE INDEX IF NOT EXISTS idx_warranties_passport_id ON public.warranties(passport_id);
CREATE INDEX IF NOT EXISTS idx_warranties_expires_at ON public.warranties(expires_at);

-- ------------------------------------------------------------------------------
-- 12. REMINDERS TABLE
-- Automated alerts for return window expirations, warranty renewals, and budget caps
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  passport_id UUID REFERENCES public.purchase_passports(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  reminder_type reminder_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  due_at TIMESTAMPTZ NOT NULL,
  is_dismissed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON public.reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_due_at ON public.reminders(due_at);
CREATE INDEX IF NOT EXISTS idx_reminders_is_dismissed ON public.reminders(is_dismissed);

-- ------------------------------------------------------------------------------
-- 13. AUTOMATED TRIGGERS FOR UPDATED_AT
-- ------------------------------------------------------------------------------
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_carts_updated_at ON public.carts;
CREATE TRIGGER trg_carts_updated_at BEFORE UPDATE ON public.carts FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_cart_items_updated_at ON public.cart_items;
CREATE TRIGGER trg_cart_items_updated_at BEFORE UPDATE ON public.cart_items FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_orders_updated_at ON public.orders;
CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_payments_updated_at ON public.payments;
CREATE TRIGGER trg_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_passports_updated_at ON public.purchase_passports;
CREATE TRIGGER trg_passports_updated_at BEFORE UPDATE ON public.purchase_passports FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_warranties_updated_at ON public.warranties;
CREATE TRIGGER trg_warranties_updated_at BEFORE UPDATE ON public.warranties FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ------------------------------------------------------------------------------
-- 14. AUTH HOOK TRIGGER: AUTOMATIC PROFILE CREATION
-- Automatically provisions a profile row when a new user signs up in auth.users
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', NULL)
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 15. ROW LEVEL SECURITY (RLS) POLICIES
-- Strict isolation ensuring users only access their own records while allowing
-- public product catalogue discovery and backend service_role settlements.
-- ------------------------------------------------------------------------------

-- Enable RLS across all 10 tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_passports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.warranties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

-- A. PROFILES POLICIES
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- B. PRODUCTS POLICIES (Public read, service_role write)
DROP POLICY IF EXISTS "Products are publicly readable" ON public.products;
CREATE POLICY "Products are publicly readable"
  ON public.products FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Only service_role can modify products" ON public.products;
CREATE POLICY "Only service_role can modify products"
  ON public.products FOR ALL
  USING (auth.jwt()->>'role' = 'service_role')
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- C. CARTS POLICIES
DROP POLICY IF EXISTS "Users can view own carts" ON public.carts;
CREATE POLICY "Users can view own carts"
  ON public.carts FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own cart" ON public.carts;
CREATE POLICY "Users can create own cart"
  ON public.carts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own cart" ON public.carts;
CREATE POLICY "Users can update own cart"
  ON public.carts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own cart" ON public.carts;
CREATE POLICY "Users can delete own cart"
  ON public.carts FOR DELETE
  USING (auth.uid() = user_id);

-- D. CART ITEMS POLICIES
DROP POLICY IF EXISTS "Users can view own cart items" ON public.cart_items;
CREATE POLICY "Users can view own cart items"
  ON public.cart_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert own cart items" ON public.cart_items;
CREATE POLICY "Users can insert own cart items"
  ON public.cart_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update own cart items" ON public.cart_items;
CREATE POLICY "Users can update own cart items"
  ON public.cart_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete own cart items" ON public.cart_items;
CREATE POLICY "Users can delete own cart items"
  ON public.cart_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()
    )
  );

-- E. ORDERS POLICIES
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own order or service_role" ON public.orders;
CREATE POLICY "Users can create own order or service_role"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.jwt()->>'role' = 'service_role');

DROP POLICY IF EXISTS "Service role can update orders" ON public.orders;
CREATE POLICY "Service role can update orders"
  ON public.orders FOR UPDATE
  USING (auth.jwt()->>'role' = 'service_role')
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- F. ORDER ITEMS POLICIES
DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items;
CREATE POLICY "Users can view own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Service role or order creator can insert order items" ON public.order_items;
CREATE POLICY "Service role or order creator can insert order items"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR auth.jwt()->>'role' = 'service_role')
    )
  );

-- G. PAYMENTS POLICIES (Backend verified only)
DROP POLICY IF EXISTS "Users can view payments for own orders" ON public.payments;
CREATE POLICY "Users can view payments for own orders"
  ON public.payments FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Only backend service_role can create or update payments" ON public.payments;
CREATE POLICY "Only backend service_role can create or update payments"
  ON public.payments FOR ALL
  USING (auth.jwt()->>'role' = 'service_role')
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- H. PURCHASE PASSPORTS POLICIES
DROP POLICY IF EXISTS "Users can view own purchase passports" ON public.purchase_passports;
CREATE POLICY "Users can view own purchase passports"
  ON public.purchase_passports FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Only backend service_role can mint purchase passports" ON public.purchase_passports;
CREATE POLICY "Only backend service_role can mint purchase passports"
  ON public.purchase_passports FOR ALL
  USING (auth.jwt()->>'role' = 'service_role')
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- I. WARRANTIES POLICIES
DROP POLICY IF EXISTS "Users can view own warranties" ON public.warranties;
CREATE POLICY "Users can view own warranties"
  ON public.warranties FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Only backend service_role can create warranties" ON public.warranties;
CREATE POLICY "Only backend service_role can create warranties"
  ON public.warranties FOR ALL
  USING (auth.jwt()->>'role' = 'service_role')
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- J. REMINDERS POLICIES
DROP POLICY IF EXISTS "Users can view own reminders" ON public.reminders;
CREATE POLICY "Users can view own reminders"
  ON public.reminders FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can dismiss own reminders" ON public.reminders;
CREATE POLICY "Users can dismiss own reminders"
  ON public.reminders FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role or user can insert reminders" ON public.reminders;
CREATE POLICY "Service role or user can insert reminders"
  ON public.reminders FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.jwt()->>'role' = 'service_role');
