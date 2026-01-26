import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function Questions() {
  return (
    <section className="px-4 sm:px-6 md:px-16 py-16 bg-[#DFE7E5]">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-2xl bg-[#FFD1C0] font-medium text-[#8C3B1D] mb-4">
          FAQs
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Frequently Asked Questions
        </h2>

       <p className="text-sm sm:text-base text-[#C5C5C5] leading-relaxed">
         Got questions? We've got answers. If you don't find what you're
        <br className="hidden sm:block" />
         looking for, feel free to contact our support team.
        </p>

      </div>
      <div className="max-w-6xl mx-auto flex flex-col gap-4">

        <div className="px-6 sm:px-10 py-5 bg-white rounded-xl flex items-center justify-between shadow-sm">
          <p className="text-sm sm:text-base font-medium text-[#333]">
          Got questions? We've got answers. If you don't find what you're looking for, feel free to contact our support team.
          </p>
          <MdOutlineKeyboardArrowDown className="text-2xl text-gray-600" />
        </div>

        <div className="px-6 sm:px-10 py-5 bg-white rounded-xl flex items-center justify-between shadow-sm">
          <p className="text-sm sm:text-base font-medium text-[#333]">
           How do I pay for services?
          </p>
          <MdOutlineKeyboardArrowDown className="text-2xl text-gray-600" />
        </div>

      <div className="px-6 sm:px-10 py-5 bg-white rounded-xl flex items-center justify-between shadow-sm">
          <p className="text-sm sm:text-base font-medium text-[#333]">
           How do I pay for services?
          </p>
          <MdOutlineKeyboardArrowDown className="text-2xl text-gray-600" />
        </div>
         <div className="px-6 sm:px-10 py-5 bg-white rounded-xl flex items-center justify-between shadow-sm">
          <p className="text-sm sm:text-base font-medium text-[#333]">
           How do I pay for services?
          </p>
          <MdOutlineKeyboardArrowDown className="text-2xl text-gray-600" />
        </div>
         <div className="px-6 sm:px-10 py-5 bg-white rounded-xl flex items-center justify-between shadow-sm">
          <p className="text-sm sm:text-base font-medium text-[#333]">
           How do I pay for services?
          </p>
          <MdOutlineKeyboardArrowDown className="text-2xl text-gray-600" />
        </div>
         <div className="px-6 sm:px-10 py-5 bg-white rounded-xl flex items-center justify-between shadow-sm">
          <p className="text-sm sm:text-base font-medium text-[#333]">
           How do I pay for services?
          </p>
          <MdOutlineKeyboardArrowDown className="text-2xl text-gray-600" />
        </div>

      </div>
    </section>
  );
}

export default Questions;
