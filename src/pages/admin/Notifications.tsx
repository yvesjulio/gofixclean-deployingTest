import { useCallback, useEffect, useState } from "react";
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
export default function Notifications() {
  const [rows, setRows] = useState<Log[]>([]),
    [error, setError] = useState(""),
    [busy, setBusy] = useState("");
  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("notification_deliveries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) setError(error.message);
    else {
      setRows(data || []);
      setError("");
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  async function retry(log: Log) {
    if (!log.booking_id) return;
    setBusy(log.id);
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
          data?.error || "Delivery failed. Check the latest result.",
        );
      await load();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy("");
    }
  }
  return (
    <>
      <div className="ops-row">
        <p className="ops-muted">
          Latest 100 delivery attempts. “Accepted” means the service accepted
          the request, not that you read it.
        </p>
        <button onClick={() => void load()}>Refresh</button>
      </div>
      {error && <div className="ops-error">{error}</div>}
      <div className="ops-card">
        <h2>Three channels, one booking</h2>
        <p>
          Telegram and email include booking details and media links. ntfy
          receives a generic alert to protect customer details on public topics.
        </p>
        <p className="ops-muted">
          Deploy the included booking-notifier function and SQL migration to
          enable this history. Earlier alerts are not backfilled. Retries are
          manual and can duplicate an alert if the original delivery was
          accepted but not logged.
        </p>
      </div>
      {rows.map((r) => (
        <div className="ops-card" key={r.id}>
          <div className="ops-row">
            <div>
              <strong>{r.channel.toUpperCase()}</strong>{" "}
              <span className="ops-pill">{r.ok ? "Accepted" : "Failed"}</span>
              <p className="ops-muted">
                {new Date(r.created_at).toLocaleString("en-GB", {
                  timeZone: "Africa/Kigali",
                })}{" "}
                · {r.booking_id || "Test notification"}
              </p>
              {r.error && <p>{r.error}</p>}
            </div>
            {!r.ok && r.booking_id && (
              <button disabled={!!busy} onClick={() => void retry(r)}>
                {busy === r.id ? "Retrying…" : "Retry channel"}
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
