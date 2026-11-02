import { PGlite } from "@electric-sql/pglite";
import fs from "node:fs";
import assert from "node:assert/strict";
const db = new PGlite();
await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
create schema auth; create table auth.users(id uuid primary key,email text,email_confirmed_at timestamptz);
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
grant usage on schema auth to anon,authenticated;grant execute on function auth.uid() to anon,authenticated;
insert into auth.users values('00000000-0000-4000-8000-000000000001','gofixclean@gmail.com',now()),('00000000-0000-4000-8000-000000000002','other@example.invalid',now());
create table public.bookings(id uuid primary key default gen_random_uuid(),customer_name text not null,phone text not null,address text not null,landmark text,service_type text not null,task_description text,urgency text,scheduled_date date,scheduled_time time,media_urls text[],status text default 'pending',provider_id uuid,created_at timestamp default now());
create table public.providers(id uuid primary key default gen_random_uuid(),worker_code text unique,full_name text not null,phone text not null,service_type text not null,base_location text,availability text,min_cost integer,rating numeric default 0,reliability text default 'medium',status text default 'active',created_at timestamp default now(),is_approved boolean,job_done integer generated always as identity,provider_bio text);
create table public.provider_verifications(id uuid primary key default gen_random_uuid(),full_name text not null,phone text not null,address text not null,service_type text not null,about text,status text default 'pending',created_at timestamp default now());
create table public.provider_skills(id uuid primary key default gen_random_uuid(),provider_id uuid,skill text not null);
create table public.provider_performance(id uuid primary key default gen_random_uuid(),provider_id uuid);
`);
const sql = fs.readFileSync(
  new URL(
    "../supabase/migrations/20261102_admin_operations.sql",
    import.meta.url,
  ),
  "utf8",
);
await db.exec(sql);
await db.exec(sql);
console.log("PASS: migration executes and is rerunnable");
await db.exec(
  `set role anon;insert into public.bookings(customer_name,phone,address,service_type) values('Test','000','Test','Plumbing');`,
);
try {
  await db.query("select * from public.bookings");
  assert.fail("anon read should fail");
} catch (e) {
  assert.match(e.message, /permission denied/);
}
console.log("PASS: public insert allowed, public booking reads blocked");
await db.exec(
  `reset role;set role authenticated;set request.jwt.claim.sub='00000000-0000-4000-8000-000000000002';`,
);
assert.equal((await db.query("select * from public.bookings")).rows.length, 0);
assert.equal(
  (await db.query("update public.bookings set status='completed' returning id"))
    .rows.length,
  0,
);
console.log("PASS: non-admin cannot read/update bookings");
await db.exec(
  `set request.jwt.claim.sub='00000000-0000-4000-8000-000000000001';`,
);
assert.equal((await db.query("select * from public.bookings")).rows.length, 1);
await db.exec(
  `update public.bookings set status='contacted',acknowledged_at=now();`,
);
assert.equal(
  (await db.query("select * from public.booking_activity")).rows.length,
  1,
);
console.log("PASS: admin updates persist and create audit history");
await db.exec(
  `insert into public.provider_verifications(full_name,phone,address,service_type)values('Provider','000','Kigali','Plumbing');`,
);
const id = (await db.query("select id from public.provider_verifications"))
  .rows[0].id;
await db.query("select public.review_provider_application($1,true)", [id]);
assert.equal((await db.query("select * from public.providers")).rows.length, 1);
await assert.rejects(
  () => db.query("select public.review_provider_application($1,true)", [id]),
  /already reviewed/,
);
assert.equal((await db.query("select * from public.providers")).rows.length, 1);
console.log("PASS: approval creates one provider, repeat approval rejected");
const booking = (await db.query("select id from public.bookings")).rows[0].id;
await assert.rejects(
  () =>
    db.query(
      "insert into public.booking_payments(booking_id,customer_total,provider_amount,collected)values($1,100,200,0)",
      [booking],
    ),
  /check constraint/,
);
console.log("PASS: invalid payment totals blocked");

await db.exec(`reset role;
insert into public.providers(id,full_name,phone,service_type,status,is_approved)values
('11111111-1111-4111-8111-111111111111','Legacy provider','000','Plumbing','active',null),
('22222222-2222-4222-8222-222222222222','Unapproved provider','000','Plumbing','active',false),
('33333333-3333-4333-8333-333333333333','Inactive provider','000','Plumbing','inactive',true);
insert into public.provider_skills(provider_id,skill)values('11111111-1111-4111-8111-111111111111','Leak repair');`);
const before = (await db.query("select * from public.bookings")).rows;
await db.exec(sql);
assert.deepEqual(
  (await db.query("select * from public.bookings")).rows,
  before,
);
console.log("PASS: rerunning migration preserves existing booking records");
await db.exec("set role anon");
assert.equal((await db.query("select * from public.providers")).rows.length, 2);
assert.equal(
  (await db.query("select skill from public.provider_skills")).rows[0].skill,
  "Leak repair",
);
console.log(
  "PASS: legacy active provider and skill remain visible; unapproved/inactive providers hidden",
);
await db.query(
  `insert into public.bookings(customer_name,phone,address,landmark,service_type,task_description,urgency,scheduled_date,scheduled_time,media_urls)values('Website regression test','000','Kigali','Test landmark','Plumbing','Leak repair','normal','2026-11-03','10:00:00',ARRAY['https://example.invalid/test.jpg'])`,
);
await assert.rejects(
  () =>
    db.query(
      `insert into public.bookings(customer_name,phone,address,service_type,status)values('Fake','000','Kigali','Plumbing','completed')`,
    ),
  /row-level security/,
);
console.log(
  "PASS: exact public booking payload accepted, forged completed booking rejected",
);
await db.query(
  `insert into public.provider_verifications(full_name,phone,address,service_type,about)values('Public applicant','000','Kigali','Plumbing','Application regression test')`,
);
console.log("PASS: public provider application payload accepted");
await db.exec(
  `reset role;set role authenticated;set request.jwt.claim.sub='00000000-0000-4000-8000-000000000002';`,
);
assert.equal(
  (await db.query("select * from public.provider_verifications")).rows.length,
  0,
);
await assert.rejects(
  () => db.query("select public.review_provider_application($1,true)", [id]),
  /Admin access required/,
);
console.log("PASS: non-admin application reads and review RPC blocked");
await db.exec(`reset role;set role service_role;`);
assert.equal(
  (await db.query("select * from public.admin_members")).rows.length,
  1,
);
assert.equal((await db.query("select * from public.bookings")).rows.length, 2);
await db.query(
  `insert into public.notification_deliveries(booking_id,channel,ok)values($1,'ntfy',true)`,
  [booking],
);
console.log(
  "PASS: server service role can read required records and log delivery",
);
await db.exec(
  `reset role;set role authenticated;set request.jwt.claim.sub='00000000-0000-4000-8000-000000000002';`,
);
assert.equal(
  (await db.query("select * from public.notification_deliveries")).rows.length,
  0,
);
await assert.rejects(
  () =>
    db.query(
      `insert into public.notification_deliveries(channel,ok)values('ntfy',true)`,
    ),
  /permission denied/,
);
console.log("PASS: non-admin cannot read or forge notification history");
await db.exec(`reset role;create schema vault;create table vault.decrypted_secrets(name text,decrypted_secret text);
create schema net;create table net.requests(url text,headers jsonb,body jsonb,timeout_ms integer);
create function net.http_post(url text,headers jsonb,body jsonb,timeout_milliseconds integer)returns bigint language plpgsql as $$begin insert into net.requests values(url,headers,body,timeout_milliseconds);return 1;end$$;
insert into vault.decrypted_secrets values('booking_webhook_secret','test-secret-at-least-thirty-two-characters');`);
const webhookSql = fs
  .readFileSync(
    new URL(
      "../supabase/migrations/20261102_booking_webhook.sql",
      import.meta.url,
    ),
    "utf8",
  )
  .replace(
    "create extension if not exists pg_net with schema extensions;",
    "-- Stub pg_net used in isolated regression test",
  );
await db.exec(webhookSql);
await db.exec(
  `set role anon;insert into public.bookings(customer_name,phone,address,service_type)values('Webhook regression','000','Kigali','Plumbing');reset role;`,
);
const request = (await db.query("select * from net.requests")).rows[0];
assert.equal(request.timeout_ms, 60000);
assert.equal(request.body.type, "INSERT");
assert.equal(
  request.headers["x-booking-secret"],
  "test-secret-at-least-thirty-two-characters",
);
assert.equal(request.body.table, "bookings");
assert.equal(request.headers.Authorization, undefined);
console.log(
  "PASS: real SQL booking trigger queues authenticated webhook with 60-second timeout",
);
await db.exec(
  `set role authenticated;set request.jwt.claim.sub='00000000-0000-4000-8000-000000000001';update public.bookings set internal_notes='Update should not notify';reset role;`,
);
assert.equal((await db.query("select * from net.requests")).rows.length, 1);
console.log("PASS: booking edits do not retrigger new-booking notifications");

const upgrade = fs.readFileSync(
  new URL(
    "../supabase/migrations/20261102_admin_workspace_refresh.sql",
    import.meta.url,
  ),
  "utf8",
);
await db.exec(upgrade);
await db.exec(upgrade);
console.log("PASS: workspace upgrade is rerunnable");
await db.exec(
  `set role authenticated;set request.jwt.claim.sub='00000000-0000-4000-8000-000000000001';`,
);
await db.query(
  `select public.manage_operations_record('booking',$1,'archive')`,
  [booking],
);
assert(
  (
    await db.query("select archived_at from public.bookings where id=$1", [
      booking,
    ])
  ).rows[0].archived_at,
);
await db.query(
  `select public.manage_operations_record('booking',$1,'restore')`,
  [booking],
);
assert.equal(
  (
    await db.query("select archived_at from public.bookings where id=$1", [
      booking,
    ])
  ).rows[0].archived_at,
  null,
);
console.log("PASS: booking archive and restore preserve the record");
await assert.rejects(
  () =>
    db.query(`select public.manage_operations_record('booking',$1,'delete')`, [
      booking,
    ]),
  /Archive this booking/,
);
await db.query(
  "insert into public.booking_payments(booking_id,customer_total,provider_amount,collected)values($1,100,80,0)",
  [booking],
);
await db.query(
  `select public.manage_operations_record('booking',$1,'archive')`,
  [booking],
);
await assert.rejects(
  () =>
    db.query(`select public.manage_operations_record('booking',$1,'delete')`, [
      booking,
    ]),
  /payment records/,
);
console.log(
  "PASS: permanent deletion requires archive and refuses paid or unpaid financial records",
);
await db.query(
  `select public.manage_operations_record('provider','11111111-1111-4111-8111-111111111111','archive')`,
);
await db.exec("reset role;set role anon;");
assert.equal(
  (
    await db.query(
      `select * from public.providers where id='11111111-1111-4111-8111-111111111111'`,
    )
  ).rows.length,
  0,
);
assert.equal(
  (await db.query("select * from public.provider_skills")).rows.length,
  0,
);
console.log(
  "PASS: archived provider and skills are hidden from the public website",
);
await db.exec(
  `reset role;set role authenticated;set request.jwt.claim.sub='00000000-0000-4000-8000-000000000001';`,
);
await db.query(
  `select public.manage_operations_record('provider','11111111-1111-4111-8111-111111111111','restore')`,
);
await db.exec("reset role;set role anon;");
assert.equal(
  (
    await db.query(
      `select * from public.providers where id='11111111-1111-4111-8111-111111111111'`,
    )
  ).rows.length,
  1,
);
console.log("PASS: restoring a provider restores public visibility");
await db.exec(
  `reset role;set role authenticated;set request.jwt.claim.sub='00000000-0000-4000-8000-000000000001';`,
);
const assigned = (
  await db.query(
    `insert into public.bookings(customer_name,phone,address,service_type,provider_id,status) values('Assigned','000','Test','Plumbing','11111111-1111-4111-8111-111111111111','assigned')returning id`,
  )
).rows[0].id;
await assert.rejects(
  () =>
    db.query(
      `select public.manage_operations_record('provider','11111111-1111-4111-8111-111111111111','archive')`,
    ),
  /active jobs/,
);
await db.query(`update public.bookings set status='completed' where id=$1`, [
  assigned,
]);
await db.query(
  `select public.manage_operations_record('provider','11111111-1111-4111-8111-111111111111','archive')`,
);
await assert.rejects(
  () =>
    db.query(
      `select public.manage_operations_record('provider','11111111-1111-4111-8111-111111111111','delete')`,
    ),
  /booking history/,
);
console.log(
  "PASS: providers with active jobs cannot be archived; linked providers cannot be deleted",
);
const junk = (
  await db.query(
    `insert into public.bookings(customer_name,phone,address,service_type) values('Junk','000','Test','Cleaning')returning id`,
  )
).rows[0].id;
await db.query(
  `update public.bookings set internal_notes='Test audit' where id=$1`,
  [junk],
);
await db.query(
  `select public.manage_operations_record('booking',$1,'archive')`,
  [junk],
);
await db.query(
  `select public.manage_operations_record('booking',$1,'delete')`,
  [junk],
);
assert.equal(
  (await db.query("select * from public.bookings where id=$1", [junk])).rows
    .length,
  0,
);
assert.equal(
  (
    await db.query(
      "select * from public.booking_activity where booking_id=$1",
      [junk],
    )
  ).rows.length,
  0,
);
console.log("PASS: archived junk booking is removed with dependent history");
const pending = (
  await db.query(
    `insert into public.provider_verifications(full_name,phone,address,service_type) values('Junk application','000','Kigali','Cleaning')returning id`,
  )
).rows[0].id;
await db.query(
  `select public.manage_operations_record('application',$1,'archive')`,
  [pending],
);
await assert.rejects(
  () =>
    db.query("select public.review_provider_application($1,true)", [pending]),
  /archived/,
);
await db.query(
  `select public.manage_operations_record('application',$1,'delete')`,
  [pending],
);
console.log(
  "PASS: archived applications cannot be approved and can be removed",
);
await db.exec(
  `set request.jwt.claim.sub='00000000-0000-4000-8000-000000000002';`,
);
await assert.rejects(
  () =>
    db.query(`select public.manage_operations_record('booking',$1,'archive')`, [
      booking,
    ]),
  /Admin access required/,
);
console.log(
  "PASS: non-admin cannot archive, restore or delete through management RPC",
);
await db.exec("reset role;set role anon;");
await assert.rejects(
  () =>
    db.query(
      `insert into public.bookings(customer_name,phone,address,service_type,archived_at) values('Fake','000','Test','Cleaning',now())`,
    ),
  /row-level security/,
);
console.log("PASS: public cannot submit pre-archived bookings");
await db.close();
