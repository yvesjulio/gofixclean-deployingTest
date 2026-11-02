import { supabase } from "./supabaseClient";
export interface Booking {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  landmark: string | null;
  service_type: string;
  task_description: string | null;
  urgency: string | null;
  scheduled_date: string | null;
  scheduled_time: string | null;
  media_urls: string[] | null;
  status: string | null;
  provider_id: string | null;
  created_at: string;
  acknowledged_at: string | null;
  internal_notes: string | null;
}
export interface Provider {
  id: string;
  full_name: string;
  phone: string;
  service_type: string;
  base_location: string | null;
  availability: string | null;
  status: string | null;
  is_approved: boolean | null;
  provider_bio: string | null;
  rating: number | null;
}
export const statuses = [
  "pending",
  "contacted",
  "confirmed",
  "assigned",
  "in_progress",
  "completed",
  "cancelled",
];
export const label = (s: string | null) =>
  (s || "pending")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
export const phone = (s: string) => {
  const n = s.replace(/\D/g, "");
  return n.startsWith("0")
    ? "250" + n.slice(1)
    : n.length === 9
      ? "250" + n
      : n;
};
export const today = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Kigali",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
export const active = (b: Booking) =>
  !["completed", "cancelled"].includes(b.status || "pending");
export const safeMedia = (urls: string[] | null) =>
  (urls || []).filter((u) => {
    try {
      return new URL(u).protocol === "https:";
    } catch {
      return false;
    }
  });
export const errorText = (e: unknown) =>
  e && typeof e === "object" && "message" in e
    ? String(e.message)
    : "Request failed. Please try again.";
export async function allRows<T>(
  table: string,
  order = "created_at",
): Promise<T[]> {
  const rows: T[] = [];
  for (let start = 0; ; start += 500) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(order, { ascending: false })
      .order("id")
      .range(start, start + 499);
    if (error) throw error;
    rows.push(...(data as T[]));
    if (data.length < 500) break;
  }
  return rows;
}
export async function saveBooking(id: string, changes: Partial<Booking>) {
  const { data, error } = await supabase
    .from("bookings")
    .update(changes)
    .eq("id", id)
    .select("id")
    .single();
  if (error) throw error;
  if (!data)
    throw new Error("No booking updated. Check admin database permissions.");
}
