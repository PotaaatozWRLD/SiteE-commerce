# Database Scripts

This directory contains SQL scripts for managing the Supabase database.

## Schema & Setup
- `supabase-schema.sql`: Main database schema (tables, RLS policies).
- `update_handle_new_user.sql`: Trigger to handle new user registration.

## Fixes & Maintenance
- `fix-products-rls.sql`: Fixes Row Level Security policies for products.
- `fix_customers_visibility.sql`: Fixes visibility for customer data.
- `enable_delete_user.sql`: Enables cascade deletion for users (deletes profile/orders when user is deleted).
- `alter_products_dropshipping.sql`: Adds dropshipping fields to products table.

## User Management
- `create-admin-user.sql`: Creates an initial admin user.
- `restore_admin_access.sql`: Restores admin access if lost.
- `auto_confirm_users.sql`: **(Dev only)** Auto-confirms email for new users.
- `confirm_client_email.sql`: Manually confirms a specific client email.
- `check_client_user.sql`: Checks status of a client user.
