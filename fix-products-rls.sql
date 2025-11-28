-- RLS (Row Level Security) Policies pour la table products
-- Version corrigée pour Supabase
-- Exécuter ce script dans Supabase SQL Editor

-- 1. Activer RLS sur la table products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 2. Supprimer les anciennes policies
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Admins can do everything" ON products;
DROP POLICY IF EXISTS "Admin full access to products" ON products;
DROP POLICY IF EXISTS "Public read access to active products" ON products;

-- 3. Policy LECTURE : Tout le monde peut voir les produits actifs
CREATE POLICY "Public read access to active products"
ON products
FOR SELECT
USING (is_active = true);

-- 4. Policy ADMIN : Pour l'instant, on donne l'accès à TOUS les utilisateurs authentifiés
-- (On affinera après avec un système de rôles)
CREATE POLICY "Authenticated users can manage products"
ON products
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. OPTIONNEL : Si tu veux créer une vraie table users avec des rôles
-- Décommenter si besoin :

/*
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer RLS sur users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy pour users : tout le monde peut voir son propre profil
CREATE POLICY "Users can view own profile"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Policy pour créer son profil
CREATE POLICY "Users can insert own profile"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Ensuite, créer un utilisateur admin :
INSERT INTO public.users (id, email, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'TON-EMAIL@example.com'),
  'TON-EMAIL@example.com',
  'admin'
)
ON CONFLICT (id) DO UPDATE SET role = 'admin';
*/

-- 6. Vérifier les policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'products';
