-- Create the newsletter subscribers table
create table if not exists public.newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  is_active boolean default true
);

-- Enable Row Level Security (RLS)
alter table public.newsletter_subscribers enable row level security;

-- Allow anyone to insert (subscribe)
create policy "Anyone can subscribe"
  on public.newsletter_subscribers
  for insert
  with check (true);

-- Only admins can view subscribers
create policy "Admins can view subscribers"
  on public.newsletter_subscribers
  for select
  using (
    auth.role() = 'authenticated' and
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );
