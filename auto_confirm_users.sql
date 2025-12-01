-- AUTOMATION: Auto-confirm email for new users
-- Useful for local development to avoid manual confirmation steps

CREATE OR REPLACE FUNCTION public.auto_confirm_new_users()
RETURNS TRIGGER AS $$
BEGIN
    NEW.email_confirmed_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run BEFORE a new user is inserted into auth.users
DROP TRIGGER IF EXISTS on_auth_user_created_auto_confirm ON auth.users;
CREATE TRIGGER on_auth_user_created_auto_confirm
    BEFORE INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.auto_confirm_new_users();

-- Also confirm existing users just in case
UPDATE auth.users SET email_confirmed_at = NOW() WHERE email_confirmed_at IS NULL;
