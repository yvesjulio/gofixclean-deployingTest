import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { allRows, errorText } from "@/lib/operations";
import type { Booking } from "@/lib/operations";
interface Payment {
  id: string;
  booking_id: string;
  customer_total: number;
  provider_amount: number;
  collected: number;
  notes: string;
}
export default function Payments() {
  const [rows, setRows] = useState<Payment[]>([]),
    [bookings, setBookings] = useState<Booking[]>([]),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [form, setForm] = useState({
      booking_id: "",
      customer_total: "",
      provider_amount: "",
      collected: "",
      notes: "",
    });
  const load = useCallback(async () => {
    try {
      const [p, b] = await Promise.all([
        allRows<Payment>("booking_payments"),
        allRows<Booking>("bookings"),
      ]);
      setRows(p);
      setBookings(b);
      setError("");
    } catch (e) {
      setError(errorText(e));
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  const total = Number(form.customer_total),
    provider = Number(form.provider_amount),
    collected = Number(form.collected);
  async function save() {
    setBusy(true);
    setError("");
    try {
      if (provider > total || collected > total)
        throw new Error(
          "Provider amount and collected amount cannot exceed the customer total.",
        );
      const { error } = await supabase
        .from("booking_payments")
        .upsert(
          {
            ...form,
            customer_total: total,
            provider_amount: provider,
            collected,
          },
          { onConflict: "booking_id" },
        )
        .select("id")
        .single();
      if (error) throw error;
      setForm({
        booking_id: "",
        customer_total: "",
        provider_amount: "",
        collected: "",
        notes: "",
      });
      await load();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <p className="ops-muted">
        Manual payment records in RWF. Saving a record does not charge a
        customer or send money.
      </p>
      {error && <div className="ops-error">{error}</div>}
      <form
        className="ops-card"
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        <h2>Record / update agreed amounts</h2>
        <div className="ops-fields">
          <label>
            Booking
            <select
              required
              value={form.booking_id}
              onChange={(e) => {
                const id = e.target.value;
                const p = rows.find((r) => r.booking_id === id);
                setForm({
                  booking_id: id,
                  customer_total: p ? String(p.customer_total) : "",
                  provider_amount: p ? String(p.provider_amount) : "",
                  collected: p ? String(p.collected) : "",
                  notes: p?.notes || "",
                });
              }}
            >
              <option value="">Select booking</option>
              {bookings.map((b) => (
                <option value={b.id} key={b.id}>
                  {b.customer_name} · {b.service_type} ·{" "}
                  {b.scheduled_date || b.id.slice(0, 8)}
                </option>
              ))}
            </select>
          </label>
          {(["customer_total", "provider_amount", "collected"] as const).map(
            (k) => (
              <label key={k}>
                {k.replaceAll("_", " ")} (RWF)
                <input
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                />
              </label>
            ),
          )}
          <label>
            Notes
            <input
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </label>
        </div>
        <p className="ops-muted">
          Agreed GoFix&Clean margin: {(total - provider).toLocaleString()} RWF ·
          Outstanding: {(total - collected).toLocaleString()} RWF
        </p>
        <button className="primary" disabled={busy}>
          {busy ? "Saving…" : "Save payment record"}
        </button>
      </form>
      <div className="ops-card ops-table">
        <table>
          <thead>
            <tr>
              <th>Customer / service</th>
              <th>Agreed total</th>
              <th>Provider</th>
              <th>Margin</th>
              <th>Collected</th>
              <th>Outstanding</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>
                  {bookings.find((b) => b.id === p.booking_id)?.customer_name}
                  <br />
                  {bookings.find((b) => b.id === p.booking_id)?.service_type}
                </td>
                <td>{Number(p.customer_total).toLocaleString()}</td>
                <td>{Number(p.provider_amount).toLocaleString()}</td>
                <td>
                  {(p.customer_total - p.provider_amount).toLocaleString()}
                </td>
                <td>{Number(p.collected).toLocaleString()}</td>
                <td>{(p.customer_total - p.collected).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p className="ops-muted">No payment records yet.</p>}
      </div>
    </>
  );
}
