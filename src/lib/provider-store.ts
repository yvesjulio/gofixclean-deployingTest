import { providers as sampleProviders, type Provider } from "@/data/providersData";

export type StoredProvider = Provider & {
  id: string;
  isAvailable?: boolean;
  phoneNumber?: string;
  fullName?: string;
  serviceType?: string;
  completedJobs?: string;
  workerId?: string;
  serviceTags?: string[];
  baseLocation?: string;
  preferredAreas?: string[];
  minCost?: string;
  reliability?: string;
  status?: string;
  totalJobs?: number;
  noShows?: number;
  lastJobDate?: string;
  notes?: string;
  image?: string; // Optional, no default unsplash
};

const STORAGE_KEY = "gofixclean-providers";

const generateId = (provider: Partial<StoredProvider>) => {
  const base = (provider.name || provider.fullName || provider.workerId || provider.job || "provider").toString();
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
};

const normalizeAvailability = (availability?: string, isAvailable?: boolean): { availability: string; isAvailable: boolean } => {
  if (typeof availability === "string" && availability.trim() !== "") {
    const normalized = availability.trim().toLowerCase();
    return {
      availability: normalized === "unavailable" ? "Unavailable" : "Available",
      isAvailable: normalized !== "unavailable",
    };
  }

  if (typeof isAvailable === "boolean") {
    return {
      availability: isAvailable ? "Available" : "Unavailable",
      isAvailable,
    };
  }

  return { availability: "Available", isAvailable: true };
};

const ensureProviderId = (provider: Partial<StoredProvider>): StoredProvider => {
  const id = provider.id || generateId(provider);
  const availabilityData = normalizeAvailability(provider.availability, provider.isAvailable);
  return {
    id,
    name: provider.name || provider.fullName || "Unknown Provider",
    category: provider.category || provider.serviceType || provider.job || "General",
    job: provider.job || "Service Provider",
    description: provider.description || "Reliable local service provider.",
    rating: provider.rating || "4.5",
    location: provider.location || provider.baseLocation || "Kigali",
    price: provider.price || provider.minCost || "0 RWF",
    image: provider.image || "", // No default image
    completedjob: provider.completedjob || provider.completedJobs || `${provider.totalJobs || 0} jobs completed`,
    services: provider.services || provider.serviceTags || [],
    phone: provider.phone || provider.phoneNumber || "0780000000",
    availability: availabilityData.availability,
    isAvailable: availabilityData.isAvailable,
    workerId: provider.workerId || "",
    serviceTags: provider.serviceTags || provider.services || [],
    baseLocation: provider.baseLocation || provider.location || "Kigali",
    preferredAreas: provider.preferredAreas || [],
    minCost: provider.minCost || provider.price || "0 RWF",
    reliability: provider.reliability || "High",
    status: provider.status || "Active",
    totalJobs: provider.totalJobs || 0,
    noShows: provider.noShows || 0,
    lastJobDate: provider.lastJobDate || "",
    notes: provider.notes || "",
  };
};

const loadRawProviders = (): StoredProvider[] => {
  if (typeof window === "undefined") {
    return sampleProviders.map((provider) => ensureProviderId(provider));
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const defaults = sampleProviders.map((provider) => ensureProviderId(provider));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error("Invalid provider storage format");
    }
    return parsed.map((provider) => ensureProviderId(provider));
  } catch {
    const defaults = sampleProviders.map((provider) => ensureProviderId(provider));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  }
};

const dispatchProvidersUpdatedEvent = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("providers-updated"));
};

const saveRawProviders = (providers: StoredProvider[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(providers));
  dispatchProvidersUpdatedEvent();
};

export const getRawProviders = (): StoredProvider[] => loadRawProviders();

export const saveProviders = (providers: StoredProvider[]) => saveRawProviders(providers);

export const createProvider = (provider: Partial<StoredProvider>): StoredProvider => {
  const providers = loadRawProviders();
  const newProvider = ensureProviderId({
    ...provider,
    availability: provider.availability || "Available",
    isAvailable: provider.isAvailable ?? true,
  });

  const uniqueId = `${newProvider.id}-${Math.random().toString(36).slice(2, 8)}`;
  const stored = { ...newProvider, id: uniqueId };
  saveRawProviders([stored, ...providers]);
  return stored;
};

export const updateProvider = (id: string, updates: Partial<StoredProvider>): StoredProvider | null => {
  const providers = loadRawProviders();
  const updated = providers.map((provider) =>
    provider.id === id
      ? ensureProviderId({ ...provider, ...updates })
      : provider
  );
  saveRawProviders(updated);
  return updated.find((provider) => provider.id === id) || null;
};

export const deleteProvider = (id: string): StoredProvider[] => {
  const providers = loadRawProviders();
  const filtered = providers.filter((provider) => provider.id !== id);
  saveRawProviders(filtered);
  return filtered;
};

export const deleteProviders = (ids: string[]): StoredProvider[] => {
  const providers = loadRawProviders();
  const filtered = providers.filter((provider) => !ids.includes(provider.id));
  saveRawProviders(filtered);
  return filtered;
};

export const getProviderById = (id: string): StoredProvider | undefined => {
  const providers = loadRawProviders();
  return providers.find((provider) => provider.id === id);
};
