import { FaUserGroup } from "react-icons/fa6";
import { FiGift, FiArrowRight } from "react-icons/fi";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Category {
  title: string;
  description: string;
  button: string;
  icon: ReactNode;
  bgColor: string;
  showArrow: boolean;
  to: string;
}

const Professionals: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  const categories: Category[] = [
    {
      title: "Find a provider",
      description:
        "We connect you with reliable cleaners and technicians serving Kigali and nearby areas.",
      button: "Find a provider",
      icon: <FaUserGroup className="text-2xl text-[#E6EFED]" />,
      bgColor: "bg-[#357E70]",
      showArrow: true,
      to: "/services",
    },
    {
      title: "Want to Offer Services?",
      description:
        "Join thousands of service providers earning money on GoFix&Clean. Set your own rates, manage your schedule, grow your business.",
      button: "Become a provider",
      icon: <FiGift className="text-2xl text-brandText" />,
      bgColor: "bg-[#B1CDC8]",
      showArrow: false,
      to: "/become-provider",
    },
  ];


  const handleNavClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <section className="px-4 sm:px-6 md:px-16 py-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          {"Trusted professionals, across Kigali."}
        </h2>
        <p className="text-sm sm:text-base text-[#696969] leading-relaxed">
          {"We connect you with reliable cleaners and technicians serving Kigali and nearby areas."}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6 font-medium">
        {["Gasabo", "Kicukiro", "Remera", "Kimihurura", "Kacyiru", "Gisozi"].map(
          (loc: string, i: number) => (
            <p
              key={i}
              className="w-full sm:w-auto px-6 py-2 bg-[#E5ECEA] text-brandText rounded-lg text-center"
            >
              {loc}
            </p>
          )
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6 font-medium">
        {["Nyamirambo", "Kanombe", "Masaka"].map((loc: string, i: number) => (
          <p
            key={i}
            className="w-full sm:w-auto px-6 py-2 bg-[#E5ECEA] text-brandText rounded-lg text-center"
          >
            {loc}
          </p>
        ))}
      </div>

      <div className="text-center mt-12 mb-16">
        <NavLink 
          to="/services" 
          onClick={handleNavClick}
          className={({ isActive }) => 
            `text-sm sm:text-base text-brandText font-bold cursor-pointer hover:underline inline-block ${
              isActive ? 'underline' : ''
            }`
          }
        >
          {"Find a provider"}
        </NavLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
        {categories.map((cat: Category, index: number) => (
          <NavLink
            key={index}
            to={cat.to}
            onClick={handleNavClick}
            className={({ isActive }) => 
              `rounded-lg border p-6 transition-all duration-300 cursor-pointer block ${
                index === 0
                  ? "bg-brandText text-white border-brandText"
                  : "bg-white border-brandText/30"
              } ${
                isActive ? 'ring-2 ring-[#01342A] ring-offset-2' : ''
              } hover:shadow-lg transform hover:-translate-y-1`
            }
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${cat.bgColor}`}
            >
              {cat.icon}
            </div>

            <h3 className="font-bold text-2xl mb-2">{cat.title}</h3>

            <p
              className={`text-sm mb-4 ${
                index === 0 ? "text-[#C5C5C5]" : "text-gray-400"
              } wrap-break-word`}
            >
              {cat.description}
            </p>

            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm ${
                cat.showArrow
                  ? "bg-brandOrange text-white hover:bg-brandOrange/90"
                  : "border border-brandText text-brandText hover:bg-brandText hover:text-white"
              } transition-colors duration-300`}
            >
              {cat.button}
              {cat.showArrow && <FiArrowRight />}
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default Professionals;