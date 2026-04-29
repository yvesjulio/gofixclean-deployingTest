import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineVerified } from "react-icons/md";
import { fetchProvidersWithSkills } from "../../lib/provider-marketplace";

const formatCurrency = (amount: number | string | undefined): string => {
  if (!amount) return "0 RWF";
  const num = typeof amount === "string" ? parseInt(amount, 10) : amount;
  if (isNaN(num)) return "0 RWF";
  return `${num.toLocaleString("en-US").replace(/,/g, ",")} RWF`;
};

interface ProviderFoundProps {
  searchTerm: string;
}

function ProviderFound({ searchTerm }: ProviderFoundProps) {
  const navigate = useNavigate();
  const [providers, setProviders] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const data = await fetchProvidersWithSkills();
        setProviders(data);

        // Extract unique categories from providers
        const uniqueCategories = Array.from(
          new Set(data.map((provider: any) => provider.service_type).filter(Boolean))
        ).sort();
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.error("Error loading providers:", error);
        setError("Unable to load providers right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredProviders = providers.filter((provider) => {
    const matchesCategory =
      selectedCategory === "All" || provider.service_type === selectedCategory;

    if (!matchesCategory) return false;

    if (!normalizedSearch) return true;

    const searchFields = [
      provider.full_name,
      provider.service_type,
      provider.base_location,
      provider.provider_bio || provider.bio,
      ...(provider.skills || []),
    ];

    return searchFields.some((field) =>
      String(field || "").toLowerCase().includes(normalizedSearch)
    );
  });

  const handleProviderClick = (provider: any) => {
    navigate("/booking", { state: { provider } });
  };

  return (
    <section className="bg-[#DFE7E5] min-h-screen px-4 sm:px-6 md:px-16 py-10 md:py-16">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4 flex flex-col items-center">
          <h2 className="font-bold text-3xl mb-4 text-brandText text-center">
            Categories
          </h2>

          <div className="flex flex-col gap-3 text-brandText w-full">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-2xl transition-all duration-200 text-center
                  ${
                    selectedCategory === cat
                      ? "bg-brandText text-white"
                      : "bg-transparent text-brandText hover:bg-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-3/4">
          <div className="mb-10">
            <h2 className="text-xl text-[#303030] sm:text-2xl">
              <span className="text-brandText">
                {filteredProviders.length}
              </span>{" "}
              providers found
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brandText"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-10">{error}</div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredProviders.length === 0 ? (
                <p className="text-gray-500">No providers in this category.</p>
              ) : (
                filteredProviders.map((person, index) => (
                  <div
                    key={person.id || index}
                    onClick={() => handleProviderClick(person)}
                    className="bg-white rounded-xl p-5 w-full shadow transition-all duration-300 hover:shadow-xl cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-full bg-[#dfe7e5] flex items-center justify-center text-2xl font-bold text-brandText">
                        {person.full_name?.charAt(0).toUpperCase() || "?"}
                      </div>

                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg">{person.full_name}</h3>
                              <MdOutlineVerified className="h-4 w-4 text-brandText" />
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{person.service_type}</p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {person.provider_bio || "Professional service provider"}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-xl font-bold text-brandText">
                              {person.min_cost ? formatCurrency(person.min_cost) : "Contact"}
                            </div>
                            {person.min_cost && (
                              <div className="text-xs text-gray-400 uppercase tracking-wide">FROM</div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 mt-3 text-sm">
                          <div className="flex text-xs items-center gap-1">
                            <FaStar className="text-brandYellow" />
                            <span className="text-[#7B7F7E]">
                              {person.rating || "4.5"}
                            </span>
                          </div>

                          <div className="flex text-xs items-center gap-1 text-gray-600">
                            <IoLocationOutline />
                            <span>{person.base_location}</span>
                          </div>

                          <span className="text-xs px-3 py-1 rounded-md font-medium text-[#7B7F7E]">
                            {person.job_done || "0"} jobs done
                          </span>
                        </div>

                        {person.skills && person.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {person.skills.slice(0, 4).map((skill: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-100 text-brandText px-3 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {person.skills.length > 4 && (
                              <span className="text-xs bg-gray-100 text-brandText px-3 py-1 rounded-full">
                                +{person.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProviderFound;