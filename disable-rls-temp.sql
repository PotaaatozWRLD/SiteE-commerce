-- SOLUTION TEMPORAIRE : Désactiver complètement RLS pour tester
-- ⚠️ ATTENTION : Ceci rend la table products PUBLIQUE (lecture/écriture pour tous)
-- À utiliser UNIQUEMENT pour le développement/test

-- Désactiver RLS sur products
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Pour réactiver plus tard :
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
