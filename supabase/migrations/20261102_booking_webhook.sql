-- Run AFTER creating a Vault secret named booking_webhook_secret
-- with the SAME value as the Edge Function secret BOOKING_WEBHOOK_SECRET.
-- Deploy the included function before running this file.
begin;
create extension if not exists pg_net with schema extensions;
do $$ begin
 if not exists(select 1 from vault.decrypted_secrets where name='booking_webhook_secret' and length(decrypted_secret)>=32) then raise exception 'Create Vault secret booking_webhook_secret (32+ characters) first';end if;
end $$;
create or replace function public.notify_new_booking() returns trigger language plpgsql security definer set search_path='' as $$
 declare token text;begin
 select decrypted_secret into token from vault.decrypted_secrets where name='booking_webhook_secret' limit 1;
 perform net.http_post(
 url:='https://zxdigpcqcjlupwbchorw.supabase.co/functions/v1/booking-notifier',
 headers:=jsonb_build_object('Content-Type','application/json','x-booking-secret',token),
 body:=jsonb_build_object('type','INSERT','table','bookings','schema','public','record',jsonb_build_object('id',new.id,'customer_name',new.customer_name,'service_type',new.service_type)),
 timeout_milliseconds:=60000);
 return new;
end $$;
revoke all on function public.notify_new_booking() from public;
drop trigger if exists "booking-notifier" on public.bookings;
drop trigger if exists operations_new_booking on public.bookings;
create trigger operations_new_booking after insert on public.bookings for each row execute function public.notify_new_booking();
commit;
