# 📧 Configuration de l'envoi d'emails (Edge Functions)

Pour que le formulaire de contact fonctionne, vous devez déployer cette fonction sur Supabase.

## 1. Prérequis

Assurez-vous d'avoir installé la CLI Supabase (si ce n'est pas déjà fait) :
```bash
npm install -g supabase
```

## 2. Connexion à Supabase

Dans votre terminal (à la racine du projet) :
```bash
npx supabase login
npx supabase link --project-ref entmwwrwrqlktqucarzg
```
*(On vous demandera peut-être votre mot de passe de base de données)*

## 3. Configurer la clé API Resend

Ajoutez votre clé API Resend aux secrets de Supabase :
```bash
npx supabase secrets set RESEND_API_KEY=re_jQKh1gUE_Bi8UXsBbofQL4wH45p8NxDjM
```

## 4. Déployer la fonction

Envoyez le code sur Supabase :
```bash
npx supabase functions deploy send-contact-email --no-verify-jwt
```

---

## ✅ C'est tout !

Une fois déployé, le formulaire de contact sur le site fonctionnera automatiquement.

> **Note** : En mode test (Resend gratuit), les emails ne peuvent être envoyés qu'à votre propre adresse email (celle de votre compte Resend) ou à `delivered@resend.dev`.
