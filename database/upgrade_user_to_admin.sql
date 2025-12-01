-- Upgrade a specific user to admin
-- Replace the email below with the user you want to upgrade
update public.profiles
set role = 'admin'
where email = 'contact.pro.kenan@gmail.com';

-- Verify the change
select * from public.profiles where email = 'contact.pro.kenan@gmail.com';
