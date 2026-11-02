-- READ ONLY: inspect before changing the production database.
select tablename,policyname,roles,cmd,qual,with_check
from pg_policies where schemaname='public'
order by tablename,policyname;
select event_object_table,trigger_name,event_manipulation,action_statement
from information_schema.triggers where event_object_schema='public'
order by event_object_table,trigger_name;
select status,is_approved,count(*) from public.providers group by status,is_approved;
select status,count(*) from public.bookings group by status;
select 'bookings' as table_name,count(*) from public.bookings
union all select 'providers',count(*) from public.providers
union all select 'provider_verifications',count(*) from public.provider_verifications;
