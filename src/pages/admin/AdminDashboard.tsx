import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MessageSquare, Trash2, UserPlus } from "lucide-react";
import { getBookings, getProviders, assignProvider, updateBookingStatus } from "@/lib/admin-api";
import type { BookingCardData, ProviderCardData } from "@/types/admin";

const formatDate = (value: string) => {
  if (!value) return "Unknown date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const formatTime = (value: string) => {
  if (!value) return "Unknown time";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};

const BookingCard = ({ booking, onAssign, onComplete, onDelete, onWhatsApp }: {
  booking: BookingCardData;
  onAssign: (booking: BookingCardData) => void;
  onComplete: (booking: BookingCardData) => void;
  onDelete: (booking: BookingCardData) => void;
  onWhatsApp: (booking: BookingCardData) => void;
}) => (
  <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="text-lg font-semibold">{booking.fullName}</div>
        <div className="text-sm text-muted-foreground">📞 {booking.phoneNumber}</div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="rounded-full px-3 py-1 uppercase" variant={booking.urgency.toLowerCase() === "urgent" ? "destructive" : "secondary"}>
          {booking.urgency}
        </Badge>
        <span className="text-sm text-muted-foreground">{booking.status}</span>
      </div>
    </div>

    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <div>
        <div className="text-sm text-muted-foreground">Task</div>
        <div className="font-medium">{booking.taskType}</div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground">Schedule</div>
        <div className="font-medium">{formatDate(booking.selectedDate)} | {formatTime(booking.selectedTime)}</div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground">Location</div>
        <div className="font-medium">{booking.address}{booking.landmark ? ` · ${booking.landmark}` : ""}</div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground">Provider</div>
        <div className="font-medium">{booking.assignedTo || "Unassigned"}</div>
      </div>
    </div>

    <div className="mt-4 space-y-2">
      <div className="text-sm text-muted-foreground">Description</div>
      <p className="rounded-2xl border border-border bg-background px-4 py-3 text-sm">{booking.taskDescription}</p>
    </div>

    {booking.media.length > 0 && (
      <div className="mt-4">
        <div className="text-sm text-muted-foreground mb-2">Media</div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {booking.media.map((item, index) => (
            <a key={index} href={item} target="_blank" rel="noreferrer" className="overflow-hidden rounded-2xl border border-border bg-background p-2 transition hover:shadow-lg">
              <img src={item} alt={`media-${index}`} className="h-24 w-full object-cover" />
            </a>
          ))}
        </div>
      </div>
    )}

    <div className="mt-5 flex flex-wrap gap-2">
      <Button variant="secondary" size="sm" onClick={() => onAssign(booking)}>
        <UserPlus className="mr-2 h-4 w-4" /> Assign Provider
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onWhatsApp(booking)}>
        <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp Client
      </Button>
      <Button variant="default" size="sm" onClick={() => onComplete(booking)}>
        <CheckCircle2 className="mr-2 h-4 w-4" /> Mark Completed
      </Button>
      <Button variant="destructive" size="sm" onClick={() => onDelete(booking)}>
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    </div>
  </div>
);

