-- Ensure RLS is enabled
alter table public.products enable row level security;

-- 1. VIEW: Anyone can view active products
drop policy if exists "Anyone can view active products" on public.products;
create policy "Anyone can view active products"
  on public.products for select
  using (is_active = true);

-- 2. MANAGE: Admins can do everything (insert, update, delete)
drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products"
  on public.products
  for all
  using (
    auth.role() = 'authenticated' and
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );
