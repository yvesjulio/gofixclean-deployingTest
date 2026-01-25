import { TiArrowRight } from "react-icons/ti";
import { FiTool, FiMonitor, FiShoppingCart } from "react-icons/fi";
import { FaPaintBrush, FaTruck, FaLaptopCode } from "react-icons/fa";

function Categories() {
  const categories = [
    {
      title: "Plumbing",
      description: "Pipes, taps and water systems",
      count: "350+ providers",
      icon: <FiTool className="text-2xl text-black" />,
      bgColor: "bg-[#FED7D7]",
    },
    {
      title: "Electrical",
      description: "wiring, repairs & installation",
      count: "200+ providers",
      icon: <FaLaptopCode className="text-2xl text-black" />,
      bgColor: "bg-[#CEC0FB]",
    },
    {
      title: "Cleaning",
      description: "Home  & Office Cleaning",
      count: "150+ providers",
      icon: <FaPaintBrush className="text-2xl text-black" />,
      bgColor: "bg-[#A3FABC]",
    },
    {
      title: "Cooking",
      description: "Personal Chefs & Catering",
      count: "120+ providers",
      icon: <FaTruck className="text-2xl text-black" />,
      bgColor: "bg-[#F9DCAE]",
    },
    {
      title: "Gardening",
      description: "Pipes, taps and water systems",
      count: "80+ providers",
      icon: <FiMonitor className="text-2xl text-black" />,
      bgColor: "bg-[#A5D2F8]",
    },
    {
      title: "Handyman",
      description: "General Repairs & Fixes",
      count: "300+ providers",
      icon: <FiShoppingCart className="text-2xl text-black" />,
      bgColor: "bg-[#F9ABF4]",
    },
  ];

  return (
    <section className="px-6 md:px-16 py-12 bg-[#DFE7E5]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Browse by Category
          </h2>
          <p className="text-[#696969] text-sm max-w-lg">
            Find the right professional for any task. All providers are <br/>verified and reviewed by real customers.
          </p>
        </div>

       
        <div className="flex items-center text-sm text-[#025E4C] font-medium cursor-pointer hover:underline">
          <p>View all categories</p>
          <TiArrowRight className="ml-1 text-lg" />
        </div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow hover:shadow-md transition cursor-pointer"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${cat.bgColor}`}>
              {cat.icon}
            </div>
            <h3 className="font-bold text-lg mb-1">{cat.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{cat.description}</p>
            <p className="text-[#025E4C] font-medium text-sm">{cat.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