const ProviderCard = ({ provider, onWhatsApp, onToggleAvailability }: {
  provider: ProviderCardData;
  onWhatsApp: (provider: ProviderCardData) => void;
  onToggleAvailability: (provider: ProviderCardData) => void;
}) => (
  <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="text-lg font-semibold">{provider.fullName}</div>
        <div className="text-sm text-muted-foreground">📞 {provider.phoneNumber}</div>
      </div>
      <Badge variant={provider.isAvailable ? "secondary" : "destructive"} className="rounded-full px-3 py-1 uppercase">
        {provider.availability}
      </Badge>
    </div>

    <div className="mt-4 space-y-2">
      <div>
        <div className="text-sm text-muted-foreground">Skill</div>
        <div className="font-medium">{provider.serviceType}</div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground">Location</div>
        <div className="font-medium">{provider.location}</div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground">Performance</div>
        <div className="font-medium">{provider.completedJobs} · ⭐ {provider.rating}</div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground">Skills</div>
        <div className="flex flex-wrap gap-2">
          {provider.serviceTags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-full px-2 py-1 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-5 flex flex-wrap gap-2">
      <Button variant="ghost" size="sm" onClick={() => onWhatsApp(provider)}>
        <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp Provider
      </Button>
      <Button variant={provider.isAvailable ? "destructive" : "secondary"} size="sm" onClick={() => onToggleAvailability(provider)}>
        {provider.isAvailable ? "Mark Unavailable" : "Mark Available"}
      </Button>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<BookingCardData[]>([]);
  const [providers, setProviders] = useState<ProviderCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [bookingRows, providerRows] = await Promise.all([getBookings(), getProviders()]);
        setBookings(bookingRows);
        setProviders(providerRows);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const pending = useMemo(() => bookings.filter((booking) => booking.status === "Pending"), [bookings]);
  const assigned = useMemo(() => bookings.filter((booking) => booking.status === "Assigned"), [bookings]);
  const completed = useMemo(() => bookings.filter((booking) => booking.status === "Completed"), [bookings]);

  const updateBooking = (updated: BookingCardData) => {
    setBookings((current) => current.map((booking) => (booking.id === updated.id ? updated : booking)));
  };

  const deleteBooking = (bookingId: string) => {
    setBookings((current) => current.filter((booking) => booking.id !== bookingId));
  };

  const handleAssignProvider = async (booking: BookingCardData) => {
    const available = providers.find((provider) => provider.isAvailable) || providers[0];
    if (!available) return;

    const result = await assignProvider(booking.id, available.fullName);
    if (result.success) {
      updateBooking({ ...booking, assignedTo: available.fullName, status: "Assigned" });
    }
  };

  const handleCompleteBooking = async (booking: BookingCardData) => {
    const result = await updateBookingStatus(booking.id, "Completed");
    if (result.success) {
      updateBooking({ ...booking, status: "Completed" });
    }
  };

  const handleWhatsAppBooking = (booking: BookingCardData) => {
    if (!booking.whatsappNumber) {
      alert("Invalid phone number for WhatsApp.");
      return;
    }
    window.open(`https://wa.me/${booking.whatsappNumber}?text=${encodeURIComponent(`Hello ${booking.fullName}, we received your request.`)}`);
  };

  const handleWhatsAppProvider = (provider: ProviderCardData) => {
    if (!provider.whatsappNumber) {
      alert("Invalid provider phone number.");
      return;
    }
    window.open(`https://wa.me/${provider.whatsappNumber}?text=${encodeURIComponent(`Hello ${provider.fullName}, you have a new job assignment.`)}`);
  };

  const toggleProviderAvailability = (provider: ProviderCardData) => {
    setProviders((current) => current.map((item) => item.id === provider.id ? { ...item, isAvailable: !item.isAvailable, availability: item.isAvailable ? "Unavailable" : "Available" } : item));
  };

  if (loading) {
    return <div className="text-center py-12 text-lg">Loading admin data...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="text-sm text-muted-foreground">Pending Bookings</div>
          <div className="mt-3 text-3xl font-semibold">{pending.length}</div>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="text-sm text-muted-foreground">Assigned Jobs</div>
          <div className="mt-3 text-3xl font-semibold">{assigned.length}</div>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="text-sm text-muted-foreground">Completed Jobs</div>
          <div className="mt-3 text-3xl font-semibold">{completed.length}</div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Pending Bookings</h2>
            <p className="text-sm text-muted-foreground">Action-ready request cards for booking operations.</p>
          </div>
          <Badge variant="secondary" className="rounded-full px-3 py-1 uppercase">Priority</Badge>
        </div>
        <div className="grid gap-4">
          {pending.length === 0 ? (
            <div className="rounded-3xl border border-border bg-background p-6 text-center text-sm text-muted-foreground">No pending bookings right now.</div>
          ) : (
            pending.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onAssign={handleAssignProvider}
                onComplete={handleCompleteBooking}
                onDelete={(b) => deleteBooking(b.id)}
                onWhatsApp={handleWhatsAppBooking}
              />
            ))
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Providers</h2>
            <p className="text-sm text-muted-foreground">Worker cards for quick contact, availability, and assignment.</p>
          </div>
          <Button size="sm" variant="secondary" onClick={() => setProviders((current) => [...current])}>
            Refresh Providers
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {providers.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onWhatsApp={handleWhatsAppProvider}
              onToggleAvailability={toggleProviderAvailability}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
