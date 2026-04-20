import React from "react";

const AboutUs: React.FC = () => {

  return (
    <section className="bg-brandText text-brandWhite px-6 md:px-9 pt-16 md:pt-12 pb-16 text-center">
      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-[#ECECEC]">
        {"About GoFix&Clean"}
      </h1>

      <p className="text-[#C5C5C5] mx-auto mb-8 max-w-3xl leading-relaxed text-base md:text-lg">
        {"We're on a mission to connect households with trusted, verified service providers. Making home services simple, safe, and accessible for everyone."}
      </p>
    </section>
  );
};

export default AboutUs;
