const Work: React.FC = () => {
  return (
    <section className="px-6 md:px-12 py-20 bg-[#e4ebe9]">
      <div className="max-w-4xl mx-auto">
        <div className="md:mb-16 mb-8 text-center">
          <h3 className="text-3xl sm:text-3xl md:text-4xl font-bold">
            How It Works
          </h3>
          <p className="text-[#696969] mt-2 text-base sm:text-base md:text-">
            Getting started is easy. Follow these simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center px-4">
            <div className="w-24 h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-6 flex items-center justify-center rounded-full bg-brandText text-white text-4xl font-semibold">
              01
            </div>
            <h4 className="text-lg sm:text-lg md:text-xl font-semibold mb-3 text-brandText">
              Create an account
            </h4>
            <p className="text-gray-600 text-base sm:text-base md:text-sm leading-relaxed">
              Sign up and tell us about your skills, experience, and the services you offer.
            </p>
          </div>

          <div className="text-center px-4">
            <div className="w-24 h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-6 flex items-center justify-center rounded-full bg-brandText text-white text-4xl font-semibold">
              02
            </div>
            <h4 className="text-lg sm:text-lg md:text-xl font-semibold mb-3 text-brandText">
              Choose a service
            </h4>
            <p className="text-gray-600 text-base sm:text-base md:text-sm leading-relaxed">
              Complete our verification process to build trust with potential clients.
            </p>
          </div>

          <div className="text-center px-4">
            <div className="w-24 h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-6 flex items-center justify-center rounded-full bg-brandText text-white text-4xl font-semibold">
              03
            </div>
            <h4 className="text-lg sm:text-lg md:text-xl font-semibold mb-3 text-brandText">
              Book the service
            </h4>
            <p className="text-gray-600 text-base sm:text-base md:text-sm leading-relaxed">
              Receive booking requests, accept jobs, and get paid for your work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
