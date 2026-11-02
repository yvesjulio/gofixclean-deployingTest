import RecordActions from "@/components/admin/RecordActions";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  allRows,
  saveBooking,
  label,
  phone,
  safeMedia,
  errorText,
  statuses,
  active,
} from "@/lib/operations";
import type { Booking, Provider } from "@/lib/operations";
import { supabase } from "@/lib/supabase";
function Activity({ id }: { id: string }) {
  const [items, setItems] = useState<
      {
        id: string;
        created_at: string;
        changes: Record<string, { from: unknown; to: unknown }>;
      }[]
    >([]),
    [error, setError] = useState("");
  useEffect(() => {
    supabase
      .from("booking_activity")
      .select("id,created_at,changes")
      .eq("booking_id", id)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setItems(data || []);
      });
  }, [id]);
  return (
    <details className="ops-details">
      <summary>Change history (latest 20)</summary>
      {error && <p role="alert">{error}</p>}
      {items.map((item) => (
        <div key={item.id} style={{ padding: 10 }}>
          <p className="ops-muted">
            {new Date(item.created_at).toLocaleString("en-GB", {
              timeZone: "Africa/Kigali",
            })}
          </p>
          {Object.entries(item.changes).map(([key, v]) => (
            <p key={key}>
              {key.replaceAll("_", " ")}: {String(v.from ?? "—")} →{" "}
              {String(v.to ?? "—")}
            </p>
          ))}
        </div>
      ))}
      {!items.length && !error && (
        <p className="ops-muted">No recorded changes since setup.</p>
      )}
    </details>
  );
}
function BookingDetail({
  booking,
  providers,
  onSave,
  busy,
}: {
  booking: Booking;
  providers: Provider[];
  onSave: (changes: Partial<Booking>) => Promise<void>;
  busy: boolean;
}) {
  const [notes, setNotes] = useState(booking.internal_notes || "");
  const [service, setService] = useState(booking.service_type);
  const [date, setDate] = useState(booking.scheduled_date || "");
  const [time, setTime] = useState(booking.scheduled_time || "");
  const available = providers
    .filter(
      (p) =>
        p.status === "active" &&
        p.is_approved === true &&
        p.availability?.toLowerCase() !== "unavailable",
    )
    .sort(
      (a, b) =>
        Number(
          b.service_type.toLowerCase() === booking.service_type.toLowerCase(),
        ) -
        Number(
          a.service_type.toLowerCase() === booking.service_type.toLowerCase(),
        ),
    );
  return (
    <div className="ops-details">
      <div className="ops-split">
        <div>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {booking.task_description || "No description supplied."}
          </p>
          <p className="ops-muted">
            {booking.address}
            {booking.landmark && ` · ${booking.landmark}`}
          </p>
          <div className="ops-actions">
            <a className="ops-button" href={`tel:+${phone(booking.phone)}`}>
              Call customer
            </a>
            <a
              className="ops-button"
              target="_blank"
              rel="noreferrer"
              href={`https://wa.me/${phone(booking.phone)}?text=${encodeURIComponent(`Hello ${booking.customer_name}, this is GoFix&Clean regarding your ${booking.service_type} booking.`)}`}
            >
              WhatsApp
            </a>
            <a
              className="ops-button"
              target="_blank"
              rel="noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.address + " " + (booking.landmark || ""))}`}
            >
              Map search ↗
            </a>
          </div>
          <div className="ops-media">
            {safeMedia(booking.media_urls).map((url, i) => (
              <div key={url}>
                {/\.(mov|mp4|webm|m4v)(\?|$)|\/video\//i.test(url) ? (
                  <video controls preload="metadata" src={url} />
                ) : (
                  <a href={url} target="_blank" rel="noreferrer">
                    <img
                      src={url}
                      alt={`Booking attachment ${i + 1}`}
                      loading="lazy"
                    />
                  </a>
                )}
                <a
                  className="ops-muted"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open original {i + 1} ↗
                </a>
              </div>
            ))}
          </div>
          <small>Booking {booking.id}</small>
        </div>
        <fieldset
          disabled={!!booking.archived_at || busy}
          className="ops-fields"
        >
          <label>
            Status
            <select
              disabled={busy}
              value={booking.status || "pending"}
              onChange={(e) => {
                const status = e.target.value;
                if (
                  ["assigned", "in_progress"].includes(status) &&
                  !booking.provider_id
                ) {
                  alert("Assign a provider first.");
                  return;
                }
                if (
                  status === "cancelled" &&
                  !confirm(
                    "Cancel this booking? Record the reason in internal notes first.",
                  )
                )
                  return;
                void onSave({ status });
              }}
            >
              {!statuses.includes(booking.status || "pending") && (
                <option>{booking.status}</option>
              )}
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {label(s)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Provider
            <select
              disabled={busy || !active(booking)}
              value={booking.provider_id || ""}
              onChange={(e) =>
                void onSave({
                  provider_id: e.target.value || null,
                  status: e.target.value ? "assigned" : "confirmed",
                })
              }
            >
              <option value="">Unassigned</option>
              {booking.provider_id &&
                !available.some((p) => p.id === booking.provider_id) && (
                  <option value={booking.provider_id}>
                    {providers.find((p) => p.id === booking.provider_id)
                      ?.full_name || "Current provider"}{" "}
                    (current)
                  </option>
                )}
              {available.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.full_name} · {p.service_type}
                </option>
              ))}
            </select>
            <small className="ops-muted">
              Approved, active providers; matching service first.
            </small>
          </label>
          <label>
            Service
            <input
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </label>
          <label>
            Visit date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Visit time (Kigali)
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
          <label style={{ gridColumn: "1 / -1" }}>
            Internal notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <button
            className="primary"
            disabled={busy || !service.trim()}
            onClick={() =>
              void onSave({
                internal_notes: notes,
                service_type: service.trim(),
                scheduled_date: date || null,
                scheduled_time: time || null,
              })
            }
          >
            {booking.archived_at
              ? "Archived · restore to edit"
              : busy
                ? "Saving…"
                : "Save details"}
          </button>
        </fieldset>
      </div>
      <Activity key={JSON.stringify(booking)} id={booking.id} />
    </div>
  );
}
export default function Bookings() {
  const [rows, setRows] = useState<Booking[]>([]),
    [providers, setProviders] = useState<Provider[]>([]),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(""),
    [query, setQuery] = useState(""),
    [status, setStatus] = useState("all"),
    [view, setView] = useState("active"),
    [service, setService] = useState("all"),
    [date, setDate] = useState(""),
    [success, setSuccess] = useState("");
  const [params, setParams] = useSearchParams();
  const opened = params.get("id");
  const load = useCallback(async () => {
    setError("");
    try {
      const [b, p] = await Promise.all([
        allRows<Booking>("bookings", "created_at", true),
        allRows<Provider>("providers", "full_name"),
      ]);
      setRows(b);
      setProviders(p);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  const filtered = useMemo(
    () =>
      rows.filter(
        (b) =>
          (view === "archived" ? !!b.archived_at : !b.archived_at) &&
          (status === "all" || b.status === status) &&
          (service === "all" || b.service_type === service) &&
          (!date || b.scheduled_date === date) &&
          (!params.get("attention") || (active(b) && !b.acknowledged_at)) &&
          `${b.customer_name} ${b.phone} ${b.task_description} ${b.address} ${b.id}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [rows, status, service, date, query, params, view],
  );
  async function save(b: Booking, changes: Partial<Booking>) {
    setBusy(b.id);
    setError("");
    setSuccess("");
    try {
      await saveBooking(b.id, changes);
      setRows((old) =>
        old.map((r) => (r.id === b.id ? { ...r, ...changes } : r)),
      );
      setSuccess("Booking saved.");
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
          Respond, schedule and assign. {rows.length} bookings.
        </p>
        <button onClick={() => void load()}>Refresh</button>
      </div>
      {error && (
        <div role="alert" className="ops-error">
          {error}
        </div>
      )}
      {success && (
        <div role="status" className="ops-success">
          {success}
        </div>
      )}
      <div className="ops-tabs" aria-label="Booking view">
        <button
          aria-pressed={view === "active"}
          onClick={() => setView("active")}
        >
          Workspace ({rows.filter((b) => !b.archived_at).length})
        </button>
        <button
          aria-pressed={view === "archived"}
          onClick={() => setView("archived")}
        >
          Archived ({rows.filter((b) => b.archived_at).length})
        </button>
      </div>
      <div className="ops-toolbar">
        <input
          aria-label="Search bookings"
          placeholder="Search customer, phone or request…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          aria-label="Status filter"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {label(s)}
            </option>
          ))}
        </select>
        <select
          aria-label="Service filter"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="all">All services</option>
          {[...new Set(rows.map((b) => b.service_type))].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <input
          aria-label="Scheduled date filter"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {params.get("attention") && (
          <button onClick={() => setParams({})}>Clear attention filter</button>
        )}
      </div>
      {loading ? (
        <p>Loading bookings…</p>
      ) : filtered.length === 0 ? (
        <div className="ops-card">No bookings match your filters.</div>
      ) : (
        filtered.map((b) => (
          <article className="ops-card" key={b.id}>
            <div className="ops-row">
              <div>
                <h3>
                  {b.customer_name}{" "}
                  <span className={`ops-pill ${b.status || "pending"}`}>
                    {label(b.status)}
                  </span>
                </h3>
                <p>
                  {b.service_type} · {b.phone}
                </p>
                <p className="ops-muted">
                  {b.scheduled_date || "Date to confirm"} ·{" "}
                  {b.scheduled_time?.slice(0, 5) || "Time to confirm"} ·{" "}
                  {b.address}
                </p>
                <p className="ops-muted">
                  {b.provider_id
                    ? providers.find((p) => p.id === b.provider_id)
                        ?.full_name || "Provider unavailable"
                    : "No provider assigned"}{" "}
                  · {b.media_urls?.length || 0} attachments
                  {b.urgency && ` · ${b.urgency}`}
                </p>
              </div>
              <div className="ops-actions">
                <RecordActions
                  entity="booking"
                  id={b.id}
                  name={b.customer_name}
                  archived={!!b.archived_at}
                  onDone={load}
                />
                {!b.acknowledged_at && !b.archived_at && (
                  <button
                    disabled={busy === b.id}
                    onClick={() =>
                      void save(b, {
                        acknowledged_at: new Date().toISOString(),
                      })
                    }
                  >
                    Acknowledge
                  </button>
                )}
                <button
                  className="primary"
                  aria-expanded={opened === b.id}
                  onClick={() => setParams(opened === b.id ? {} : { id: b.id })}
                >
                  {opened === b.id ? "Close" : "Open booking"}
                </button>
              </div>
            </div>
            {opened === b.id && (
              <BookingDetail
                key={b.id}
                booking={b}
                providers={providers}
                busy={busy === b.id}
                onSave={(changes) => save(b, changes)}
              />
            )}
          </article>
        ))
      )}
    </>
  );
}
