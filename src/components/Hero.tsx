import { VscWorkspaceTrusted } from "react-icons/vsc";
import { HiStar } from "react-icons/hi2";
import { GoClock } from "react-icons/go";

function Hero() {
  return (
    <section className="bg-[#025E4C] text-white px-6 md:px-16 py-16 text-center">
      
     
      <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/40 rounded-xl mb-6 bg-white/20 text-sm font-light text-gray-200">
        <VscWorkspaceTrusted className="text-2xl text-white" /> 
        <span className="text-sm">
          Verified & Trusted Providers
        </span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-[#ECECEC]">
        Find Trusted <span className="text-[#FF6B35]">P<span>|</span></span><br />
        Near You
      </h1>

     
      <p className="text-[#C5C5C5]  mx-auto mb-8">
        Connect with certified plumbers, electricians, cleaners, and more.  Quality home services<br/>
        made simple, safe, and affordable.
      </p>

     
      <div className="flex flex-col sm:flex-row justify-center gap-12 mb-13">
        <button className="bg-[#FF6B35] text-white px-6 py-3 rounded-md">
          Find a provider
        </button>

        <button className=" bg-white px-6 py-3 rounded-md font-medium text-[#025E4C]">
          Become a provider
        </button>
      </div>

    
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 max-w-3xl mx-auto text-center">
        
       
        <div>
          <div className="flex items-center justify-center gap-2 text-lg font-bold">
            <HiStar className="text-2xl text-[#F59E0B]"/>
            <span className="text-3xl">4.9</span>
          </div>
          <p className="text-sm text-[#C5C5C5] mt-1">Average ratings</p>
        </div>

       
        <div>
          <div className="flex items-center justify-center gap-2 text-lg font-bold">
            <span className="text-3xl">30+</span>
          </div>
          <p className="text-sm text-[#C5C5C5] mt-1">Areas we cover</p>
        </div>

       
        <div>
          <div className="flex items-center justify-center gap-2 text-lg font-bold">
            <span className="text-3xl">5K+</span>
          </div>
          <p className="text-sm text-[#C5C5C5] mt-1">Service providers</p>
        </div>

        <div>
          <div className="flex items-center justify-center gap-2 text-lg font-bold">
            <GoClock className="text-xl"  />
            <span className="text-3xl">30 min</span>
          </div>
          <p className="text-sm text-[#C5C5C5] mt-1">Avg. response time</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
