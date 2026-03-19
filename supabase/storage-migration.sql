-- =============================================
-- Supabase Storage: products bucket
-- Run this in the Supabase SQL Editor (Dashboard > SQL)
-- =============================================

-- Create the 'products' storage bucket (private, not public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', false)
ON CONFLICT (id) DO NOTHING;

-- Policy: Only service_role can upload/update/delete (admin only)
-- No public read access — downloads go through /api/download with token auth

CREATE POLICY "Service role can upload products"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'products');

CREATE POLICY "Service role can update products"
ON storage.objects FOR UPDATE
TO service_role
USING (bucket_id = 'products');

CREATE POLICY "Service role can delete products"
ON storage.objects FOR DELETE
TO service_role
USING (bucket_id = 'products');

-- Allow service_role to read (needed for download API)
CREATE POLICY "Service role can read products"
ON storage.objects FOR SELECT
TO service_role
USING (bucket_id = 'products');
