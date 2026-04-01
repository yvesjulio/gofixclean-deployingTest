import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { providers } from "../../data/providersData"; 


function ProviderFound() {
  const navigate = useNavigate();

  const categories = [
    "All Categories",
    "Plumbing",
    "Electrical",
    "Cleaning",
    "Painting",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredProviders =
    selectedCategory === "All Categories"
      ? providers
      : providers.filter(
          (provider) => provider.category === selectedCategory
        );

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

          <div className="flex flex-col gap-6">
            {filteredProviders.length === 0 ? (
              <p className="text-gray-500">No providers in this category.</p>
            ) : (
              filteredProviders.map((person, index) => (
                <div
                  key={index}
                  onClick={() => handleProviderClick(person)}
                  className="bg-white rounded-xl p-5 w-full shadow transition-all duration-300 hover:shadow-xl cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />

                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{person.name}</h3>
                          <p className="text-sm text-gray-600">{person.job}</p>
                          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                            {person.description}
                          </p>
                        </div>

                        <GrStatusGood className="text-brandText text-xl" />
                      </div>

                      <div className="flex flex-wrap items-center gap-6 mt-3 text-sm">
                        <div className="flex text-xs items-center gap-1">
                          <FaStar className="text-brandYellow" />
                          <span className="text-[#7B7F7E]">
                            {person.rating} (reviews)
                          </span>
                        </div>

                        <div className="flex text-xs items-center gap-1 text-gray-600">
                          <IoLocationOutline />
                          <span>{person.location}</span>
                        </div>

                        <span className="text-xs px-3 py-1 rounded-md font-medium text-[#7B7F7E]">
                          {person.completedjob}
                        </span>
                      </div>

                      {person.services && person.services.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {person.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-brandText px-3 py-1 rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProviderFound;