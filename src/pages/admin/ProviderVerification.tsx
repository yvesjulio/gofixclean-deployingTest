import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { allRows, errorText, label, phone } from "@/lib/operations";
import RecordActions from "@/components/admin/RecordActions";
interface Application {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  service_type: string;
  about: string | null;
  status: string;
  created_at: string;
  archived_at: string | null;
}
export default function ProviderVerification() {
  const [rows, setRows] = useState<Application[]>([]),
    [error, setError] = useState(""),
    [view, setView] = useState("pending"),
    [busy, setBusy] = useState(""),
    [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setError("");
    try {
      setRows(
        await allRows<Application>(
          "provider_verifications",
          "created_at",
          true,
        ),
      );
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  async function review(row: Application, approve: boolean) {
    if (
      !approve &&
      !confirm(
        `Reject ${row.full_name}'s application? You can keep it in reviewed history.`,
      )
    )
      return;
    setBusy(row.id);
    setError("");
    try {
      const { error } = await supabase.rpc("review_provider_application", {
        application_id: row.id,
        approve,
      });
      if (error) throw error;
      await load();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy("");
    }
  }
  const visible = rows.filter((r) =>
    view === "archived"
      ? !!r.archived_at
      : !r.archived_at &&
        (view === "pending" ? r.status === "pending" : r.status !== "pending"),
  );
  return (
    <>
      <div className="ops-row">
        <div>
          <h2>Meet your next service professional.</h2>
          <p className="ops-description">
            Review applicants, approve the right people, and clear out old
            requests.
          </p>
        </div>
        <button onClick={() => void load()}>Refresh</button>
      </div>
      <div className="ops-tabs">
        {["pending", "reviewed", "archived"].map((v) => (
          <button key={v} aria-pressed={v === view} onClick={() => setView(v)}>
            {label(v)}
          </button>
        ))}
      </div>
      {error && (
        <div className="ops-error" role="alert">
          {error}
        </div>
      )}
      {loading ? (
        <div
          className="ops-loading"
          role="status"
          aria-label="Loading applications"
        />
      ) : visible.length ? (
        visible.map((r) => (
          <article className="ops-card" key={r.id}>
            <div className="ops-row">
              <div>
                <h3>
                  {r.full_name}{" "}
                  <span className="ops-pill">{label(r.status)}</span>
                </h3>
                <p>{r.service_type}</p>
                <p className="ops-muted">
                  {r.phone} · {r.address}
                </p>
                <p style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>
                  {r.about}
                </p>
                <p className="ops-muted">
                  Applied{" "}
                  {new Date(
                    r.created_at.endsWith("Z")
                      ? r.created_at
                      : r.created_at + "Z",
                  ).toLocaleDateString("en-GB", { timeZone: "Africa/Kigali" })}
                </p>
              </div>
              <div className="ops-actions">
                <a className="ops-button" href={`tel:+${phone(r.phone)}`}>
                  Call applicant
                </a>
                {!r.archived_at && r.status === "pending" && (
                  <>
                    <button
                      className="primary"
                      disabled={!!busy}
                      onClick={() => void review(r, true)}
                    >
                      {busy === r.id ? "Saving…" : "Approve"}
                    </button>
                    <button
                      disabled={!!busy}
                      onClick={() => void review(r, false)}
                    >
                      Reject
                    </button>
                  </>
                )}
                <RecordActions
                  entity="application"
                  id={r.id}
                  name={r.full_name}
                  archived={!!r.archived_at}
                  onDone={load}
                />
              </div>
            </div>
          </article>
        ))
      ) : (
        <div className="ops-card ops-empty">
          <h3>No {view} applications</h3>
          <p>
            {view === "pending"
              ? "New applications will appear here for review."
              : "This view is clear."}
          </p>
        </div>
      )}
    </>
  );
}
