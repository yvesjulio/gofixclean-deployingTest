import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allRows, active, today, errorText, label } from "@/lib/operations";
import type { Booking } from "@/lib/operations";
import { supabase } from "@/lib/supabase";
export default function AdminDashboard() {
  const [rows, setRows] = useState<Booking[]>([]),
    [apps, setApps] = useState(0),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setError("");
    try {
      const [b, a] = await Promise.all([
        allRows<Booking>("bookings"),
        supabase
          .from("provider_verifications")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending").is("archived_at", null),
      ]);
      if (a.error) throw a.error;
      setRows(b);
      setApps(a.count || 0);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, 60000);
    return () => clearInterval(timer);
  }, [load]);
  const attention = rows.filter(
    (b) =>
      active(b) &&
      (!b.acknowledged_at ||
        !b.provider_id ||
        (!!b.scheduled_date && b.scheduled_date < today())),
  );
  return (
    <>
      <div className="ops-row">
        <div>
          <h2>Your service desk, at a glance.</h2>
          <p className="ops-muted">
            Focus on requests that need a response. Refreshes every minute while
            visible.
          </p>
        </div>
        <button onClick={() => void load()}>Refresh</button>
      </div>
      {error && (
        <div className="ops-error" role="alert">
          {error}
        </div>
      )}
      {loading ? (
        <p>Loading overview…</p>
      ) : (
        <>
          <div className="ops-grid">
            {[
              [
                "New / unacknowledged",
                rows.filter((b) => active(b) && !b.acknowledged_at).length,
              ],
              [
                "Today’s visits",
                rows.filter((b) => active(b) && b.scheduled_date === today())
                  .length,
              ],
              [
                "In progress",
                rows.filter((b) => b.status === "in_progress").length,
              ],
              ["Pending applications", apps],
            ].map(([name, n]) => (
              <div className="ops-card" key={name}>
                <p className="ops-muted">{name}</p>
                <div className="ops-number">{n}</div>
                <span className="ops-muted">Live database records</span>
              </div>
            ))}
          </div>
          <div className="ops-split">
            <section className="ops-card">
              <div className="ops-row">
                <h2>Needs attention</h2>
                <Link to="/admin/bookings">All bookings ↗</Link>
              </div>
              {attention.slice(0, 8).map((b) => (
                <div
                  className="ops-row"
                  style={{
                    padding: "15px 0",
                    borderBottom: "1px solid #e3e9df",
                  }}
                  key={b.id}
                >
                  <div>
                    <strong>{b.customer_name}</strong>
                    <p className="ops-muted">
                      {b.service_type} · {b.scheduled_date || "Unscheduled"}
                    </p>
                    <span className="ops-muted">
                      {!b.acknowledged_at
                        ? "Unacknowledged"
                        : b.scheduled_date && b.scheduled_date < today()
                          ? "Overdue"
                          : "Unassigned"}
                    </span>
                  </div>
                  <Link
                    className="ops-button"
                    to={`/admin/bookings?id=${b.id}`}
                  >
                    Review
                  </Link>
                </div>
              ))}
              {!attention.length && (
                <p className="ops-muted">
                  You’re caught up. No active bookings need attention.
                </p>
              )}
            </section>
            <section className="ops-card">
              <h2>Recent bookings</h2>
              {rows.slice(0, 6).map((b) => (
                <Link
                  style={{
                    display: "block",
                    padding: "14px 0",
                    textDecoration: "none",
                    borderBottom: "1px solid #e3e9df",
                  }}
                  to={`/admin/bookings?id=${b.id}`}
                  key={b.id}
                >
                  <strong>{b.customer_name}</strong>
                  <p className="ops-muted">
                    {b.service_type} · {label(b.status)}
                  </p>
                </Link>
              ))}
              {!rows.length && <p>No bookings yet.</p>}
              <div className="ops-actions">
                <Link className="ops-button" to="/admin/verifications">
                  Review applications
                </Link>
                <Link className="ops-button" to="/admin/notifications">
                  Notification delivery
                </Link>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}
