import { supabase } from "@/lib/supabase";

export interface MarketplaceProvider {
  id: string;
  full_name: string;
  service_type: string;
  base_location: string;
  price_from?: string;
  rating?: string;
  completed_jobs?: string;
  job_done?: number;
  status?: string;
  phone?: string;
}

export interface MarketplaceCache {
  providers: MarketplaceProvider[];
  categories: string[];
}

const CACHE_KEY = "gofixclean-provider-marketplace-cache-v1";

export function loadProviderMarketplaceCache(): MarketplaceCache | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as MarketplaceCache) : null;
  } catch {
    return null;
  }
}

export function saveProviderMarketplaceCache(data: MarketplaceCache) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // ignore localStorage errors
  }
}

export async function fetchProviderMarketplace() {
  const providersQuery = supabase
    .from("providers")
    .select("id,full_name,service_type,base_location,rating,status,phone");

  const categoriesQuery = supabase
    .from("providers")
    .select("service_type");

  const [providersRes, categoriesRes] = await Promise.all([providersQuery, categoriesQuery]);

  if (providersRes.error || categoriesRes.error) {
    throw providersRes.error || categoriesRes.error;
  }

  const providers = providersRes.data || [];
  const categories = Array.from(
    new Set(
      (categoriesRes.data || [])
        .map((item) => String(item.service_type || "").trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

  return {
    providers,
    categories: ["All", ...categories],
  };
}

export async function prefetchProviderMarketplace() {
  const data = await fetchProviderMarketplace();
  saveProviderMarketplaceCache(data);
  return data;
}

export async function fetchProvidersWithSkills() {
  try {
    const { data: providersData, error: providersError } = await supabase
      .from("providers")
      .select("id,full_name,service_type,base_location,min_cost,provider_bio,rating,job_done,status,phone");

    if (providersError) throw providersError;

    // Fetch skills
    const { data: skillsData, error: skillsError } = await supabase
      .from("provider_skills")
      .select("provider_id, skill");

    if (skillsError) throw skillsError;

    // Map skills to providers
    const skillsByProviderId: Record<string, string[]> = {};
    (skillsData || []).forEach((skill: any) => {
      if (!skillsByProviderId[skill.provider_id]) {
        skillsByProviderId[skill.provider_id] = [];
      }
      skillsByProviderId[skill.provider_id].push(skill.skill);
    });

    // Add skills to each provider
    const providersWithSkills = (providersData || []).map((provider: any) => ({
      ...provider,
      skills: skillsByProviderId[provider.id] || [],
    }));

    return providersWithSkills;
  } catch (error) {
    console.error("Error fetching providers with skills:", error);
    return [];
  }
}

export async function fetchSkillsForProvider(providerId: string) {
  try {
    const { data, error } = await supabase
      .from("provider_skills")
      .select("skill")
      .eq("provider_id", providerId);

    if (error) {
      throw error;
    }

    return data?.map((item: any) => item.skill) || [];
  } catch (error) {
    console.error("Error fetching skills for provider:", error);
    return [];
  }
}
