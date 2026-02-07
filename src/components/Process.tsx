import { FiSearch } from "react-icons/fi";
import { FaUserCheck, FaRegCalendarCheck } from "react-icons/fa";
import { GoStar } from "react-icons/go";

function Process() {
  const categories = [
    {
      title: "Search & Browse",
      description:
        "Enter your service need and location. Browse through verified providers with real reviews and ratings.",
      icon: <FiSearch className="text-2xl text-brandText" />,
      bgColor: "bg-[#91DFC5]",
    },
    {
      title: "Choose a Provider",
      description:
        "Compare profiles, check availability, and select the best professional for your specific needs.",
      icon: <FaUserCheck className="text-2xl text-brandText" />,
      bgColor: "bg-[#91DFC5]",
    },
    {
      title: "Book & Schedule",
      description:
        "Pick a convenient date and time. Get instant confirmation and chat directly with your provider.",
      icon: <FaRegCalendarCheck className="text-2xl text-brandText" />,
      bgColor: "bg-[#91DFC5]",
    },
    {
      title: "Get it Done & Review",
      description:
        "Your provider arrives and completes the job. Pay securely and share your experience.",
      icon: <GoStar className="text-2xl text-brandText" />,
      bgColor: "bg-[#91DFC5]",
    },
  ];

  return (
    <div className="text-center px-4 md:px-0 pt-16 pb-16">
      <div className="flex justify-center">
        <div className="flex items-center gap-2 px-6 py-2 border border-white/40 rounded-xl bg-[#B1CDC8] font-medium text-brandText mb-6">
          <span>Simple Process</span>
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        How GoFix<span className="text-brandOrange">&</span>Clean Works
      </h2>
      <p className="text-[#696969] text-base md:text-base max-w-xl mx-auto leading-relaxed mb-10">
        Getting quality service is just a few clicks away. Our platform <br className="hidden md:block" /> 
        makes it easy to find, book, and pay for services.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg border border-gray-100 
                       shadow hover:shadow-md transition cursor-pointer
                       w-77 sm:w-64 p-8 sm:p-6 flex flex-col"
          >
            <div className="absolute -top-3 -right-3 w-12 h-12 flex items-center justify-center shadow-sm rounded-full bg-brandOrange text-white font-bold">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className={`w-12 h-12 rounded-lg mb-4 ${cat.bgColor} flex items-center justify-center`}>
              {cat.icon}
            </div>

            <h3 className="font-bold text-lg mb-2 text-start">{cat.title}</h3>
            <p className="text-[#828282] text-base sm:text-sm mb-3 text-start">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Process;
