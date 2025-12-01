-- 1. Sync missing profiles from auth.users
INSERT INTO public.profiles (id, email, role, created_at, updated_at)
SELECT 
    id, 
    email, 
    'customer',
    created_at,
    created_at
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);

-- 2. Fix RLS Policy to ensure Admins can view ALL profiles
DROP POLICY IF EXISTS "Profiles are viewable by owner" ON profiles;

CREATE POLICY "Profiles are viewable by owner and admins" 
ON profiles FOR SELECT 
TO authenticated 
USING (
    id = auth.uid() -- User can see their own
    OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin' -- Admin can see all
);

-- 3. Verify admin role for current user (optional, just to be safe)
-- You can run this if you need to force your user to be admin:
-- UPDATE profiles SET role = 'admin' WHERE email = 'votre_email@gmail.com';
