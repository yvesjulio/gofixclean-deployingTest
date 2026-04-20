import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineVerified } from "react-icons/md";
import { GiWrench } from "react-icons/gi";
import type { ReactElement } from "react";
import { getRawProviders } from "@/lib/provider-store";
import Footer from "../landingpages/Footer";

const ServiceDetails = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [providers, setProviders] = useState(() => getRawProviders());

  useEffect(() => {
    setProviders(getRawProviders());
    const handleUpdate = () => setProviders(getRawProviders());
    window.addEventListener("providers-updated", handleUpdate);
    return () => window.removeEventListener("providers-updated", handleUpdate);
  }, []);

  const categoryMeta: Record<string, { subtitle: string; totalProviders: string; icon: ReactElement }> = {
    Plumbing: { 
      subtitle: "Pipes, taps & water systems", 
      totalProviders: "450+",
      icon: <GiWrench className="text-3xl md:text-5xl text-white" />
    },
    Electrical: { 
      subtitle: "Wiring, repairs & installations", 
      totalProviders: "320+",
      icon: <GiWrench className="text-3xl md:text-5xl text-white" />
    },
    Cleaning: { 
      subtitle: "Deep cleaning, office cleaning & more", 
      totalProviders: "280+",
      icon: <GiWrench className="text-3xl md:text-5xl text-white" />
    },
    Painting: { 
      subtitle: "Interior & exterior painting", 
      totalProviders: "150+",
      icon: <GiWrench className="text-3xl md:text-5xl text-white" />
    },
    Handyman: { 
      subtitle: "Furniture assembly, repairs & maintenance", 
      totalProviders: "200+",
      icon: <GiWrench className="text-3xl md:text-5xl text-white" />
    },
  };

  const validCategory = category && categoryMeta[category] ? category : "Plumbing";
  const meta = categoryMeta[validCategory];

  const filteredProviders = providers
    .filter(p => p.category === validCategory && p.isAvailable)
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

  const handleProviderClick = (provider: any) => {
    navigate("/booking", { state: { provider } });
  };

  return (
    <>
      <div className=" bg-gray-100">
        <div className="bg-brandText px-4 sm:px-6 md:px-16 py-6 md:py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-xl shrink-0">
                {meta.icon}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{validCategory}</h1>
                <p className="text-gray-300 text-sm sm:text-sm">
                  {meta.subtitle} • {meta.totalProviders} providers
                </p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="px-4 sm:px-6 md:px-16 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4 sm:mb-6">
              <p className="text-gray-500 text-xs sm:text-sm">
                {"Showing X provider(s)".replace("X", filteredProviders.length.toString())}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {filteredProviders.map((provider, idx) => (
                <div
                  key={idx}
                  onClick={() => handleProviderClick(provider)}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                    <div className="shrink-0 flex justify-center sm:justify-start">
                      {provider.image ? (
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600">
                          {provider.name.charAt(0)}
                        </div>
                      )}
                    </div>

                   
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
                        <div>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <h3 className="text-lg sm:text-xl font-bold text-brandTealMedium">{provider.name}</h3>
                            <MdOutlineVerified className="text-brandText w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-0">{provider.category}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-lg sm:text-xl font-bold text-gray-900">{provider.price}</p>
                          <p className="text-gray-500 text-xs sm:text-sm">From</p>
                        </div>
                      </div>

                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed my-2 sm:my-3">
                        {provider.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-500 w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="font-semibold text-gray-800">{provider.rating}</span>
                          <span className="text-gray-500">{provider.rating} rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IoLocationOutline className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">{provider.location}</span>
                        </div>
                        <span className="text-gray-500 text-xs sm:text-sm">{provider.completedjob}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          
            {filteredProviders.length === 0 && (
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center border border-gray-200">
                <p className="text-red-400 text-sm sm:text-base">{"No providers in this category."}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ServiceDetails;