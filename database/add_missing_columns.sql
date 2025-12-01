-- Add missing columns to products table
alter table public.products 
add column if not exists cost_price numeric,
add column if not exists supplier_url text,
add column if not exists badge text;

-- Refresh the schema cache (sometimes needed)
notify pgrst, 'reload config';
