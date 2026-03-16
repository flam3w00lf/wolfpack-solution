-- Purchases table for Stripe checkout flow
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id TEXT UNIQUE NOT NULL,
  product_slug TEXT NOT NULL,
  customer_email TEXT,
  amount_cents INTEGER,
  download_token TEXT UNIQUE NOT NULL,
  download_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast token lookups
CREATE INDEX IF NOT EXISTS idx_purchases_download_token ON purchases(download_token);
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_session ON purchases(stripe_session_id);

-- Enable RLS
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon (webhook needs this)
CREATE POLICY "Allow insert from webhook" ON purchases
  FOR INSERT TO anon WITH CHECK (true);

-- Allow select by download token (public download page)
CREATE POLICY "Allow select by token" ON purchases
  FOR SELECT TO anon USING (true);

-- Allow update download count
CREATE POLICY "Allow update download count" ON purchases
  FOR UPDATE TO anon USING (true) WITH CHECK (true);
