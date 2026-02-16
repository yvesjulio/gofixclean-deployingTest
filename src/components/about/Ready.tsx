import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Ready: React.FC = () => {
  return (
    <section className="bg-brandText text-brandWhite px-6 md:px-12 pt-12 md:pt-20 pb-16 text-center">
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-[#ECECEC]">
          Ready to Get Started?
        </h1>
        <p className="text-[#C5C5C5] leading-relaxed">
          Join thousands of satisfied customers and trusted service providers <br />
          on our platform.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
        <button className="flex items-center justify-center gap-2 bg-brandOrange text-brandWhite px-6 py-3 rounded-md font-semibold transition-all duration-300 hover:bg-[#e05e2e] hover:scale-105">
          Find a provider <FaArrowRight />
        </button>

        <button className="px-6 py-3 rounded-md font-medium text-brandText bg-white transition-all duration-300 hover:scale-105">
          Become a provider
        </button>
      </div>
    </section>
  );
};

export default Ready;
