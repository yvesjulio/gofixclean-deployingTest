import RecordActions from "@/components/admin/RecordActions";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { allRows, errorText, phone } from "@/lib/operations";
import type { Provider } from "@/lib/operations";
const empty = {
  full_name: "",
  phone: "",
  service_type: "",
  base_location: "",
  availability: "available",
  provider_bio: "",
  status: "active",
  is_approved: false,
};
export default function Providers() {
  const [rows, setRows] = useState<Provider[]>([]),
    [error, setError] = useState(""),
    [query, setQuery] = useState(""),
    [service, setService] = useState("all"),
    [view, setView] = useState("active"),
    [editing, setEditing] = useState<string | null>(null),
    [form, setForm] = useState(empty),
    [busy, setBusy] = useState(false),
    [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    try {
      setRows(await allRows<Provider>("providers", "full_name", true));
      setError("");
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  async function save() {
    setBusy(true);
    setError("");
    try {
      const values = {
        ...form,
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        service_type: form.service_type.trim(),
      };
      const request =
        editing === "new"
          ? supabase.from("providers").insert(values)
          : supabase.from("providers").update(values).eq("id", editing!);
      const { error } = await request.select("id").single();
      if (error) throw error;
      setEditing(null);
      await load();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  const visible = rows.filter(
    (p) =>
      (view === "archived" ? !!p.archived_at : !p.archived_at) &&
      (service === "all" || p.service_type === service) &&
      `${p.full_name} ${p.phone} ${p.base_location}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="ops-row">
        <p className="ops-muted">
          Manage your team, availability and approval.
        </p>
        <button
          className="primary"
          onClick={() => {
            setForm(empty);
            setEditing("new");
          }}
        >
          Add provider
        </button>
      </div>
      {error && (
        <div className="ops-error" role="alert">
          {error}
        </div>
      )}
      {editing && (
        <form
          className="ops-card"
          onSubmit={(e) => {
            e.preventDefault();
            void save();
          }}
        >
          <h2>{editing === "new" ? "New provider" : "Edit provider"}</h2>
          <div className="ops-fields">
            {(
              [
                "full_name",
                "phone",
                "service_type",
                "base_location",
                "provider_bio",
              ] as const
            ).map((k) => (
              <label key={k}>
                {k.replaceAll("_", " ")}
                <input
                  required={["full_name", "phone", "service_type"].includes(k)}
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                />
              </label>
            ))}
            <label>
              Availability
              <select
                value={form.availability}
                onChange={(e) =>
                  setForm({ ...form, availability: e.target.value })
                }
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </label>
            <label>
              Status
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <label>
              Approval
              <select
                value={String(form.is_approved)}
                onChange={(e) =>
                  setForm({ ...form, is_approved: e.target.value === "true" })
                }
              >
                <option value="false">Not approved</option>
                <option value="true">Approved</option>
              </select>
            </label>
          </div>
          <div className="ops-actions">
            <button disabled={busy} className="primary">
              {busy ? "Saving…" : "Save provider"}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="ops-tabs" aria-label="Provider view">
        <button
          aria-pressed={view === "active"}
          onClick={() => setView("active")}
        >
          Workspace ({rows.filter((p) => !p.archived_at).length})
        </button>
        <button
          aria-pressed={view === "archived"}
          onClick={() => setView("archived")}
        >
          Archived ({rows.filter((p) => p.archived_at).length})
        </button>
      </div>
      <div className="ops-toolbar">
        <input
          aria-label="Search providers"
          placeholder="Search name, phone or location…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          aria-label="Provider service"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="all">All services</option>
          {[...new Set(rows.map((p) => p.service_type))].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button onClick={() => void load()}>Refresh</button>
      </div>
      {loading ? (
        <p>Loading providers…</p>
      ) : (
        <div
          className="ops-grid"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}
        >
          {visible.map((p) => (
            <article className="ops-card" key={p.id}>
              <span className="ops-pill">
                {p.is_approved ? "Approved" : "Not approved"} · {p.status}
              </span>
              <h3 style={{ marginTop: 14 }}>{p.full_name}</h3>
              <p>{p.service_type}</p>
              <p className="ops-muted">
                {p.base_location || "Location not set"} ·{" "}
                {p.availability || "Availability not set"}
              </p>
              <p className="ops-muted">
                {p.phone} · Rating {p.rating || 0}
              </p>
              <div className="ops-actions">
                <RecordActions
                  entity="provider"
                  id={p.id}
                  name={p.full_name}
                  archived={!!p.archived_at}
                  onDone={load}
                />
                <a className="ops-button" href={`tel:+${phone(p.phone)}`}>
                  Call
                </a>
                <a
                  className="ops-button"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me/${phone(p.phone)}`}
                >
                  WhatsApp
                </a>
                <button
                  disabled={!!p.archived_at}
                  onClick={() => {
                    setEditing(p.id);
                    setForm({
                      full_name: p.full_name,
                      phone: p.phone,
                      service_type: p.service_type,
                      base_location: p.base_location || "",
                      availability: p.availability || "available",
                      provider_bio: p.provider_bio || "",
                      status: p.status || "active",
                      is_approved: !!p.is_approved,
                    });
                  }}
                >
                  Edit
                </button>
              </div>
            </article>
          ))}
          {!visible.length && <p>No matching providers.</p>}
        </div>
      )}
    </>
  );
}
