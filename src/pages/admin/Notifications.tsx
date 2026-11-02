import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBell,
  FiMail,
  FiSend,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { errorText } from "@/lib/operations";
interface Log {
  id: string;
  booking_id: string | null;
  channel: string;
  ok: boolean;
  error: string | null;
  created_at: string;
}
const channels = [
  {
    key: "telegram",
    name: "Telegram",
    Icon: FiSend,
    description: "Booking details, photos and video links.",
  },
  {
    key: "email",
    name: "Email",
    Icon: FiMail,
    description: "A copy of each booking in your inbox.",
  },
  {
    key: "ntfy",
    name: "Phone alerts",
    Icon: FiBell,
    description: "An extra alert in your ntfy app.",
  },
];
export default function Notifications() {
  const [rows, setRows] = useState<Log[]>([]),
    [names, setNames] = useState<Record<string, string>>({}),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(""),
    [loading, setLoading] = useState(true),
    [channel, setChannel] = useState("all"),
    [result, setResult] = useState("all"),
    [connection, setConnection] = useState<Record<string, boolean> | null>(
      null,
    ),
    [checked, setChecked] = useState(false),
    [success, setSuccess] = useState("");
  const load = useCallback(async () => {
    setError("");
    try {
      const { data, error } = await supabase
        .from("notification_deliveries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      setRows(data || []);
      const ids = [
        ...new Set((data || []).map((r) => r.booking_id).filter(Boolean)),
      ];
      if (ids.length) {
        const bookings = await supabase
          .from("bookings")
          .select("id,customer_name")
          .in("id", ids);
        if (bookings.error) throw bookings.error;
        setNames(
          Object.fromEntries(
            (bookings.data || []).map((b) => [b.id, b.customer_name]),
          ),
        );
      }
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  async function checkConnection() {
    setBusy("check");
    setSuccess("");
    setError("");
    try {
      const { data, error } = await supabase.functions.invoke(
        "booking-notifier",
        { body: { action: "health" } },
      );
      if (error || !data?.channels)
        throw new Error(
          "Connection check is not available yet. Your existing alerts can still work; delivery tracking needs the updated notification setup.",
        );
      setConnection(data.channels);
      setChecked(true);
      setSuccess("Settings checked. This does not send a test alert.");
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy("");
    }
  }
  async function retry(log: Log) {
    if (!log.booking_id) return;
    setBusy(log.id);
    setError("");
    setSuccess("");
    try {
      const { data, error } = await supabase.functions.invoke(
        "booking-notifier",
        {
          body: {
            action: "retry",
            booking_id: log.booking_id,
            channel: log.channel,
          },
        },
      );
      if (error) throw error;
      if (!data?.ok)
        throw new Error(
          "The alert could not be sent. Refresh to see the latest result.",
        );
      setSuccess("The alert was sent again.");
      await load();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy("");
    }
  }
  const visible = rows.filter(
    (r) =>
      (channel === "all" || r.channel === channel) &&
      (result === "all" || (result === "sent" ? r.ok : !r.ok)),
  );
  return (
    <>
      <div className="ops-row">
        <div>
          <h2>Stay on top of every request.</h2>
          <p className="ops-description">
            See where booking alerts were sent and resend any that failed.
          </p>
        </div>
        <div className="ops-actions">
          <button disabled={!!busy} onClick={() => void checkConnection()}>
            Check settings
          </button>
          <button onClick={() => void load()} disabled={loading}>
            <FiRefreshCw aria-hidden="true" /> Refresh
          </button>
        </div>
      </div>
      {error && (
        <div className="ops-error" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="ops-success" role="status">
          {success}
        </div>
      )}
      <div className="ops-channel-grid">
        {channels.map(({ key, name, Icon, description }) => {
          const latest = rows.find((r) => r.channel === key);
          const text = latest
            ? latest.ok
              ? "Last alert sent"
              : "Last alert failed"
            : checked
              ? connection?.[key]
                ? "Ready to test"
                : "Needs setup"
              : "No history yet";
          const state = latest
            ? latest.ok
              ? "success"
              : "failed"
            : checked && !connection?.[key]
              ? "warning"
              : "neutral";
          return (
            <section className="ops-card ops-channel-card" key={key}>
              <div className="ops-channel-heading">
                <span className="ops-channel-icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{name}</h3>
              </div>
              <span className={`ops-pill ${state}`}>{text}</span>
              <p className="ops-muted">{description}</p>
              {latest && (
                <p className="ops-delivery-time">
                  {new Date(latest.created_at).toLocaleString("en-GB", {
                    timeZone: "Africa/Kigali",
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              )}
            </section>
          );
        })}
      </div>
      <section className="ops-attempts">
        <div className="ops-row">
          <h2>Recent alerts</h2>
          <div className="ops-filter-group">
            <select
              aria-label="Notification channel"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            >
              <option value="all">All channels</option>
              {channels.map((c) => (
                <option value={c.key} key={c.key}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              aria-label="Notification result"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            >
              <option value="all">All results</option>
              <option value="sent">Sent</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div
            className="ops-loading"
            role="status"
            aria-label="Loading alerts"
          />
        ) : !visible.length ? (
          <div className="ops-card ops-empty">
            <div className="ops-empty-icon">
              <FiBell aria-hidden="true" />
            </div>
            <h3>
              {rows.length
                ? "No alerts match these filters"
                : "No alerts recorded here yet"}
            </h3>
            <p>
              {rows.length
                ? "Choose another channel or result to see more alerts."
                : "Your existing Telegram and email messages may still arrive. This page shows new delivery records once notification tracking is connected."}
            </p>
            {!rows.length && (
              <p>Earlier messages won’t appear in this history.</p>
            )}
          </div>
        ) : (
          visible.map((r) => (
            <article className="ops-card" key={r.id}>
              <div className="ops-row">
                <div>
                  <div
                    className="ops-channel-heading"
                    style={{ marginBottom: 8 }}
                  >
                    <strong>
                      {channels.find((c) => c.key === r.channel)?.name ||
                        r.channel}
                    </strong>
                    <span className={`ops-pill ${r.ok ? "success" : "failed"}`}>
                      {r.ok ? (
                        <FiCheckCircle aria-hidden="true" />
                      ) : (
                        <FiAlertCircle aria-hidden="true" />
                      )}{" "}
                      {r.ok ? "Sent" : "Failed"}
                    </span>
                  </div>
                  {r.booking_id ? (
                    <Link
                      className="ops-booking-link"
                      to={`/admin/bookings?id=${r.booking_id}`}
                    >
                      {names[r.booking_id] || "Open booking"} ↗
                    </Link>
                  ) : (
                    <span className="ops-muted">Test alert</span>
                  )}
                  <p className="ops-delivery-time">
                    {new Date(r.created_at).toLocaleString("en-GB", {
                      timeZone: "Africa/Kigali",
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                {!r.ok && r.booking_id && (
                  <button
                    className="primary"
                    disabled={!!busy}
                    onClick={() => void retry(r)}
                  >
                    {busy === r.id ? "Sending…" : "Resend alert"}
                  </button>
                )}
              </div>
              {r.error && (
                <details style={{ marginTop: 12 }}>
                  <summary className="ops-muted">Why didn’t this send?</summary>
                  <p className="ops-muted">{r.error}</p>
                </details>
              )}
            </article>
          ))
        )}
      </section>
      <p className="ops-muted" style={{ marginTop: 16 }}>
        “Sent” means the notification service accepted the alert. It does not
        confirm you opened it. Showing up to 100 recent attempts.
      </p>
    </>
  );
}
