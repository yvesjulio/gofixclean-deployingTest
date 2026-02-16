import { SlEye } from "react-icons/sl";
import { BiBullseye } from "react-icons/bi";

const MissionVision: React.FC = () => {
  return (
    <section className="px-6 md:px-12 py-16 bg-[#e4ebe9]">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-center gap-6 md:gap-10">

        
        <div className="flex flex-col items-start text-left space-y-4 border border-gray-300 rounded-xl p-6 bg-white shadow-lg md:w-5/11">
         
          <div className="flex items-center justify-center w-16 h-16 rounded-md bg-[#FFF0EA] text-[#FF7338] text-2xl">
            <SlEye />
          </div>
          <h3 className="text-xl font-bold">Our Mission</h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">
            Your payments are protected. To connect every household with trusted, verified service providers, making quality home services accessible, affordable, and hassle-free for everyone. Pay only after the job is done to your satisfaction with our secure system.
          </p>
        </div>

       
        <div className="flex flex-col items-start text-left space-y-4 border border-gray-300 rounded-xl p-6 bg-white shadow-lg md:w-5/11">
          <div className="flex items-center justify-center w-16 h-16 rounded-md bg-[#90D6F5] text-[#085B80] text-2xl">
            <BiBullseye />
          </div>
          <h3 className="text-xl font-bold">Our Vision</h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
            To become Africa's most trusted platform for home services, empowering millions of skilled professionals while delivering exceptional experiences to customers.
          </p>
        </div>

      </div>
    </section>
  );
};

export default MissionVision;
