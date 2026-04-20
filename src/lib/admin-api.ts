import type { BookingCardData, ProviderCardData } from "@/types/admin";
import { createProvider as createRawProvider, deleteProvider as deleteRawProvider, getRawProviders, updateProvider as updateRawProvider } from "@/lib/provider-store";

const BOOKING_API_URL = "https://script.google.com/macros/s/AKfycbwL-BGrd_GyIIlF-ck_mS_YANL5TmRIpOJQB0s9YQlKPxrBbAH8cLOKTDs3kI4BYtvk/exec";

const normalizePhone = (raw: string | number | undefined) => {
  if (raw == null) return "";
  let phone = String(raw).replace(/[^0-9]/g, "");
  if (phone.length === 9) {
    phone = `250${phone}`;
  }
  if (phone.length === 10 && phone.startsWith("0")) {
    phone = `250${phone.slice(1)}`;
  }
  return phone;
};

const formatPhoneDisplay = (raw: string | number | undefined) => {
  if (raw == null) return "Not provided";
  let phone = String(raw).replace(/\D/g, "");
  if (phone.length === 9) {
    phone = `0${phone}`;
  }
  if (phone.length === 10 && phone.startsWith("250")) {
    phone = `0${phone.slice(3)}`;
  }
  return phone;
};

const normalizeMedia = (media: any) => {
  if (!media) return [];
  if (Array.isArray(media)) return media.filter(Boolean);

  try {
    const parsed = JSON.parse(String(media));
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
};

const normalizeBooking = (raw: any): BookingCardData => {
  const whatsappNumber = normalizePhone(raw.phoneNumber || raw.phone || raw.phoneNumberRaw);
  return {
    id: raw.timestamp ? `${raw.timestamp}-${raw.fullName}` : `${raw.fullName}-${Math.random().toString(36).slice(2)}`,
    timestamp: raw.timestamp || "",
    fullName: raw.fullName || raw.name || "Unknown Client",
    phoneNumber: formatPhoneDisplay(raw.phoneNumber || raw.phone || raw.phoneNumberRaw),
    whatsappNumber,
    taskType: raw.providerCategory || raw.taskType || raw.serviceType || "Unknown",
    taskDescription: raw.taskDescription || raw.description || "No details provided",
    urgency: String(raw.urgency || "Normal").replace(/urgent/i, "Urgent").replace(/normal/i, "Normal"),
    selectedDate: raw.selectedDate || raw.date || "",
    selectedTime: raw.selectedTime || raw.time || "",
    address: raw.address || raw.location || "",
    landmark: raw.landmark || "",
    media: normalizeMedia(raw.media),
    status: raw.status || "Pending",
    assignedTo: raw.assignedTo || raw.providerName || "",
    providerCategory: raw.providerCategory || raw.serviceType || "",
    providerLocation: raw.providerLocation || raw.providerLocation || "",
    estimatedDuration: raw.estimatedDuration || "",
  };
};

const normalizeProvider = (raw: any): ProviderCardData => {
  const fullName = raw.name || raw.fullName || raw.fullLegalName || "Unknown Provider";
  const phoneValue = raw.phone || raw.phoneNumber || raw.phoneNumberRaw || "0780000000";

  return {
    id: raw.id || fullName.replace(/\s+/g, "-").toLowerCase(),
    fullName,
    phoneNumber: formatPhoneDisplay(phoneValue),
    whatsappNumber: normalizePhone(phoneValue),
    serviceType: raw.category || raw.serviceType || raw.job || "General",
    serviceTags: Array.isArray(raw.services)
      ? raw.services
      : String(raw.services || "").split(",").map((tag: string) => tag.trim()).filter(Boolean),
    availability: raw.availability || "Available",
    location: raw.location || raw.serviceLocation || "Kigali",
    completedJobs: raw.completedjob || raw.completedJobs || "0 jobs completed",
    rating: raw.rating || "0.0",
    isAvailable: String(raw.availability || "Available").toLowerCase() !== "unavailable",
  };
};

export async function getBookings(): Promise<BookingCardData[]> {
  const response = await fetch(BOOKING_API_URL);
  if (!response.ok) {
    throw new Error(`Booking API error: ${response.status}`);
  }

  const raw = await response.json();
  const rows = Array.isArray(raw) ? raw : raw.bookings || [];
  return rows.map(normalizeBooking);
}

export async function getProviders(): Promise<ProviderCardData[]> {
  return getRawProviders().map(normalizeProvider);
}

export async function createProvider(provider: any): Promise<ProviderCardData> {
  const rawProvider = createRawProvider(provider);
  return normalizeProvider(rawProvider);
}

export async function deleteProvider(providerId: string): Promise<ProviderCardData[]> {
  const providers = deleteRawProvider(providerId);
  return providers.map(normalizeProvider);
}

export async function updateProvider(providerId: string, updates: any): Promise<ProviderCardData | null> {
  const updated = updateRawProvider(providerId, updates);
  return updated ? normalizeProvider(updated) : null;
}

export async function updateBookingStatus(bookingId: string, status: string) {
  return {
    success: true,
    bookingId,
    status,
  };
}

export async function assignProvider(bookingId: string, providerName: string) {
  return {
    success: true,
    bookingId,
    assignedTo: providerName,
  };
}
