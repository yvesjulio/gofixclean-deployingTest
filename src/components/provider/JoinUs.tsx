import { FiTool, FiShoppingCart } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { BsStar } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { MdOutlineVerifiedUser } from "react-icons/md";

function JoinUs() {
  const categories = [
    {
      title: "Earn on Your Terms",
      description: "Set your own rates and work when you want. Keep 85% of every booking.",
      icon: <FiTool />,
      bgColor: "bg-[#FCFDFC]",
      iconColor: "text-[#025E4C]",
    },
    {
      title: "Flexible Schedule",
      description: "Accept jobs that fit your schedule. You're always in control.",
      icon: <FaRegCalendarCheck />,
      bgColor: "bg-[#FCFDFC]",
      iconColor: "text-[#025E4C]",
    },
    {
      title: "Grow your client base",
      description: "Connect with thousands of potential clients looking for your skills.",
      icon: <HiUsers />,
      bgColor: "bg-[#FCFDFC]",
      iconColor: "text-[#025E4C]",
    },
    {
      title: "Secure Payments",
      description: "Your payments are protected. Pay only after the job is done to your satisfaction with our secure system.",
      icon: <MdOutlineVerifiedUser />,
      bgColor: "bg-[#FCFDFC]",
      iconColor: "text-[#025E4C]",
    },
    {
      title: "Build your reputation",
      description: "Get reviews and build your reputation.",
      icon: <BsStar />,
      bgColor: "bg-[#FCFDFC]",
      iconColor: "text-[#025E4C]",
    },
    {
      title: "Business Tools",
      description: "Access tools that help you manage bookings, payments, and client relationships.",
      icon: <FiShoppingCart />,
      bgColor: "bg-[#FCFDFC]",
      iconColor: "text-[#025E4C]",
    },
  ];

  return (
    <section className="px-6 md:px-16 py-12 ">
      <div className="flex justify-center md:flex-row items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Why join GoFix&Clean Works
          </h2>
          <p className="text-[#696969] text-sm max-w-lg">
            We provide everything you need to succeed as a service provider
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 pt-6 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="group bg-[#DFE7E5] rounded-lg p-6 cursor-pointer border border-[#459b8a] shadow-sm transition-all duration-300 hover:shadow-xl hover:border-t hover:border-t-[#64b8a7] hover:border-r hover:border-r-[#91dacc] hover:border-b hover:border-b-[#91dacc] hover:border-l hover:border-l-[#64b8a7]"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${cat.bgColor}`}>
              <span className={`text-2xl ${cat.iconColor}`}>{cat.icon}</span>
            </div>

            <h3 className="font-bold text-[#014336] text-lg mb-1">{cat.title}</h3>
            <p className="text-[#696969] text-sm mb-2">{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default JoinUs;
