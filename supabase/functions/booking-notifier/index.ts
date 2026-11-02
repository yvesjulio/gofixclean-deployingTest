import { createClient } from "npm:@supabase/supabase-js@2";
type Result = { ok: boolean; error?: string };
const reply = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function response(data: unknown, status = 200) {
  const r = reply(data, status);
  for (const [k, v] of Object.entries(cors)) r.headers.set(k, v);
  return r;
}
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return response({ error: "Use POST" }, 405);
  const db = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );
  const secret = Deno.env.get("BOOKING_WEBHOOK_SECRET");
  const webhook = !!secret && req.headers.get("x-booking-secret") === secret;
  let admin = false;
  if (!webhook) {
    const jwt = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
    if (!jwt) return response({ error: "Authentication required" }, 401);
    const { data, error } = await db.auth.getUser(jwt);
    if (error || !data.user) return response({ error: "Invalid session" }, 401);
    const membership = await db
      .from("admin_members")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();
    admin = !!membership.data;
    if (!admin) return response({ error: "Admin access required" }, 403);
  }
  let payload;
  try {
    payload = await req.json();
  } catch {
    return response({ error: "Invalid JSON" }, 400);
  }
  if (payload.action === "health") {
    if (!admin) return response({ error: "Admin access required" }, 403);
    return response({
      ok: true,
      channels: {
        telegram:
          !!Deno.env.get("TELEGRAM_BOT_TOKEN") &&
          !!Deno.env.get("TELEGRAM_CHAT_ID"),
        email:
          !!Deno.env.get("RESEND_API_KEY") && !!Deno.env.get("ADMIN_EMAIL"),
        ntfy: !!Deno.env.get("NTFY_TOPIC"),
      },
    });
  }
  let booking = payload.record;
  const retry = payload.action === "retry";
  if (retry) {
    if (!admin)
      return response({ error: "Admin access required for retry" }, 403);
    if (!["telegram", "email", "ntfy"].includes(payload.channel))
      return response({ error: "Invalid channel" }, 400);
    const { data, error } = await db
      .from("bookings")
      .select("*")
      .eq("id", payload.booking_id)
      .single();
    if (error) return response({ error: "Booking unavailable" }, 404);
    booking = data;
    if (booking.archived_at)
      return response(
        { error: "Restore this booking before resending alerts" },
        409,
      );
  } else if (
    webhook &&
    (payload.type !== "INSERT" ||
      payload.table !== "bookings" ||
      payload.schema !== "public")
  )
    return response({ error: "Unexpected event" }, 400);
  if (
    !booking ||
    typeof booking.customer_name !== "string" ||
    typeof booking.service_type !== "string"
  )
    return response(
      { error: "Expected record.customer_name and record.service_type" },
      400,
    );
  // Always reread real bookings; never trust external customer details.
  const id = booking.id || null;
  if (id) {
    const { data, error } = await db
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return response({ error: "Booking unavailable" }, 404);
    booking = data;
  }
  const field = (v: unknown, max = 300) =>
    typeof v === "string" && v.trim() ? v.trim().slice(0, max) : "Not provided";
  const media: string[] = Array.isArray(booking.media_urls)
    ? [
        ...new Set<string>(
          booking.media_urls.filter((u: unknown) => {
            try {
              return (
                typeof u === "string" &&
                u.length < 1500 &&
                new URL(u).protocol === "https:"
              );
            } catch {
              return false;
            }
          }),
        ),
      ]
    : [];
  const message = [
    "🚨 NEW GOFIX&CLEAN BOOKING",
    "",
    `Booking ID: ${field(id, 50)}`,
    `Customer: ${field(booking.customer_name, 150)}`,
    `Phone: ${field(booking.phone, 50)}`,
    `Service: ${field(booking.service_type, 100)}`,
    `Address: ${field(booking.address, 400)}`,
    `Landmark: ${field(booking.landmark, 200)}`,
    `Urgency: ${field(booking.urgency, 50)}`,
    `Date: ${field(booking.scheduled_date, 30)}`,
    `Time: ${field(booking.scheduled_time, 30)} (Kigali)`,
    `Status: ${field(booking.status, 50)}`,
    "",
    "Description:",
    field(booking.task_description, 1000),
  ].join("\n");
  const messages = [message];
  let chunk = "📷 BOOKING PHOTOS / VIDEOS";
  for (const [i, u] of media.entries()) {
    const line = `\n${i + 1}. ${u}`;
    if ((chunk + line).length > 3500) {
      messages.push(chunk);
      chunk = "📷 MORE PHOTOS / VIDEOS";
    }
    chunk += line;
  }
  if (media.length) messages.push(chunk);
  async function post(
    url: string,
    body: unknown,
    headers: Record<string, string> = {},
  ): Promise<Result> {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(12000),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false)
        return {
          ok: false,
          error: String(
            data.description ||
              data.message ||
              data.error ||
              `HTTP ${res.status}`,
          ).slice(0, 400),
        };
      return { ok: true };
    } catch {
      return { ok: false, error: "Connection failed or timed out" };
    }
  }
  async function send(channel: string): Promise<Result> {
    if (channel === "telegram") {
      const token = Deno.env.get("TELEGRAM_BOT_TOKEN"),
        chat = Deno.env.get("TELEGRAM_CHAT_ID");
      if (!token || !chat)
        return { ok: false, error: "Missing Telegram secrets" };
      for (const text of messages) {
        const r = await post(
          `https://api.telegram.org/bot${token}/sendMessage`,
          { chat_id: chat, text },
        );
        if (!r.ok) return r;
      }
      return { ok: true };
    }
    if (channel === "email") {
      const key = Deno.env.get("RESEND_API_KEY"),
        email = Deno.env.get("ADMIN_EMAIL");
      if (!key || !email) return { ok: false, error: "Missing email secrets" };
      return post(
        "https://api.resend.com/emails",
        {
          from:
            Deno.env.get("BOOKING_FROM_EMAIL") ||
            "GoFix & Clean <onboarding@resend.dev>",
          to: [email],
          subject: "🚨 GoFix&Clean — New Booking",
          text: messages.join("\n\n"),
        },
        { Authorization: `Bearer ${key}` },
      );
    }
    const topic = Deno.env.get("NTFY_TOPIC");
    if (!topic || !/^[A-Za-z0-9_-]{10,150}$/.test(topic))
      return { ok: false, error: "Missing or invalid NTFY_TOPIC" };
    return post("https://ntfy.sh", {
      topic,
      title: "New GoFix&Clean booking",
      message:
        "A new request needs your attention. Open Telegram or your admin panel.",
      priority: 4,
      tags: ["bell"],
    });
  }
  const results: Record<string, Result> = {};
  await Promise.all(
    (retry ? [payload.channel] : ["telegram", "email", "ntfy"]).map(
      async (channel: string) => {
        // Skip channels already accepted for this booking. Manual retry is for failures.
        if (id) {
          const prior = await db
            .from("notification_deliveries")
            .select("id")
            .eq("booking_id", id)
            .eq("channel", channel)
            .eq("ok", true)
            .limit(1);
          if (prior.error) {
            results[channel] = {
              ok: false,
              error: "Delivery history unavailable. Apply SQL migration.",
            };
            return;
          }
          if (prior.data?.length) {
            results[channel] = { ok: true };
            return;
          }
        }
        const result = await send(channel);
        results[channel] = result;
        const logged = await db.from("notification_deliveries").insert({
          booking_id: id,
          channel,
          ok: result.ok,
          error: result.error || null,
        });
        if (logged.error) {
          console.error("Could not record delivery result", channel);
          results[channel] = {
            ok: false,
            error: `${result.ok ? "Service accepted alert" : "Delivery failed"}; delivery history could not be saved.`,
          };
        }
      },
    ),
  );
  const ok = Object.values(results).every((r) => r.ok);
  return response(
    { ok, ...results, media_links: media.length },
    ok ? 200 : 502,
  );
});
