import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const Income: React.FC = () => {
  return (
    <section className="bg-brandText text-brandWhite px-6 md:px-9 pt-16 md:pt-12 pb-16 text-center">
      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-[#ECECEC]">
       Turn Your Skills Into Income
      </h1>

      <p className="text-[#C5C5C5] mx-auto mb-8 max-w-3xl leading-relaxed text-base md:text-lg">
       Join thousands of service providers earning money on Tasker. Set your own schedule, keep more of what you earn.
      </p>
       <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mb-12">
       <button className="flex items-center gap-2 bg-brandOrange text-brandWhite px-6 py-3 rounded-md transition-all duration-300 ease-out hover:bg-[#e05e2e] hover:scale-[1.03]">
       <span>Get started</span>
       <FaArrowRight />
       </button>

        <button className="bg-brandWhite px-6 py-3 rounded-md font-medium text-brandText transition-all duration-400 ease-out hover:scale-[1.03]">
          Learn more
        </button>
      </div>
    </section>
  );
};

export default Income;
