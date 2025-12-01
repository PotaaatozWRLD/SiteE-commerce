-- 1. Create a secure function to check role (Bypasses RLS)
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop the buggy policy
DROP POLICY IF EXISTS "Profiles are viewable by owner" ON profiles;
DROP POLICY IF EXISTS "Profiles are viewable by owner and admins" ON profiles;

-- 3. Create the new safe policy
CREATE POLICY "Profiles are viewable by owner and admins" 
ON profiles FOR SELECT 
TO authenticated 
USING (
    id = auth.uid() -- User can see their own
    OR 
    get_my_role() = 'admin' -- Admin can see all (using secure function)
);

-- 4. Emergency: Ensure your user is admin (Replace with your email if needed)
-- This tries to set the role to admin for the most recently created user if you are the only one, 
-- or you can uncomment and edit the line below:

-- CONFIRM EMAIL MANUALLY (Since we can't access email inbox)
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 'admin@islamicshop.com';

-- PROMOTE TO ADMIN
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@islamicshop.com';

-- Verify
SELECT id, email, role, created_at FROM profiles WHERE email = 'admin@islamicshop.com';

