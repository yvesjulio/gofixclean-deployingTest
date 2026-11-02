-- Run once in Supabase SQL Editor. Back up / inspect existing policies first.
-- This migration deliberately replaces policies on the five supplied tables.
begin;
create table if not exists public.admin_members (user_id uuid primary key references auth.users(id) on delete cascade);
insert into public.admin_members(user_id) select id from auth.users where lower(email) in ('gofixclean@gmail.com','yvesjulio3@gmail.com') and email_confirmed_at is not null on conflict do nothing;
alter table public.admin_members enable row level security;
revoke all on public.admin_members from anon,authenticated;
grant select on public.admin_members to service_role;
create or replace function public.is_operations_admin() returns boolean language sql stable security definer set search_path='' as $$ select exists(select 1 from public.admin_members where user_id=auth.uid()); $$;
revoke all on function public.is_operations_admin() from public;
grant execute on function public.is_operations_admin() to anon,authenticated,service_role;
alter table public.bookings add column if not exists acknowledged_at timestamptz;
alter table public.bookings add column if not exists internal_notes text;
create table if not exists public.booking_payments (
 id uuid primary key default gen_random_uuid(), booking_id uuid not null unique references public.bookings(id),
 customer_total bigint not null default 0 check(customer_total>=0), provider_amount bigint not null default 0 check(provider_amount>=0), collected bigint not null default 0 check(collected>=0), notes text,
 created_at timestamptz not null default now(), check(provider_amount<=customer_total),check(collected<=customer_total)
);
create table if not exists public.notification_deliveries(id uuid primary key default gen_random_uuid(),booking_id uuid references public.bookings(id),channel text not null check(channel in ('telegram','email','ntfy')),ok boolean not null,error text,created_at timestamptz not null default now());
create table if not exists public.booking_activity(id uuid primary key default gen_random_uuid(),booking_id uuid not null references public.bookings(id),actor uuid,changes jsonb not null,created_at timestamptz not null default now());
-- Do not expose old permissive policies alongside the admin policies.
do $$ declare p record; t text; begin
 for p in select tablename,policyname from pg_policies where schemaname='public' and tablename in ('bookings','providers','provider_verifications','provider_skills','provider_performance','booking_payments','notification_deliveries','booking_activity') loop execute format('drop policy %I on public.%I',p.policyname,p.tablename); end loop;
 foreach t in array array['bookings','providers','provider_verifications','provider_skills','provider_performance','booking_payments'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('create policy operations_admin on public.%I for all to authenticated using (public.is_operations_admin()) with check (public.is_operations_admin())',t);
 execute format('grant select, insert, update, delete on public.%I to authenticated',t);
 end loop;
end $$;
create policy customer_booking_insert on public.bookings for insert to anon,authenticated with check(status='pending' and provider_id is null and acknowledged_at is null and internal_notes is null);
grant insert on public.bookings to anon;
grant select on public.bookings to service_role;
-- Public directory remains readable; the existing public website uses providers.
create policy public_provider_directory on public.providers for select to anon,authenticated using(status='active' and is_approved is distinct from false);
grant select on public.providers to anon;
create policy public_provider_skills on public.provider_skills for select to anon,authenticated using(exists(select 1 from public.providers p where p.id=provider_id and p.status='active' and p.is_approved is distinct from false));
grant select on public.provider_skills to anon;
create policy public_application_insert on public.provider_verifications for insert to anon,authenticated with check(status='pending');
grant insert on public.provider_verifications to anon;
alter table public.notification_deliveries enable row level security;
alter table public.booking_activity enable row level security;
create policy admin_delivery_read on public.notification_deliveries for select to authenticated using(public.is_operations_admin());
create policy admin_activity_read on public.booking_activity for select to authenticated using(public.is_operations_admin());
revoke all on public.notification_deliveries,public.booking_activity from anon,authenticated;
grant select on public.notification_deliveries,public.booking_activity to authenticated;
grant all on public.notification_deliveries to service_role;
create or replace function public.log_booking_change() returns trigger language plpgsql security definer set search_path='' as $$
 declare diff jsonb; begin
 select coalesce(jsonb_object_agg(n.key,jsonb_build_object('from',o.value,'to',n.value)),'{}'::jsonb) into diff from jsonb_each(to_jsonb(new)) n join jsonb_each(to_jsonb(old)) o using(key) where n.value is distinct from o.value;
 if diff<>'{}'::jsonb then insert into public.booking_activity(booking_id,actor,changes) values(new.id,auth.uid(),diff);end if;
 return new;end $$;
revoke all on function public.log_booking_change() from public;
drop trigger if exists operations_booking_audit on public.bookings;
create trigger operations_booking_audit after update on public.bookings for each row execute function public.log_booking_change();
create or replace function public.review_provider_application(application_id uuid,approve boolean) returns void language plpgsql security definer set search_path='' as $$
 declare r public.provider_verifications;begin
 if not public.is_operations_admin() then raise exception 'Admin access required';end if;
 select * into r from public.provider_verifications where id=application_id for update;
 if not found or r.status<>'pending' then raise exception 'Application already reviewed or unavailable';end if;
 if approve then
 insert into public.providers(full_name,phone,service_type,base_location,provider_bio,status,is_approved,availability) values(r.full_name,r.phone,r.service_type,r.address,coalesce(r.about,'Professional service provider'),'active',true,'available');
 end if;
 update public.provider_verifications set status=case when approve then 'approved' else 'rejected' end where id=application_id;
 end $$;
revoke all on function public.review_provider_application(uuid,boolean) from public;
grant execute on function public.review_provider_application(uuid,boolean) to authenticated;
commit;
