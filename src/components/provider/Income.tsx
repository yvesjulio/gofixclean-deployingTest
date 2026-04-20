import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Income: React.FC = () => {

  return (
    <section className="bg-brandText text-brandWhite px-6 md:px-9 pt-16 md:pt-12 pb-16 text-center">
      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-[#ECECEC]">
        {"Turn Your Skills Into Income"}
      </h1>

      <p className="text-[#C5C5C5] mx-auto mb-8 max-w-3xl leading-relaxed text-base md:text-lg">
        {"Join thousands of service providers earning money on Tasker. Set your own schedule, keep more of what you earn."}
      </p>
      <div className="flex justify-center mb-12">
        <NavLink
          to="/provider/verification"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 bg-brandOrange text-brandWhite px-6 py-3 rounded-md transition-all duration-300 ease-out hover:scale-110"
        >
          <span>{"Get started"}</span>
          <FaArrowRight />
        </NavLink>
      </div>
    </section>
  );
};

export default Income;
