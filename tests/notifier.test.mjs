import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const source = fs
  .readFileSync("supabase/functions/booking-notifier/index.ts", "utf8")
  .replace(/^import .*\n/, "");
const js = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
  },
}).outputText;
function setup({
  emailFailure = false,
  historyFailure = false,
  member = true,
  prior = false,
} = {}) {
  const sent = [],
    logged = [];
  let handler;
  const secrets = {
    SUPABASE_URL: "https://test.invalid",
    SUPABASE_SERVICE_ROLE_KEY: "test",
    BOOKING_WEBHOOK_SECRET: "test-secret",
    TELEGRAM_BOT_TOKEN: "test-token",
    TELEGRAM_CHAT_ID: "123",
    RESEND_API_KEY: "test-email",
    ADMIN_EMAIL: "test@example.invalid",
    NTFY_TOPIC: "test-long-random-topic",
  };
  const booking = {
    id: "booking-1",
    customer_name: "Test Customer",
    service_type: "Plumbing",
    phone: "000",
    address: "Test address",
    task_description: "Test description",
    media_urls: ["https://example.invalid/a.jpg", "javascript:alert(1)"],
  };
  function from(table) {
    const q = {
      select() {
        return q;
      },
      eq() {
        return q;
      },
      limit() {
        return q;
      },
      single: async () => ({ data: booking, error: null }),
      maybeSingle: async () => ({
        data: member ? { user_id: "admin" } : null,
        error: null,
      }),
      insert: async (row) => {
        logged.push(row);
        return { error: historyFailure ? { message: "fail" } : null };
      },
      then(resolve, reject) {
        return Promise.resolve({
          data: prior ? [{ id: "old" }] : [],
          error: null,
        }).then(resolve, reject);
      },
    };
    return q;
  }
  vm.runInNewContext(js, {
    Deno: { env: { get: (k) => secrets[k] }, serve: (fn) => (handler = fn) },
    createClient: () => ({
      from,
      auth: {
        getUser: async () => ({ data: { user: { id: "admin" } }, error: null }),
      },
    }),
    Response,
    Request,
    URL,
    AbortSignal,
    console: { error() {} },
    fetch: async (url, opts) => {
      sent.push({ url, body: JSON.parse(opts.body) });
      return new Response(
        JSON.stringify(
          emailFailure && url.includes("resend")
            ? { message: "Rejected recipient" }
            : { ok: true },
        ),
        { status: emailFailure && url.includes("resend") ? 403 : 200 },
      );
    },
  });
  return {
    sent,
    logged,
    invoke: (body, headers = { "x-booking-secret": "test-secret" }) =>
      handler(
        new Request("https://test.invalid", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...headers },
          body: JSON.stringify(body),
        }),
      ),
  };
}
const event = {
  type: "INSERT",
  table: "bookings",
  schema: "public",
  record: {
    id: "booking-1",
    customer_name: "Ignored",
    service_type: "Ignored",
  },
};
test("requires authentication", async () => {
  const s = setup();
  assert.equal((await s.invoke(event, {})).status, 401);
  assert.equal(s.sent.length, 0);
});
test("sends all channels, media links, generic ntfy only", async () => {
  const s = setup();
  const r = await s.invoke(event);
  assert.equal(r.status, 200);
  const result = await r.json();
  assert.equal(result.media_links, 1);
  assert.equal(s.logged.length, 3);
  const ntfy = s.sent.find((r) => r.url.includes("ntfy"));
  assert(!JSON.stringify(ntfy.body).includes("Test Customer"));
  assert(
    s.sent.some((r) => r.body.text?.includes("https://example.invalid/a.jpg")),
  );
});
test("email failure does not stop telegram and ntfy", async () => {
  const s = setup({ emailFailure: true });
  const r = await s.invoke(event);
  assert.equal(r.status, 502);
  const d = await r.json();
  assert.equal(d.telegram.ok, true);
  assert.equal(d.ntfy.ok, true);
  assert.equal(d.email.ok, false);
});
test("successful history skips duplicate delivery", async () => {
  const s = setup({ prior: true });
  assert.equal((await s.invoke(event)).status, 200);
  assert.equal(s.sent.length, 0);
});
test("non-admin cannot retry", async () => {
  const s = setup({ member: false });
  assert.equal(
    (
      await s.invoke(
        { action: "retry", booking_id: "booking-1", channel: "ntfy" },
        { Authorization: "Bearer user" },
      )
    ).status,
    403,
  );
  assert.equal(s.sent.length, 0);
});
test("admin retry sends only the requested channel", async () => {
  const s = setup();
  assert.equal(
    (
      await s.invoke(
        { action: "retry", booking_id: "booking-1", channel: "ntfy" },
        { Authorization: "Bearer admin" },
      )
    ).status,
    200,
  );
  assert.equal(s.sent.length, 1);
  assert.equal(s.logged[0].channel, "ntfy");
});
test("history logging failures are surfaced", async () => {
  const s = setup({ historyFailure: true });
  assert.equal((await s.invoke(event)).status, 502);
});
test("rejects malformed records", async () => {
  const s = setup();
  assert.equal(
    (
      await s.invoke({
        type: "INSERT",
        schema: "public",
        table: "bookings",
        record: {},
      })
    ).status,
    400,
  );
});
