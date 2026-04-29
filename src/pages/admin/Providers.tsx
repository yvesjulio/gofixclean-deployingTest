import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";

interface Provider {
  id: string;
  full_name: string;
  service_type: string;
  phone: string;
  base_location?: string;
  rating?: number;
  status?: string;
}

export default function Providers() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const { data, error } = await supabase
        .from("providers")
        .select("*")
        .order("full_name", { ascending: true });

      if (error) throw error;
      setProviders(data || []);
    } catch (err) {
      console.error("Error fetching providers:", err);
      setError("Failed to load providers.");
    } finally {
      setLoading(false);
    }
  };

  const serviceTypes = useMemo(
    () => ["All", ...Array.from(new Set(providers.map((provider) => provider.service_type))).filter(Boolean)],
    [providers]
  );

  const visibleProviders = useMemo(
    () => (filter === "All" ? providers : providers.filter((provider) => provider.service_type === filter)),
    [providers, filter]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Providers</h1>
          <div className="text-center">Loading providers...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Providers</h1>
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
            <h1 className="text-2xl font-bold">Providers</h1>
            <p className="text-sm text-gray-600">Browse and filter approved providers.</p>
          </div>
          <Badge className="rounded-full px-3 py-1 uppercase">{providers.length} total</Badge>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            {serviceTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <div className="text-sm text-gray-500">
            Showing {visibleProviders.length} of {providers.length} providers
          </div>
        </div>

        {visibleProviders.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No providers match this filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleProviders.map((provider) => (
              <div key={provider.id} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{provider.full_name}</h2>
                    <p className="text-sm text-gray-500">{provider.service_type}</p>
                  </div>
                  <Badge className="rounded-full px-3 py-1 uppercase">
                    {provider.status || "Unknown"}
                  </Badge>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>📍 {provider.base_location || "–"}</p>
                  <p>📞 {provider.phone || "–"}</p>
                  <p>⭐ {provider.rating ?? 0}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
