import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MessageSquare, Trash2, UserPlus, Download, Copy } from "lucide-react";
import { getBookings, assignProvider, updateBookingStatus } from "@/lib/admin-api";
import { ToastContainer, useToast } from "@/components/ui/toast";
import type { BookingCardData } from "@/types/admin";

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const formatTime = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};

export default function Bookings() {
  const [bookings, setBookings] = useState<BookingCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    getBookings()
      .then((data) => setBookings(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load bookings."))
      .finally(() => setLoading(false));
  }, []);

  // Auto-reload bookings every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getBookings()
        .then((data) => setBookings(data))
        .catch((err) => {
          // Only set error if it's not already set to avoid overwriting existing errors
          if (!error) setError(err instanceof Error ? err.message : "Unable to load bookings.");
        })
        .finally(() => setLoading(false));
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [error]);

  const updateBooking = (updated: BookingCardData) => {
    setBookings((current) => current.map((booking) => (booking.id === updated.id ? updated : booking)));
  };

  const handleAssign = async (booking: BookingCardData) => {
    const result = await assignProvider(booking.id, "Assigned Provider");
    if (result.success) {
      updateBooking({ ...booking, assignedTo: "Assigned Provider", status: "Assigned" });
      addToast("Provider assigned successfully!", "success");
    } else {
      addToast("Failed to assign provider.", "error");
    }
  };

  const handleComplete = async (booking: BookingCardData) => {
    const result = await updateBookingStatus(booking.id, "Completed");
    if (result.success) {
      updateBooking({ ...booking, status: "Completed" });
      addToast("Booking marked as completed!", "success");
    } else {
      addToast("Failed to update booking status.", "error");
    }
  };

  const handleWhatsApp = (booking: BookingCardData) => {
    if (!booking.whatsappNumber) {
      addToast("Invalid phone number for WhatsApp.", "error");
      return;
    }
    window.open(`https://wa.me/${booking.whatsappNumber}?text=${encodeURIComponent(`Hello ${booking.fullName}, we received your request.`)}`);
  };

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    addToast("Phone number copied to clipboard!", "success");
  };

  const handleDownloadMedia = (url: string) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return <div className="text-center py-8">Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading bookings: {error}</div>;
  }

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-sm text-muted-foreground">Action-ready booking cards for your operations team.</p>
        </div>
        <Badge className="rounded-full px-3 py-1 uppercase">{bookings.length} total</Badge>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-3xl border border-border bg-background p-8 text-center text-sm text-muted-foreground">No bookings available.</div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-lg font-semibold">{booking.fullName}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    📞 {booking.phoneNumber}
                    <Button variant="ghost" size="sm" onClick={() => handleCopyPhone(booking.phoneNumber)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={booking.status === "Pending" ? "destructive" : booking.status === "Completed" ? "secondary" : "default"} className="rounded-full px-3 py-1 uppercase">
                    {booking.status}
                  </Badge>
                  <Badge variant={booking.urgency.toLowerCase() === "urgent" ? "destructive" : "secondary"} className="rounded-full px-3 py-1 uppercase">
                    {booking.urgency}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Task type</div>
                  <div className="font-medium">{booking.taskType}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Date / time</div>
                  <div className="font-medium">{formatDate(booking.selectedDate)} | {formatTime(booking.selectedTime)}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Location</div>
                  <div className="font-medium">{booking.address}{booking.landmark ? ` · ${booking.landmark}` : ""}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Assigned provider</div>
                  <div className="font-medium">{booking.assignedTo || "Not assigned"}</div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-border bg-background p-4 text-sm">
                <div className="font-medium">Description</div>
                <p className="mt-2 text-sm text-muted-foreground">{booking.taskDescription}</p>
              </div>

              {booking.media.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground mb-2">Media</div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {booking.media.map((item, index) => (
                      <div key={index} className="relative overflow-hidden rounded-2xl border border-border bg-background p-2 transition hover:shadow-lg">
                        <img src={item} alt={`media-${index}`} className="h-24 w-full object-cover" />
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => handleDownloadMedia(item)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" onClick={() => handleAssign(booking)}>
                  <UserPlus className="mr-2 h-4 w-4" /> Assign Provider
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleWhatsApp(booking)}>
                  <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp Client
                </Button>
                <Button variant="default" size="sm" onClick={() => handleComplete(booking)}>
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Mark Completed
                </Button>
                <Button variant="destructive" size="sm" onClick={() => {
                  if (confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
                    setBookings((current) => current.filter((b) => b.id !== booking.id));
                    addToast("Booking deleted successfully!", "success");
                  }
                }}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
