# GoFix&Clean — admin operations update

**Already deployed the first admin update? Use `UPGRADE_UI.md` instead. Run only its new workspace-refresh migration before deploying this UI.**

This is your existing React/Vite project, updated in place. Your public website routes are retained. Nothing has been deployed to your live website or Supabase from this archive.

## 1. Set up the database

Back up the database and save current policies first. Run the read-only `supabase/preflight.sql` to inspect your existing policies, triggers and provider approval values. Read `REGRESSION_REPORT.md` before deploying. In Supabase SQL Editor, run:

`supabase/migrations/20261102_admin_operations.sql`

This adds acknowledgement/notes, a payment ledger, activity history, notification delivery history and admin membership. It replaces policies on your supplied tables, preserving public booking/application inserts and active provider directory reads. It does not delete bookings or providers. Legacy active providers with a null `is_approved` value remain visible, as they were in the existing marketplace. Explicitly unapproved (`false`) or inactive providers are hidden. Review legacy providers and explicitly approve or reject them in admin. Provider phone numbers remain publicly readable because your existing marketplace displays them.

Existing confirmed Supabase Auth accounts gofixclean@gmail.com and yvesjulio3@gmail.com are added as admins. Ensure your admin account exists and its email is confirmed before running the SQL. To add an administrator later, run this in SQL Editor with their verified email:

```sql
insert into public.admin_members(user_id)
select id from auth.users
where email = 'YOUR_ADMIN_EMAIL' and email_confirmed_at is not null
on conflict do nothing;
```

Admin membership is stored by user ID. Changing an email later does not transfer admin access. Browser email checks alone are no longer used for authorization. Keep service-role keys out of the browser.

## 2. Run your website

Copy `.env.example` to `.env.local`. Fill in your project's PUBLIC anon/publishable key. Never use a service-role key in a VITE variable.

```bash
npm ci
npm run dev
```

Open the displayed URL followed by `/#/admin-login`. Existing Supabase Auth email/password accounts are used. The application uses HashRouter, so admin paths include `/#/`.

Build and deploy through your existing website workflow:

```bash
npm run build
```

Upload the generated `dist` directory to your existing static host, or commit the source changes to the repository your host builds. No new hosting account is required. The archive does not include a production build because the public Supabase key must be supplied at build time.

## 3. Finish Telegram + email + ntfy

Keep existing Edge Function secrets:

- TELEGRAM_BOT_TOKEN — your new bot token
- TELEGRAM_CHAT_ID — 8269241797
- RESEND_API_KEY
- ADMIN_EMAIL — gofixclean@gmail.com for the Resend test sender
- NTFY_TOPIC — the exact topic subscribed to in your phone app
- BOOKING_FROM_EMAIL — optional; use a verified-domain sender for normal production email

Add a new `BOOKING_WEBHOOK_SECRET` secret: a fresh random value of 32+ characters. Generate it with a password manager; do not share it in chat.

In Supabase Vault, create a secret named `booking_webhook_secret` with exactly the SAME value. This keeps the secret out of stored function source and replaces the old service-role webhook header.

Deploy the complete replacement from `supabase/functions/booking-notifier/index.ts` to the existing booking-notifier function. In its settings, turn OFF the legacy gateway “Verify JWT” option: the new handler itself verifies a dedicated webhook secret or a signed-in admin session. Do not disable that setting on the OLD function. CLI users can deploy using the included `supabase/config.toml`.

Then run `supabase/migrations/20261102_booking_webhook.sql` in SQL Editor. It replaces the old booking-notifier trigger, uses the Vault secret and raises the request timeout to 60 seconds. Do this immediately after deploying the function; the previous trigger cannot authenticate against the new handler.

Rotate/revoke the previously exposed service-role key in Supabase. This updated webhook does not use it. Any other server integrations using that key need the replacement. Supabase supplies the service-role environment variable to its Edge Functions; never put it into frontend files.

## 4. Verify the actual booking flow

1. Sign in at /#/admin-login and open Overview.
2. Submit a booking through the public site named JULIO TEST — IGNORE. Include one image and video.
3. Confirm the booking appears in Bookings and all three apps receive alerts.
4. Open the booking: play video / open image, acknowledge, save an internal note, correct its service if needed, and assign an approved active provider.
5. Refresh and confirm the changes persist; expand Change history.
6. Review Notifications: “Accepted” is provider API acceptance, not proof of reading. Retry failed channels individually. A successful record is skipped to avoid resending it.
7. Record a test payment, refresh, then correct or remove test data using your normal admin process / SQL Editor. The payment page is a manual ledger; it does not move money.
8. In a private window, verify customers can submit bookings and view active approved/legacy providers but cannot read booking records or edit providers.

ntfy only receives a generic alert, never customer details. Telegram and email include booking details and media links. A public ntfy topic is not access-controlled. Enable sound and background notification delivery on your phone.

## What is included

- Overview with unacknowledged bookings, today's visits, active jobs and pending applications; minute refresh while visible.
- Search/filter bookings; direct links; acknowledge separately from assignment; status changes; scheduling; service correction; internal notes; audit history.
- Customer call/WhatsApp/map search; image previews, playable videos and original media links.
- Provider creation/editing, availability, approval and active/inactive status. No destructive provider delete button.
- Atomic application approval/rejection preserving reviewed applications.
- Customers grouped by normalized phone number, with booking history.
- Manual payment amounts in RWF; provider amount, agreed margin and balance outstanding.
- Three-channel notification results with admin-only manual retry.
- Mobile layout and one shared Supabase client/session.

## Limits and checks

- Production frontend build passes. Notification tests use mocked services; they do not send real alerts.
- SQL access-rule tests passed in an isolated PostgreSQL-compatible database with your supplied schema, not your live Supabase. Desktop bookings layout and note saving were checked in a browser with temporary sample data; these fixtures are not in the delivered app.
- Live login, real records, provider delivery and production hosting require your account configuration and the checks above.
- No automatic reminder/retry scheduler. Notification deduplication uses delivery history and is best effort; simultaneous calls or a failure to log an accepted delivery can still duplicate an alert. Notification data is retained until you remove it.
- Booking and provider lists use paginated database reads, then filter locally. This suits a small operation; large datasets need server-side search/pagination.
- Audit history begins after migration. Payment totals are manually entered, not inferred from the identity-generated `providers.job_done` field (that field is not a reliable completed-job count).
- Public booking/application endpoints retain your existing approach; add rate limiting/CAPTCHA before a wider launch to reduce spam and notification abuse.

Run notification tests with `node --test tests/notifier.test.mjs`.

Optional database regression test: install `@electric-sql/pglite` in a disposable copy of this project (`npm install --no-save @electric-sql/pglite`), then run `node tests/database-check.mjs`. This creates an isolated in-memory test database, not a connection to Supabase.

Run the repeatable automated regression suite with `npm run test:regression` (18 tests). See `REGRESSION_REPORT.md` for the database and browser coverage and the remaining live checks.
