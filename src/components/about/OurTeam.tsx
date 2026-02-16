import React from "react";

const teamMembers = [
  {
    name: "Oluwaseun Adeyemi",
    role: "CEO & Co-Founder",
    image:
      "https://plus.unsplash.com/premium_photo-1681493771936-7d76691184d9?q=80&w=870&auto=format&fit=crop",
  },
  {
    name: "Customer First",
    role: "COO & Co-Founder",
    image:
      "https://plus.unsplash.com/premium_photo-1705563088246-3673a401ed6a?q=80&w=870&auto=format&fit=crop",
  },
  {
    name: "Customer First",
    role: "CTO",
    image:
      "https://plus.unsplash.com/premium_photo-1681493771936-7d76691184d9?q=80&w=870&auto=format&fit=crop",
  },
  {
    name: "Customer First",
    role: "Head of Operations",
    image:
      "https://plus.unsplash.com/premium_photo-1705563088246-3673a401ed6a?q=80&w=870&auto=format&fit=crop",
  },
];

const OurTeam: React.FC = () => {
  return (
    <section className="px-6 md:px-12 py-30 bg-[#e4ebe9]">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="inline-block bg-[#FFD1C0] text-[#8C3B1D] px-4 py-2 rounded-2xl font-semibold tracking-widest text-sm mb-4">
          Our Team
        </p>
        <h3 className="font-bold text-3xl md:text-3xl">
          Meet the People Behind GoFix<span className="text-brandOrange">&</span>Clean
        </h3>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-60 h-60 md:w-61 md:h-61 mx-auto rounded-full object-cover mb-4 border-13 border-gray-300 transition-transform duration-300 hover:scale-105"
            />
            <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
            <p className="text-gray-500 text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
