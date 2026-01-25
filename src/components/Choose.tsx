import { MdOutlineVerified } from "react-icons/md";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";
import { GoCreditCard } from "react-icons/go";
import { LuHeadphones } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";

function Choose() {
  const categories = [
    {
      title: "Verified Professionals",
      description:
        "Every provider undergoes thorough background checks and skill verification before joining our platform.",
      icon: <MdOutlineVerified  className="text-2xl text-[#096647]" />,
      bgColor: "bg-[#91DFC5]",
    },
    {
      title: "Secure Payments",
      description:
        "Your payments are protected. Pay only after the job is done to your satisfaction with our secure system.",
      icon: <MdOutlineVerifiedUser className="text-2xl text-[#096647]" />,
      bgColor: "bg-[#91DFC5]",
    },
    {
      title: "Quick Response",
      description:
        "Get matched with available providers within minutes. Most requests receive responses in under 30 minutes.",
      icon: <LuClock3 className="text-2xl text-[#096647]" />,
      bgColor: "bg-[#91DFC5]",
    },
    {
      title: "Transparent Payment",
      description:
        "No hidden fees or surprises. See upfront pricing and get detailed quotes before confirming your booking.",
      icon: <GoCreditCard className="text-2xl text-[#096647]" />,
      bgColor: "bg-[#91DFC5]",
    },
    {
      title: "24/7 Support",
      description: "Our dedicated support team is always here to help you with any questions or concerns.",
      icon: <LuHeadphones className="text-2xl text-[#096647]" />,
      bgColor: "bg-[#91DFC5]",
    },
    {
      title: "Satisfaction Guaranteed",
      description: "Not happy with the service? We'll work to make it right or provide a refund within our guarantee terms.",
      icon: < FaRegHeart className="text-2xl text-[#096647]" />,
      bgColor: "bg-[#91DFC5]",
    },
  ];

  return (
    <div className="text-center px-4 md:px-8 lg:px-16 pt-16 pb-16">
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2 px-5 py-1.5 border border-white/40 rounded-xl bg-[#EAEFEE] font-medium text-[#025E4C]">
          <span>
            GoFix<span className="text-[#FF6B35]">&</span>Clean
          </span>
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Us?</h2>
      <p className="text-[#696969] text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10">
        We're committed to providing the best service experience. Here's what sets us apart from the rest.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4 max-w-230 h-100 mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-100 p-4 shadow hover:shadow-md transition cursor-pointer flex flex-col"
          >
            <div
              className={`w-12 h-12 rounded-lg mb-3 ${cat.bgColor} flex items-center justify-center`}
            >
              {cat.icon}
            </div>
            <h3 className="font-bold text-lg mb-1 text-start">{cat.title}</h3>
            <p className="text-[#828282] text-sm text-start">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Choose;
