# GoFix&Clean regression results — 2 November 2026

The updated application was compared with the original uploaded ZIP. One database compatibility issue was found and fixed. These results cover local and isolated tests, not an assertion that production configuration has been verified.

## Fixed during regression testing

The first version's public provider policy required `is_approved = true`. Existing active providers with a null approval value could disappear from the marketplace. The corrected policy preserves active legacy providers with null approval and approved active providers. Explicit false approval and inactive status remain hidden. The same compatibility rule is applied to their public skills.

Explicit server-role read grants were also added for the admin membership and booking records used by the notifier. This avoids relying on a project's default grants.

## Automated checks

`npm run test:regression` — **18 passed, 0 failed**.

| Area | Coverage |
| --- | --- |
| Public content | 65 existing public page/component/asset files match their original SHA-256 fingerprints |
| Routing | All original public routes and legacy admin route aliases retained |
| Styling | Added admin CSS selectors remain scoped to the admin root |
| Customer contact | Rwanda local and international phone formats normalize correctly |
| Media | HTTPS links accepted; unsafe protocols excluded |
| Data pagination | 501 booking records are retrieved across the API page boundary |
| Error handling | Read errors and zero-row writes are not reported as success |
| Work status | Completed/cancelled jobs excluded from active jobs |
| Notifications | Authentication, channel isolation, media links, generic ntfy content, deduplication, admin retry authorization, logging errors and malformed records |

The notification services and Supabase client in these unit tests are mocked. No real emails, Telegram messages or ntfy alerts were sent by the tests.

## Isolated database regression checks

**15 check groups passed** using PGlite, a PostgreSQL-compatible test database. Auth users/roles and supplied table definitions were reconstructed locally. The admin SQL migration executed twice successfully.

1. Migration executes and is rerunnable.
2. Public booking insert allowed; public booking read blocked.
3. Non-admin booking reads/updates blocked.
4. Admin update persists and creates audit history.
5. Atomic approval creates one provider; repeated approval rejected.
6. Invalid payment amounts rejected by database constraints.
7. Rerunning migration preserves existing booking records.
8. Legacy active provider and its skill stay publicly visible; explicit unapproved/inactive providers hidden.
9. The exact fields used by the website's booking submission are accepted; a forged completed booking is rejected.
10. The public provider application payload is accepted.
11. Non-admin application reads and approval RPC are blocked.
12. The service role can read records required by the notifier and write delivery history.
13. Non-admin users cannot read or forge notification history.
14. Inserting a booking runs the actual SQL trigger, queues the expected webhook body with a dedicated secret and a 60-second timeout.
15. Updating a booking does not trigger another new-booking alert.

The `net.http_post` function and Vault table were simulated for check 14. This verifies SQL trigger behavior and parameters, not live pg_net background-worker delivery or Supabase Vault encryption.

Optional reproduction: install `@electric-sql/pglite` in a disposable copy with `npm install --no-save @electric-sql/pglite`, then run `npm run test:database`. No production credentials are used.

## Build and browser checks

Both the original uploaded frontend and the updated frontend passed TypeScript + Vite production builds. Dependency versions and the lockfile were retained; only test commands were added to package.json.

The full updated App was run in a separate preview copy with a simulated Supabase backend. The delivered source was not replaced with that fixture.

- Services marketplace rendered a provider and skills.
- Selecting that provider opened the existing booking form.
- Customer details, date, time and description could be entered; submission reached “Booking Request Sent!”. No real booking or notification was created.
- Landing page, About, Become a Provider, Careers, Contact, Privacy, Terms, provider verification and legacy service-detail pages rendered.
- Visiting protected admin bookings while signed out redirected to admin login.
- The previous admin detail-screen QA confirmed internal-note saving with sample records.

A browser automation date-fill issue required committing a date through native keyboard interaction. The form then submitted successfully; no production date-control code change was made. The test fixture also needed a non-secure-HTTP-compatible ID generator. That fixture is not included in the delivered application.

## Production checks still required

- Existing live RLS policies were not supplied. The migration deliberately replaces policies on the supplied tables. Inspect/export them with `supabase/preflight.sql` and compare any integrations outside this ZIP before running it in production.
- Run the migration and deployment sequence in a Supabase test project/branch first. Confirm real admin membership and sign-in.
- Test a real image/video upload to your Cloudinary account. Original upload code is unchanged, but account presets, quotas and network behavior were not verified.
- Confirm deployed pg_net -> function -> Telegram/email/ntfy delivery. Existing working Telegram/email setup was not modified live.
- Verify phone notification permissions/background delivery on the S23 Ultra.
- Check mobile layout on the actual phone; browser regression checks used a desktop viewport.
- Check externally configured contact links, email domains, quotas, hosting rewrites and any integrations absent from the uploaded source.
- Legacy `/service-details/:category` still reads the existing local provider store, while `/services` reads Supabase. The main Supabase booking path was exercised; legacy service-detail rendering was checked, not its complete booking flow.

Do not interpret a passing local build or simulated test as a guarantee against every production regression. Nothing in the live database, hosting or notification accounts was changed by this test run.
