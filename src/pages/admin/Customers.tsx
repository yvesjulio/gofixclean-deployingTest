import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allRows, errorText, phone } from "@/lib/operations";
import type { Booking } from "@/lib/operations";
export default function Customers() {
  const [rows, setRows] = useState<Booking[]>([]),
    [error, setError] = useState(""),
    [query, setQuery] = useState(""),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    allRows<Booking>("bookings")
      .then(setRows)
      .catch((e) => setError(errorText(e)))
      .finally(() => setLoading(false));
  }, []);
  const groups = new Map<string, Booking[]>();
  for (const b of rows) {
    const key = phone(b.phone) || b.id;
    groups.set(key, [...(groups.get(key) || []), b]);
  }
  return (
    <>
      <p className="ops-muted">
        Grouped by phone number from your bookings. Different names sharing a
        phone appear together.
      </p>
      {error && <div className="ops-error">{error}</div>}
      <div className="ops-toolbar">
        <input
          aria-label="Search customers"
          placeholder="Search customer or phone…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading customers…</p>
      ) : (
        [...groups.entries()]
          .filter(([n, bs]) =>
            `${n} ${bs.map((b) => b.customer_name).join(" ")}`
              .toLowerCase()
              .includes(query.toLowerCase()),
          )
          .map(([n, bs]) => (
            <div className="ops-card" key={n}>
              <div className="ops-row">
                <div>
                  <h3>{bs[0].customer_name}</h3>
                  <p className="ops-muted">
                    {bs[0].phone} · {bs.length} bookings · {bs[0].address}
                  </p>
                </div>
                <div className="ops-actions">
                  <a className="ops-button" href={`tel:+${n}`}>
                    Call
                  </a>
                  <a
                    className="ops-button"
                    href={`https://wa.me/${n}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
              <details>
                <summary>Booking history</summary>
                {bs.map((b) => (
                  <p key={b.id} style={{ padding: 8 }}>
                    <Link to={`/admin/bookings?id=${b.id}`}>
                      {b.service_type} · {b.scheduled_date || "Unscheduled"} ·{" "}
                      {b.status}
                    </Link>
                  </p>
                ))}
              </details>
            </div>
          ))
      )}
    </>
  );
}
