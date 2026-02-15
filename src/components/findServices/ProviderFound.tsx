import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";

function ProviderFound() {

  const providers = [
    {
      name: "John Dril",
      category: "Plumbing",
      job: "Plumbing expert",
      description:
        "Professional plumber with 10+ years of experience in residential and commercial plumbing.",
      rating: "4.8",
      location: "Kigali, Gasabo",
      price: "8,000 RWF",
      image:
        "https://plus.unsplash.com/premium_photo-1705563088246-3673a401ed6a?q=80&w=870&auto=format&fit=crop",
      completedjob: "100 jobs completed",
    },
    {
      name: "Keza Natacha",
      category: "Cleaning",
      job: "Cleaning expert",
      description:
        "Professional cleaner specialized in home and office deep cleaning services.",
      rating: "4.9",
      location: "Kigali, Gasabo",
      price: "8,000 RWF",
      image:
        "https://plus.unsplash.com/premium_photo-1681493771936-7d76691184d9?q=80&w=870&auto=format&fit=crop",
      completedjob: "100 jobs completed",
    },
    {
      name: "Eric Niyonzima",
      category: "Painting",
      job: "Painting expert",
      description:
        "Professional painter with expertise in interior and exterior painting.",
      rating: "4.7",
      location: "Kigali, Gasabo",
      price: "8,000 RWF",
      image:
        "https://images.unsplash.com/photo-1552493450-2b5ce80ed13f?q=80&w=814&auto=format&fit=crop",
      completedjob: "100 jobs completed",
    },
    {
      name: "Alice Uwimana",
      category: "Electrical",
      job: "Electrician",
      description:
        "Licensed electrician specializing in installations and maintenance.",
      rating: "4.6",
      location: "Kigali, Gasabo",
      price: "10,000 RWF",
      image:
        "https://images.unsplash.com/photo-1552493450-2b5ce80ed13f?q=80&w=814&auto=format&fit=crop",
      completedjob: "100 jobs completed",
    },
  ];

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
                          <h3 className="font-bold text-lg">
                            {person.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {person.job}
                          </p>
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
