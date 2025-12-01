# 📢 Configuration de la Newsletter Automatique

Pour que les emails partent automatiquement lors de l'ajout d'un produit, suivez ces étapes :

## 1. Déployer la fonction

Dans votre terminal :
```bash
npx supabase functions deploy newsletter-broadcast --no-verify-jwt
```

## 2. Créer le déclencheur (Webhook) dans Supabase

1. Allez sur votre **Dashboard Supabase**.
2. Cliquez sur **Database** (icône base de données) > **Webhooks**.
3. Cliquez sur **"Create a new hook"**.
4. Configurez comme suit :
    - **Name** : `new-product-newsletter`
    - **Table** : `public.products`
    - **Events** : Cochez `INSERT`
    - **Type** : `HTTP Request`
    - **HTTP Request Method** : `POST`
    - **URL** : L'URL de votre fonction déployée (ex: `https://entmwwrwrqlktqucarzg.supabase.co/functions/v1/newsletter-broadcast`)
    - **HTTP Headers** : Ajoutez `Authorization` : `Bearer VOTRE_SUPABASE_ANON_KEY` (ou Service Role Key si besoin, mais Anon suffit souvent si la fonction est publique, sinon utilisez la Service Role Key pour être sûr).
        - *Conseil* : Dans la fonction, nous ne vérifions pas le JWT pour simplifier, donc l'URL suffit.

## 3. Tester

1. Inscrivez votre email dans le footer du site.
2. Ajoutez un produit dans la table `products` via le Dashboard Supabase.
3. Vérifiez vos emails !
