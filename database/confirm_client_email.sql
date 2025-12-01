-- Confirm email for client user
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 'client@islamicshop.com';

-- Verify
SELECT id, email, email_confirmed_at, created_at 
FROM auth.users 
WHERE email = 'client@islamicshop.com';
