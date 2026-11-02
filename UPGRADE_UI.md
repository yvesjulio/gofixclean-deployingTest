# Update the admin panel already deployed on Vercel

Your public site and current Telegram/email alerts can stay running. Do not repeat the earlier full database setup.

## 1. Run ONE upgrade SQL file first

Open `supabase/migrations/20261102_admin_workspace_refresh.sql`, copy it into Supabase SQL Editor, and run it.

This adds archive fields and protected management actions. Existing records remain intact. Apply this SQL before publishing the new frontend, because the new lists query these archive fields.

## 2. Copy the update into your existing Git checkout

Use your existing `gofixclean-live` folder (the one with `.git`). Replace its `src`, `supabase`, `tests`, `package.json`, `vite.config.ts`, `START_HERE.md` and `REGRESSION_REPORT.md` with the matching items from this archive. Also copy `UPGRADE_UI.md`.

Keep your `.git`, `.env` and credentials. Do not run `git clone` or `git init` again.

From the existing `gofixclean-live` terminal:

```bash
git add src supabase tests package.json vite.config.ts START_HERE.md REGRESSION_REPORT.md UPGRADE_UI.md
git commit -m "Refresh admin workspace and add archive management"
git push origin main
```

Wait for the new Vercel deployment to say Ready, then refresh /#/admin.

## What changed

- Your existing logo replaces the plain brand heading. The Kigali/RWF header label is removed.
- Desktop navigation collapses to an icon rail and remembers your choice. On phones the menu opens as an overlay drawer, with a close button and Escape support.
- Bookings, providers and applications have archive/restore controls. Archived records are hidden from working lists. Archived providers disappear from the public marketplace.
- Permanent deletion is available from the Archived view, after typing DELETE. Payment-linked bookings and providers linked to booking history cannot be permanently deleted. Providers with active jobs cannot be archived until those jobs are reassigned or finished.
- Archived bookings can still be inspected, but must be restored to edit them. Payment records keep the names of archived bookings.
- Notifications shows Telegram / Email / Phone alerts, last recorded outcomes, customer names, result filters and a Resend alert button for failures. An empty log is clearly distinguished from a failed channel.

## Notification tracking is a separate backend update

Pushing code to GitHub updates the Vercel frontend. It does not deploy a Supabase Edge Function.

Your current working Telegram/email function is not changed by this UI upgrade. Until you finish the notifier setup in START_HERE.md, the history page may be empty and Check settings may report that the check is unavailable. That does not prove your working alerts have stopped.

The included notifier supports a signed-in-admin-only settings check that returns configuration flags, not tokens. It sends no messages during the check. Ready to test indicates configured settings, not a guaranteed delivery. The included full notifier still needs its dedicated webhook secret, deployment and webhook migration described in START_HERE.md to record three-channel delivery results.

Do not disable JWT verification on the OLD working function. Follow the complete backend replacement sequence when ready; a frontend push alone is not that replacement.

## Verify

1. Collapse and expand the desktop sidebar. Navigate to another page and confirm the preference is remembered.
2. On the S23 Ultra, open/close the menu and navigate between pages.
3. Archive a junk test booking, find it in Archived, restore it, and confirm it returns to Workspace.
4. For truly disposable data, archive it, then use Delete permanently and type DELETE. It cannot be undone.
5. Confirm real jobs, payment records and public provider listings remain correct.
6. Open Notifications: unknown/no history must not be mistaken for verified delivery or disconnection.

Validation: production build passes; public-content regression checks still pass. Archive/delete database rules are tested locally, and sidebar/archive/restore interactions were checked using isolated sample data. Live mobile behavior and your production data must be checked after deployment.
