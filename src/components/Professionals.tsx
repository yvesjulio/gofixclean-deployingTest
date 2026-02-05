import { FaUserGroup } from "react-icons/fa6";
import { FiGift, FiArrowRight } from "react-icons/fi";

function Professionals() {
  const categories = [
    {
      title: "Looking for a service?",
      description:
        "Find trusted professionals for any task. From plumbing to cleaning, we've got you covered with verified providers.",
      button: "Find a provider",
      icon: <FaUserGroup className="text-2xl text-[#E6EFED]" />,
      bgColor: "bg-[#357E70]",
      showArrow: true,
    },
    {
      title: "Want to Offer Services?",
      description:
        "Join thousands of service providers earning money on Tasker. Set your own rates, manage your schedule, grow your business.",
      button: "Become a provider",
      icon: <FiGift className="text-2xl text-[#025E4C]" />,
      bgColor: "bg-[#B1CDC8]",
      showArrow: false, 
    },
  ];

  return (
    <section className="px-4 sm:px-6 md:px-16 py-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Trusted professionals, across Kigali.
        </h2>
        <p className="text-sm sm:text-base text-[#696969] leading-relaxed">
          We connect you with reliable cleaners and technicians serving Kigali
          and nearby areas.
        </p>
      </div>

    
      <div className="flex flex-wrap justify-center gap-4 mb-6 font-medium">
        {["Gasabo","Kicukiro","Remera","Kimihurura","Kacyiru","Gisozi"].map((loc, i) => (
          <p
            key={i}
            className="w-full sm:w-auto px-6 py-2 bg-[#E5ECEA] text-[#025645] rounded-lg text-center"
          >
            {loc}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6 font-medium">
        {["Nyamirambo","Kanombe","Masaka"].map((loc, i) => (
          <p
            key={i}
            className="w-full sm:w-auto px-6 py-2 bg-[#E5ECEA] text-[#025645] rounded-lg text-center"
          >
            {loc}
          </p>
        ))}
      </div>

    <div className="text-center mt-12 mb-16">
  <p className="text-sm sm:text-base text-[#025E4C] font-medium cursor-pointer hover:underline">
    Find service near you
  </p>
</div>



      <div className="grid grid-cols-1 md:grid-cols-2  gap-y-6 gap-x-12">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`rounded-lg border p-6 transition cursor-pointer ${
              index === 0 ? "bg-[#025E4C] text-white border-[#025E4C]" : "bg-white border-[#357E70]"
            }`}
          >
           
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${cat.bgColor}`}
            >
              {cat.icon}
            </div>

          
            <h3 className="font-bold text-2xl mb-2">{cat.title}</h3>

          
            <p className={`text-sm mb-4 ${index === 0 ? "text-[#C5C5C5]" : "text-gray-400"} wrap-break-word`}>
              {cat.description}
            </p>

          
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm ${
                cat.showArrow
                  ? "bg-[#FF6B35] text-white hover:bg-[#e65a28]"
                  : "border border-[#025E4C] text-[#025E4C] hover:bg-[#025E4C] hover:text-white"
              }`}
            >
              {cat.button} {cat.showArrow && <FiArrowRight />}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Professionals;
