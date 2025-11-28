# 🔐 Configuration Supabase - Instructions

## ⚠️ ÉTAPE IMPORTANTE : Créer le fichier .env.local

Le fichier `.env.local` est protégé par gitignore pour la sécurité (c'est normal !).

### **Créez manuellement le fichier** :

1. **Ouvrez VS Code**
2. **Créez un nouveau fichier** à la racine du projet : `.env.local`
3. **Copiez-collez ce contenu** :

```env
VITE_SUPABASE_URL=https://entmwwrwrqlktqucarzg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVudG13d3J3cnFsa3RxdWNhcnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNjc0NzYsImV4cCI6MjA3OTc0MzQ3Nn0.EzkNm6RuIPSqP4_FAXuKKyU2XzPyHIXBe47QfGye7vs
```

4. **Sauvegardez** le fichier

---

## 📊 Créer les Tables dans Supabase

1. **Allez sur** [supabase.com](https://supabase.com/dashboard)
2. **Ouvrez votre projet** `islamic-shop`
3. **Cliquez sur** "SQL Editor" dans le menu gauche
4. **Créez une "New query"**
5. **Copiez tout le contenu** du fichier [supabase-schema.sql](file:///C:/Users/hipix/Desktop/site/supabase-schema.sql)
6. **Collez-le** dans l'éditeur SQL
7. **Cliquez sur "Run"** en bas à droite

✅ Cela va créer :
- 6 tables (categories, products, orders, order_items, reviews, profiles)
- Row Level Security (RLS) policies
- Triggers automatiques
- 6 catégories
- 6 produits de test

---

## 🔄 Redémarrer le serveur Vite

Pour que les variables d'environnement soient chargées :

1. **Arrêtez** le serveur actuel (Ctrl+C dans le terminal)
2. **Relancez** : `npm run dev`

---

## ✅ Vérifier que ça marche

Une fois redémarré, les produits devraient être chargés depuis Supabase !

Allez sur `http://localhost:5173` et vérifiez la section produits.

---

**Dites-moi une fois que c'est fait !** 🚀
