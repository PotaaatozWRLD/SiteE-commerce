-- 📦 SCRIPT DROPSHIPPING
-- Ajout des champs pour gérer les fournisseurs (AliExpress/Temu)

-- 1. Lien vers le fournisseur (pour retrouver le produit rapidement)
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS supplier_url TEXT;

-- 2. Prix d'achat (pour calculer votre marge)
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS cost_price DECIMAL(10,2);

-- 3. Note pour vous :
-- Marge = Price (Prix de vente) - Cost Price (Prix d'achat)
