-- UPGRADE: run after 20261102_admin_operations.sql, before deploying the UI refresh.
-- Adds reversible archiving; keeps existing bookings/providers/applications intact.
begin;
alter table public.bookings add column if not exists archived_at timestamptz;
alter table public.providers add column if not exists archived_at timestamptz;
alter table public.provider_verifications add column if not exists archived_at timestamptz;
drop policy if exists public_provider_directory on public.providers;
create policy public_provider_directory on public.providers for select to anon,authenticated using(status='active' and is_approved is distinct from false and archived_at is null);
drop policy if exists public_provider_skills on public.provider_skills;
create policy public_provider_skills on public.provider_skills for select to anon,authenticated using(exists(select 1 from public.providers p where p.id=provider_id and p.status='active' and p.is_approved is distinct from false and p.archived_at is null));
drop policy if exists customer_booking_insert on public.bookings;
create policy customer_booking_insert on public.bookings for insert to anon,authenticated with check(status='pending' and provider_id is null and acknowledged_at is null and internal_notes is null and archived_at is null);
drop policy if exists public_application_insert on public.provider_verifications;
create policy public_application_insert on public.provider_verifications for insert to anon,authenticated with check(status='pending' and archived_at is null);
-- Keep future provider assignments valid without rejecting legacy orphan rows.
do $$ begin
 if not exists(select 1 from pg_constraint where conrelid='public.bookings'::regclass and contype='f' and confrelid='public.providers'::regclass) then
 alter table public.bookings add constraint bookings_operations_provider_fk foreign key(provider_id) references public.providers(id) not valid;
 end if;
end $$;
create or replace function public.guard_provider_assignment() returns trigger language plpgsql security definer set search_path='' as $$
 declare p public.providers;begin
 if tg_op='UPDATE' and new.provider_id is not distinct from old.provider_id then return new;end if;
 if new.provider_id is null then return new;end if;
 select * into p from public.providers where id=new.provider_id for update;
 if not found or p.archived_at is not null or p.status<>'active' or p.is_approved=false then raise exception 'Choose an active, non-archived provider';end if;
 return new;
end $$;
revoke all on function public.guard_provider_assignment() from public;
drop trigger if exists operations_provider_assignment on public.bookings;
create trigger operations_provider_assignment before insert or update of provider_id on public.bookings for each row execute function public.guard_provider_assignment();
create or replace function public.manage_operations_record(entity text,record_id uuid,operation text) returns void language plpgsql security definer set search_path='' as $$
 declare archived timestamptz;begin
 if not public.is_operations_admin() then raise exception 'Admin access required';end if;
 if entity is null or operation is null or entity not in ('booking','provider','application') or operation not in ('archive','restore','delete') then raise exception 'Invalid action';end if;
 if entity='booking' then
  select archived_at into archived from public.bookings where id=record_id for update;
  if not found then raise exception 'Booking not found';end if;
  if operation='archive' then update public.bookings set archived_at=now() where id=record_id;
  elsif operation='restore' then update public.bookings set archived_at=null where id=record_id;
  else
   if archived is null then raise exception 'Archive this booking before permanently deleting it';end if;
   if exists(select 1 from public.booking_payments where booking_id=record_id) then raise exception 'This booking has payment records. Keep it archived to preserve your accounts.';end if;
   delete from public.notification_deliveries where booking_id=record_id;
   delete from public.booking_activity where booking_id=record_id;
   delete from public.bookings where id=record_id;
  end if;
 elsif entity='provider' then
  select archived_at into archived from public.providers where id=record_id for update;
  if not found then raise exception 'Provider not found';end if;
  if operation='archive' then
   if exists(select 1 from public.bookings where provider_id=record_id and archived_at is null and coalesce(status,'pending') not in ('completed','cancelled')) then raise exception 'This provider has active jobs. Reassign or finish them before archiving.';end if;
   update public.providers set archived_at=now() where id=record_id;
  elsif operation='restore' then update public.providers set archived_at=null where id=record_id;
  else
   if archived is null then raise exception 'Archive this provider before permanently deleting it';end if;
   if exists(select 1 from public.bookings where provider_id=record_id) then raise exception 'This provider is linked to booking history. Keep them archived instead.';end if;
   delete from public.provider_skills where provider_id=record_id;
   delete from public.provider_performance where provider_id=record_id;
   delete from public.providers where id=record_id;
  end if;
 else
  select archived_at into archived from public.provider_verifications where id=record_id for update;
  if not found then raise exception 'Application not found';end if;
  if operation='archive' then update public.provider_verifications set archived_at=now() where id=record_id;
  elsif operation='restore' then update public.provider_verifications set archived_at=null where id=record_id;
  else
   if archived is null then raise exception 'Archive this application before permanently deleting it';end if;
   delete from public.provider_verifications where id=record_id;
  end if;
 end if;
end $$;
revoke all on function public.manage_operations_record(text,uuid,text) from public;
grant execute on function public.manage_operations_record(text,uuid,text) to authenticated;
-- Atomic review also rejects an archived application.
create or replace function public.review_provider_application(application_id uuid,approve boolean) returns void language plpgsql security definer set search_path='' as $$
 declare r public.provider_verifications;begin
 if not public.is_operations_admin() then raise exception 'Admin access required';end if;
 select * into r from public.provider_verifications where id=application_id for update;
 if not found or r.status<>'pending' or r.archived_at is not null then raise exception 'Application already reviewed, archived or unavailable';end if;
 if approve then insert into public.providers(full_name,phone,service_type,base_location,provider_bio,status,is_approved,availability) values(r.full_name,r.phone,r.service_type,r.address,coalesce(r.about,'Professional service provider'),'active',true,'available');end if;
 update public.provider_verifications set status=case when approve then 'approved' else 'rejected' end where id=application_id;
end $$;
commit;
