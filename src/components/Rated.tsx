import { TiArrowRight } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";

function Rated() {
  const providers = [
    {
      name: "John Dril",
      job: "Plumbing expert",
      rating: "4.8",
      reviews: "32 Reviews",
      location: "Kigali, Gasabo",
      price: "8,000 RWF",
      image:
        "https://plus.unsplash.com/premium_photo-1705563088246-3673a401ed6a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      services: ["Emergency Service", "Installation", "Leak Repair"],
    },
    {
      name: "Keza Natacha",
      job: "Plumbing expert",
      rating: "4.9",
      reviews: "30 Reviews",
      location: "Kigali, Gasabo",
      price: "8,000 RWF",
      image:
        "https://plus.unsplash.com/premium_photo-1681493771936-7d76691184d9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      services: ["Emergency Service", "Installation", "Leak Repair"],
    },
    {
      name: "Eric Niyonzima",
      job: "Handyman",
      rating: "4.7",
      reviews: "50 Reviews",
      location: "Kigali, Gasabo",
      price: "8,000 RWF",
      image:
        "https://images.unsplash.com/photo-1552493450-2b5ce80ed13f?q=80&w=814&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      services: ["Emergency Service", "Installation", "Leak Repair"],
    },
  ];

  return (
    <section className="bg-[#DFE7E5]  min-h-screen  flex flex-col px-4 sm:px-6 md:px-16 py-10 md:py-16">
     
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 md:mt-0 mb-8 md:mb-10 gap-4 md:gap-0">
     <div className="w-full md:w-2/3">
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#FFD1C0] text-xs sm:text-sm font-medium text-[#8C3B1D] mb-2">
      Top rated
    </div>

    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
      Featured Service Providers
    </h2>

    <p className="text-[#696969] text-xs sm:text-sm md:text-base leading-tight">
      Meet some of our highest-rated professionals trusted by
      <br className="sm:hidden" /> thousands of customers.
    </p>
  </div>

  <div className="flex items-center text-sm sm:text-base text-[#025E4C] font-medium cursor-pointer hover:underline mt-4 md:mt-0">
    <span>View all providers</span>
    <TiArrowRight className="ml-1 text-lg" />
  </div>
</div>


      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((person, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden w-full flex flex-col"
          >
          
            <span className="absolute top-3 right-3 font-light bg-[#025E4C] text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 sm:gap-2 z-10">
              <GrStatusGood className="text-[10px] sm:text-[14px]" />
              Top rated
            </span>
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-44 sm:h-48 md:h-52 object-cover"
            />

          
            <div className="p-4 sm:p-5 flex flex-col grow">
              <h3 className="font-bold text-base sm:text-lg">{person.name}</h3>
              <p className="text-xs sm:text-sm text-[#FF6B35] mb-2">{person.job}</p>

          
                  <div className="flex items-center gap-1 mb-1 text-xs sm:text-sm">
                <FaStar className="text-orange-400" />
                <span className="text-[#7B7F7E]">{person.rating}</span>
                <span className="text-[#C5C5C5]">({person.reviews})</span>
              </div>
              <div className="flex items-center gap-1 pt-2 text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm">
                <IoLocationOutline className="text-base sm:text-xl" />
                <span className="text-[#696969]">{person.location}</span>
              </div>
            
      
              <div className="flex  pt-2 flex-wrap gap-2 mb-2 sm:mb-3">
                {person.services.map((service, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-md bg-[#E6EFED] font-medium text-[#025E4C]"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <hr className="my-2 sm:my-3 text-[#ECECEC]" />
              <p className="text-xs sm:text-sm text-[#696969]">From</p>
              <p className="font-semibold text-sm sm:text-base">{person.price}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Rated;
