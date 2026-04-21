import foundedImg from "/images/founded.png";

const OurStory: React.FC = () => {

  return (
    <section className="px-6 md:px-12 py-20 bg-[#e4ebe9]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">

          <p className="inline-block bg-[#1ab89b] text-brandText px-8 py-2 rounded-xl font-semibold tracking-widest text-sm">
            {"Our Story"}
          </p>

          <h2 className="text-3xl font-bold">
            {"Building Trust in Home Services"}
          </h2>

          <p className="text-gray-700 leading-relaxed">
            {"GoFix&Clean was born out of a simple frustration: finding reliable, trustworthy service providers for home repairs and maintenance was too difficult."}
          </p>

          <p className="text-gray-700 leading-relaxed">
            {"In 2025, we built a platform that brings together verified professionals from various trades \u2013 plumbers, electricians, cleaners, and more."}
          </p>

          <p className="text-gray-700 leading-relaxed">
            {"Today, we're proud to serve thousands of customers, creating opportunities for skilled workers while making life easier for households."}
          </p>

        </div>
        <div className="overflow-hidden rounded-3xl">
          <img
            src={foundedImg}
            alt="GoFix&Clean Logo"
            className="w-full h-72 md:h-96 object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

      </div>
    </section>
  );
};

export default OurStory;
