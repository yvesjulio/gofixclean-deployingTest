import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  service_type: string;
  task_description: string;
  status: string;
  scheduled_date: string;
  scheduled_time: string;
  provider_id?: string;
}

interface Provider {
  id: string;
  full_name: string;
}

const statusClasses: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  assigned: "bg-blue-100 text-blue-800",
  in_progress: "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  assigned: "Assigned",
  in_progress: "In Progress",
  completed: "Completed",
};

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsRes, providersRes] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("providers").select("id, full_name"),
      ]);

      if (bookingsRes.error) throw bookingsRes.error;
      if (providersRes.error) throw providersRes.error;

      setBookings(bookingsRes.data || []);
      setProviders(providersRes.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignProvider = async (bookingId: string, providerId: string) => {
    setProcessingId(bookingId);

    try {
      const { error } = await supabase
        .from("bookings")
        .update({ provider_id: providerId, status: "assigned" })
        .eq("id", bookingId);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      console.error("Error assigning provider:", err);
      setError("Could not assign provider.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    setProcessingId(bookingId);

    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Could not update booking status.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Bookings</h1>
          <div className="text-center">Loading bookings...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Bookings</h1>
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Bookings</h1>
            <p className="text-sm text-gray-600">Manage booking assignments and status updates.</p>
          </div>
          <Badge className="rounded-full px-3 py-1 uppercase">{bookings.length} total</Badge>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No bookings available.
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-semibold">{booking.customer_name}</h2>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClasses[booking.status] ?? "bg-gray-100 text-gray-800"}`}>
                        {statusLabels[booking.status] ?? booking.status}
                      </span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="text-sm text-gray-600">📞 {booking.phone}</div>
                      <div className="text-sm text-gray-600">📍 {booking.address}</div>
                      <div className="text-sm text-gray-600">Service: {booking.service_type}</div>
                      <div className="text-sm text-gray-600">Scheduled: {booking.scheduled_date} · {booking.scheduled_time}</div>
                    </div>
                    <p className="text-sm text-gray-700">{booking.task_description}</p>
                  </div>

                  <div className="flex flex-col gap-3 min-w-[220px]">
                    {!booking.provider_id && booking.status === "pending" && (
                      <select
                        defaultValue=""
                        onChange={(e) => handleAssignProvider(booking.id, e.target.value)}
                        disabled={processingId === booking.id}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                      >
                        <option value="" disabled>
                          Assign provider
                        </option>
                        {providers.map((provider) => (
                          <option key={provider.id} value={provider.id}>
                            {provider.full_name}
                          </option>
                        ))}
                      </select>
                    )}

                    <div className="space-y-2">
                      {booking.status === "assigned" && (
                        <Button
                          onClick={() => handleUpdateStatus(booking.id, "in_progress")}
                          disabled={processingId === booking.id}
                        >
                          Start job
                        </Button>
                      )}
                      {booking.status === "in_progress" && (
                        <Button
                          onClick={() => handleUpdateStatus(booking.id, "completed")}
                          disabled={processingId === booking.id}
                        >
                          Mark completed
                        </Button>
                      )}
                      {booking.provider_id && (
                        <div className="text-sm text-gray-600">Provider: {booking.provider_id}</div>
                      )}
                      {processingId === booking.id && (
                        <div className="text-sm text-gray-500">Saving...</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
