import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, Trash2, Edit, Save, X, Copy } from "lucide-react";
import { createProvider, deleteProvider as deleteProviderApi, getProviders, updateProvider as updateProviderApi } from "@/lib/admin-api";
import { ToastContainer, useToast } from "@/components/ui/toast";
import type { ProviderCardData } from "@/types/admin";

export default function Providers() {
  const [providers, setProviders] = useState<ProviderCardData[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [customServiceType, setCustomServiceType] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
  const [newProvider, setNewProvider] = useState({
    fullName: "",
    phoneNumber: "",
    serviceType: "",
    serviceTags: "",
    location: "",
    completedJobs: "0 jobs completed",
    rating: "4.5",
    availability: "Available",
    workerId: "",
    minCost: "0 RWF",
    image: "",
    job: "",
    description: "",
  });

  const serviceTypeOptions = useMemo(() => {
    const baseOptions = ["Plumbing", "Cleaning", "Electrician", "Tank Cleaning"];
    const providerOptions = providers.map((item) => item.serviceType).filter(Boolean);
    const dynamicOptions = Array.from(new Set([...baseOptions, ...providerOptions, newProvider.serviceType, editData.serviceType].filter(Boolean)));
    return dynamicOptions.sort((a, b) => a.localeCompare(b));
  }, [providers, newProvider.serviceType, editData.serviceType]);

  const refreshProviders = () => {
    setLoading(true);
    setError(null);
    getProviders()
      .then((data) => setProviders(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load providers."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshProviders();
  }, []);

  // Auto-reload providers every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshProviders();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(providers.map((item) => item.serviceType))).sort()],
    [providers]
  );
  const visibleProviders = useMemo(
    () => (filter === "All" ? providers : providers.filter((item) => item.serviceType === filter)),
    [filter, providers]
  );

  const handleWhatsApp = (provider: ProviderCardData) => {
    if (!provider.whatsappNumber) {
      alert("Invalid provider phone number.");
      return;
    }
    window.open(
      `https://wa.me/${provider.whatsappNumber}?text=${encodeURIComponent(`Hello ${provider.fullName}, you are needed for a job.`)}`
    );
  };

  const handleCopyPhone = (phoneNumber: string) => {
    navigator.clipboard.writeText(phoneNumber);
    addToast("Phone number copied to clipboard!", "success");
  };

  const handleToggleAvailability = async (provider: ProviderCardData) => {
    const nextAvailability = provider.isAvailable ? "Unavailable" : "Available";
    const updated = await updateProviderApi(provider.id, {
      availability: nextAvailability,
      isAvailable: !provider.isAvailable,
    });
    if (updated) {
      setProviders((current) => current.map((item) => (item.id === provider.id ? updated : item)));
      addToast(`Provider ${nextAvailability.toLowerCase()} successfully!`, "success");
    } else {
      addToast("Failed to update provider availability.", "error");
    }
  };

  const handleDelete = async (providerId: string) => {
    if (!confirm("Are you sure you want to delete this provider? This action cannot be undone.")) {
      return;
    }
    const success = await deleteProviderApi(providerId);
    if (success) {
      setProviders((current) => current.filter((provider) => provider.id !== providerId));
      addToast("Provider deleted successfully!", "success");
    } else {
      addToast("Failed to delete provider.", "error");
    }
  };

  const handleEdit = (provider: ProviderCardData) => {
    setEditingId(provider.id);
    setEditData({
      fullName: provider.fullName,
      phoneNumber: provider.phoneNumber,
      serviceType: provider.serviceType,
      serviceTags: provider.serviceTags.join(", "),
      location: provider.location,
      completedJobs: provider.completedJobs,
      rating: provider.rating,
      availability: provider.availability,
      workerId: (provider as any).workerId || "",
      minCost: (provider as any).minCost || provider.completedJobs.replace(/[^0-9]/g, "") + " RWF",
      image: (provider as any).image || "",
      job: (provider as any).job || "",
      description: (provider as any).description || "",
    });
  };

  const handleSaveEdit = async () => {
    if (!confirm("Are you sure you want to save these changes to the provider?")) {
      return;
    }
    if (!editingId) return;
    const updated = await updateProviderApi(editingId, {
      name: editData.fullName,
      phone: editData.phoneNumber,
      serviceType: editData.serviceType,
      category: editData.serviceType,
      services: editData.serviceTags.split(",").map((tag: string) => tag.trim()).filter(Boolean),
      location: editData.location,
      rating: editData.rating,
      availability: editData.availability,
      completedjob: editData.completedJobs,
      workerId: editData.workerId,
      minCost: editData.minCost,
      image: editData.image,
      job: editData.job,
      description: editData.description,
    });
    if (updated) {
      setProviders((current) => current.map((item) => (item.id === editingId ? updated : item)));
      addToast("Provider updated successfully!", "success");
    } else {
      addToast("Failed to update provider.", "error");
    }
    setEditingId(null);
    setEditData({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleAddProvider = async () => {
    if (!newProvider.fullName.trim() || !newProvider.phoneNumber.trim() || !newProvider.serviceType.trim()) {
      setError("Name, phone number and service type are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const created = await createProvider({
        name: newProvider.fullName,
        phone: newProvider.phoneNumber,
        serviceType: newProvider.serviceType,
        category: newProvider.serviceType,
        services: newProvider.serviceTags.split(",").map((tag) => tag.trim()).filter(Boolean),
        location: newProvider.location || "Kigali",
        rating: newProvider.rating,
        availability: newProvider.availability,
        completedjob: newProvider.completedJobs,
        workerId: newProvider.workerId,
        minCost: newProvider.minCost,
        image: newProvider.image,
        job: newProvider.job,
        description: newProvider.description,
      });
      setProviders((current) => [created, ...current]);
      addToast("Provider added successfully!", "success");
      setNewProvider({
        fullName: "",
        phoneNumber: "",
        serviceType: "",
        serviceTags: "",
        location: "",
        completedJobs: "0 jobs completed",
        rating: "4.5",
        availability: "Available",
        workerId: "",
        minCost: "0 RWF",
        image: "",
        job: "",
        description: "",
      });
      setCustomServiceType("");
      setShowCustomInput(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to add provider.");
      addToast("Failed to add provider.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        if (isEdit) {
          setEditData((prev: any) => ({ ...prev, image: base64 }));
        } else {
          setNewProvider((prev) => ({ ...prev, image: base64 }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleServiceTypeChange = (value: string, isEdit = false) => {
    if (value === "Other") {
      setShowCustomInput(true);
      if (isEdit) {
        setEditData((prev: any) => ({ ...prev, serviceType: "" }));
      } else {
        setNewProvider((prev) => ({ ...prev, serviceType: "" }));
      }
    } else {
      setShowCustomInput(false);
      if (isEdit) {
        setEditData((prev: any) => ({ ...prev, serviceType: value }));
      } else {
        setNewProvider((prev) => ({ ...prev, serviceType: value }));
      }
    }
  };

  const handleCustomServiceTypeSubmit = () => {
    if (customServiceType.trim()) {
      setNewProvider((prev) => ({ ...prev, serviceType: customServiceType.trim() }));
      setShowCustomInput(false);
      setCustomServiceType("");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading providers...</div>;
  }

  if (error) {
    return <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">Error: {error}</div>;
  }

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Providers</h1>
            <p className="text-sm text-muted-foreground">Add or remove providers and keep the site data in sync.</p>
          </div>
          <Badge className="rounded-full px-3 py-1 uppercase">{providers.length} total</Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            value={newProvider.fullName}
            onChange={(event) => setNewProvider((current) => ({ ...current, fullName: event.target.value }))}
            placeholder="Provider name"
          />
          <Input
            value={newProvider.phoneNumber}
            onChange={(event) => setNewProvider((current) => ({ ...current, phoneNumber: event.target.value }))}
            placeholder="Phone number"
          />
          <select
            value={newProvider.serviceType}
            onChange={(event) => handleServiceTypeChange(event.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="">Select service type</option>
            {serviceTypeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
            <option value="Other">Other</option>
          </select>
          {showCustomInput && (
            <div className="flex gap-2">
              <Input
                value={customServiceType}
                onChange={(event) => setCustomServiceType(event.target.value)}
                placeholder="Enter custom service type"
                className="flex-1"
              />
              <Button onClick={handleCustomServiceTypeSubmit} size="sm">Add</Button>
            </div>
          )}
          <Input
            value={newProvider.serviceTags}
            onChange={(event) => setNewProvider((current) => ({ ...current, serviceTags: event.target.value }))}
            placeholder="Service tags, comma-separated"
          />
          <Input
            value={newProvider.job}
            onChange={(event) => setNewProvider((current) => ({ ...current, job: event.target.value }))}
            placeholder="Job title (e.g., Cleaning expert)"
          />
          <Input
            value={newProvider.description}
            onChange={(event) => setNewProvider((current) => ({ ...current, description: event.target.value }))}
            placeholder="Description"
          />
          <Input
            value={newProvider.location}
            onChange={(event) => setNewProvider((current) => ({ ...current, location: event.target.value }))}
            placeholder="Location"
          />
          <Input
            value={newProvider.rating}
            onChange={(event) => setNewProvider((current) => ({ ...current, rating: event.target.value }))}
            placeholder="Rating"
          />
          <Input
            value={newProvider.completedJobs}
            onChange={(event) => setNewProvider((current) => ({ ...current, completedJobs: event.target.value }))}
            placeholder="Completed jobs"
          />
          <select
            value={newProvider.availability}
            onChange={(event) => setNewProvider((current) => ({ ...current, availability: event.target.value }))}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          <Input
            value={newProvider.workerId}
            onChange={(event) => setNewProvider((current) => ({ ...current, workerId: event.target.value }))}
            placeholder="Worker ID"
          />
          <Input
            value={newProvider.minCost}
            onChange={(event) => setNewProvider((current) => ({ ...current, minCost: event.target.value }))}
            placeholder="Minimum cost"
          />
          <div>
            <label className="text-sm font-medium">Image (optional)</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e)} className="mt-1 w-full" />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={handleAddProvider}>Add Provider</Button>
          <Button variant="secondary" onClick={refreshProviders}>
            Refresh list
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold">Provider directory</h2>
          <p className="text-sm text-muted-foreground">Filter, update availability, or delete providers from the app.</p>
        </div>
        <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {visibleProviders.length === 0 ? (
        <div className="rounded-3xl border border-border bg-background p-8 text-center text-sm text-muted-foreground">No providers available for this category.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visibleProviders.map((provider) => (
            <div key={provider.id} className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              {editingId === provider.id ? (
                <div className="space-y-3">
                  <Input
                    value={editData.fullName}
                    onChange={(e) => setEditData((prev: any) => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Name"
                  />
                  <Input
                    value={editData.phoneNumber}
                    onChange={(e) => setEditData((prev: any) => ({ ...prev, phoneNumber: e.target.value }))}
                    placeholder="Phone"
                  />
                  <select
                    value={editData.serviceType}
                    onChange={(e) => handleServiceTypeChange(e.target.value, true)}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm w-full"
                  >
                    {serviceTypeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  <Input
                    value={editData.serviceTags}
                    onChange={(e) => setEditData((prev: any) => ({ ...prev, serviceTags: e.target.value }))}
                    placeholder="Service tags"
                  />
                  <Input
                    value={editData.job}
                    onChange={(e) => setEditData((prev: any) => ({ ...prev, job: e.target.value }))}
                    placeholder="Job title"
                  />
                  <Input
                    value={editData.description}
                    onChange={(e) => setEditData((prev: any) => ({ ...prev, description: e.target.value }))}
                    placeholder="Description"
                  />
                  <Input
                    value={editData.location}
                    onChange={(e) => setEditData((prev: any) => ({ ...prev, location: e.target.value }))}
                    placeholder="Location"
                  />
                  <Input
                    value={editData.rating}
                    onChange={(e) => setEditData((prev: any) => ({ ...prev, rating: e.target.value }))}
                    placeholder="Rating"
                  />
                  <Input
                    value={editData.completedJobs}
                    onChange={(e) => setEditData((prev: any) => ({ ...prev, completedJobs: e.target.value }))}
                    placeholder="Completed jobs"
                  />
                  <select
                    value={editData.availability}
                    onChange={(e) => setEditData((prev: any) => ({ ...prev, availability: e.target.value }))}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm w-full"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                  <Input
                    value={editData.workerId}
                    onChange={(e) => setEditData((prev: any) => ({ ...prev, workerId: e.target.value }))}
                    placeholder="Worker ID"
                  />
                  <Input
                    value={editData.minCost}
                    onChange={(e) => setEditData((prev: any) => ({ ...prev, minCost: e.target.value }))}
                    placeholder="Min cost"
                  />
                  <div>
                    <label className="text-sm font-medium">Image (optional)</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, true)} className="mt-1 w-full" />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveEdit} size="sm"><Save className="mr-2 h-4 w-4" /> Save</Button>
                    <Button onClick={handleCancelEdit} variant="outline" size="sm"><X className="mr-2 h-4 w-4" /> Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {(provider as any).image ? (
                        <img src={(provider as any).image} alt={provider.fullName} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600">
                          {provider.fullName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="text-lg font-semibold">{provider.fullName}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          📞 {provider.phoneNumber}
                          <Button variant="ghost" size="sm" onClick={() => handleCopyPhone(provider.phoneNumber)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        {(provider as any).workerId && (
                          <div className="text-xs text-muted-foreground">ID: {(provider as any).workerId}</div>
                        )}
                      </div>
                    </div>
                    <Badge variant={provider.isAvailable ? "secondary" : "destructive"} className="rounded-full px-3 py-1 uppercase">
                      {provider.availability}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Service type</div>
                      <div className="font-medium">{provider.serviceType}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Location</div>
                      <div className="font-medium">{provider.location}</div>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div>
                        <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Completed jobs</div>
                        <div className="font-medium">{provider.completedJobs}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Rating</div>
                        <div className="font-medium">{provider.rating}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {provider.serviceTags.map((tag) => (
                        <Badge key={tag} variant="outline" className="rounded-full px-2 py-1 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleWhatsApp(provider)}>
                      <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp Provider
                    </Button>
                    <Button variant={provider.isAvailable ? "destructive" : "secondary"} size="sm" onClick={() => handleToggleAvailability(provider)}>
                      {provider.isAvailable ? "Mark Unavailable" : "Mark Available"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(provider)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(provider.id)}>
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
