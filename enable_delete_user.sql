-- Enable cascade deletion for users
-- This allows deleting a user from auth.users to automatically delete their profile, orders, and reviews.

-- 1. Profiles
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS profiles_id_fkey,
ADD CONSTRAINT profiles_id_fkey
    FOREIGN KEY (id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- 2. Orders
ALTER TABLE public.orders
DROP CONSTRAINT IF EXISTS orders_user_id_fkey,
ADD CONSTRAINT orders_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- 3. Reviews
ALTER TABLE public.reviews
DROP CONSTRAINT IF EXISTS reviews_user_id_fkey,
ADD CONSTRAINT reviews_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;
