import { TiArrowRight } from "react-icons/ti";
import { FiTool, FiMonitor, FiShoppingCart } from "react-icons/fi";
import { FaPaintBrush, FaTruck, FaLaptopCode } from "react-icons/fa";
import type { ReactElement } from "react";
import { NavLink } from "react-router-dom";

interface Category {
  title: string;
  description: string;
  count: string;
  icon: ReactElement;
  bgColor: string;
  iconColor: string;
  titleKey: string;
  descKey: string;
  countKey: string;
}

const Categories: React.FC = () => {

  const categories: Category[] = [
    {
      titleKey: "categories.plumbing",
      descKey: "categories.plumbingDesc",
      countKey: "categories.plumbingCount",
      title: "Plumbing",
      description: "Pipes, taps and water systems",
      count: "350+ providers",
      icon: <FiTool />,
      bgColor: "bg-[#FED7D8]",
      iconColor: "text-[#E53E3E]",
    },
    {
      titleKey: "categories.electrical",
      descKey: "categories.electricalDesc",
      countKey: "categories.electricalCount",
      title: "Electrical",
      description: "Wiring, repairs & installation",
      count: "200+ providers",
      icon: <FaLaptopCode />,
      bgColor: "bg-[#CEC0FB]",
      iconColor: "text-[#6B46C1]", 
    },
    {
      titleKey: "categories.cleaning",
      descKey: "categories.cleaningDesc",
      countKey: "categories.cleaningCount",
      title: "Cleaning",
      description: "Home & Office Cleaning",
      count: "150+ providers",
      icon: <FaPaintBrush />,
      bgColor: "bg-[#A3FABC]",
      iconColor: "text-[#059669]", 
    },
    {
      titleKey: "categories.cooking",
      descKey: "categories.cookingDesc",
      countKey: "categories.cookingCount",
      title: "Cooking",
      description: "Personal Chefs & Catering",
      count: "120+ providers",
      icon: <FaTruck />,
      bgColor: "bg-[#F9DCAE]",
      iconColor: "text-[#D97706]",
    },
    {
      titleKey: "categories.gardening",
      descKey: "categories.gardening",
      countKey: "categories.gardeningCount",
      title: "Gardening",
      description: "Gardening",
      count: "80+ providers",
      icon: <FiMonitor />,
      bgColor: "bg-[#A5D2F8]",
      iconColor: "text-[#2563EB]", 
    },
    {
      titleKey: "categories.handyman",
      descKey: "categories.handymanDesc",
      countKey: "categories.handymanCount",
      title: "Handyman",
      description: "General Repairs & Fixes",
      count: "300+ providers",
      icon: <FiShoppingCart />,
      bgColor: "bg-[#F9ABF4]",
      iconColor: "text-[#C026D3]", 
    },
  ];

  return (
    <section className="px-6 md:px-16 py-12 bg-[#e4ebe9]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {"Browse by Category"}
          </h2>
          <p className="text-[#696969] text-sm max-w-lg">
            {"Find the right professional for any task. All providers are verified and reviewed by real customers."}
          </p>
        </div>

        <div className="group flex items-center text-sm text-[#025E4C] font-medium cursor-pointer transition hover:text-[#158b74]">
          <NavLink to="/services" className="cursor-pointer">
          <p>{"View all categories"}</p>
          </NavLink>
          <TiArrowRight className="ml-1 text-lg transition-transform group-hover:translate-x-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="group bg-white rounded-lg p-6 cursor-pointer
                       border border-gray-300
                       shadow-sm
                       transition-all duration-300
                       hover:shadow-xl
                       hover:border-t hover:border-t-[#64b8a7]
                       hover:border-r hover:border-r-[#91dacc]
                       hover:border-b hover:border-b-[#91dacc]
                       hover:border-l hover:border-l-[#64b8a7]"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${cat.bgColor}`}
            >
              <span className={`text-2xl ${cat.iconColor}`}>
                {cat.icon}
              </span>
            </div>

            <h3 className="font-bold text-lg mb-1">{cat.title}</h3>
            <p className="text-gray-400 text-sm mb-2">
              {cat.description}
            </p>
            <p className="text-[#025E4C] font-medium text-sm">
              {cat.count}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;