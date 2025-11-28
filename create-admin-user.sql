-- ============================================
-- CREATE ADMIN USER
-- Instructions pour créer un utilisateur admin
-- ============================================

-- 1. D'abord, créer un compte dans Supabase Auth
--    Via interface Supabase: Authentication > Users > Add user
--    Email: admin@islamicshop.com
--    Password: (choisissez un mot de passe sécurisé)
--    Confirm password: true

-- 2. Ensuite, mettre à jour le rôle dans profiles
--    Récupérez l'ID de l'utilisateur créé et exécutez:

UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@islamicshop.com';

-- 3. Vérifier que ça a fonctionné:

SELECT id, email, role, created_at 
FROM profiles 
WHERE role = 'admin';

-- ============================================
-- ALTERNATIVE: Créer admin via SQL
-- ============================================

-- Si vous préférez créer via SQL (plus avancé):
-- NOTE: Cela nécessite la service_role key, pas la anon key

/*
-- Créer l'utilisateur dans auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@islamicshop.com',
  crypt('VotreMotDePasse', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);

-- Le trigger handle_new_user() créera automatiquement le profile
-- Ensuite mettre à jour le rôle:
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@islamicshop.com';
*/

-- ============================================
-- CRÉER UN COMPTE DE TEST ADMIN via l'interface Supabase:
-- ============================================
-- 1. Allez sur Supabase Dashboard
-- 2. Authentication > Users
-- 3. "Add user"
--    - Email: admin@test.com
--    - Password: Admin123!
--    - Auto Confirm User: ON
-- 4. Cliquez "Create"
-- 5. Copiez l'UUID de l'utilisateur
-- 6. Revenez au SQL Editor et exécutez:

-- UPDATE profiles 
-- SET role = 'admin' 
-- WHERE id = 'COLLEZ_UUID_ICI';

-- Maintenant vous pouvez vous connecter:
-- http://localhost:5173/admin/login
-- Email: admin@test.com  
-- Password: Admin123!
