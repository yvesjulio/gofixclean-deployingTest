import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function Questions() {
  const faqs = [
    {
      question:
        "Got questions? We've got answers. If you don't find what you're looking for, feel free to contact our support team.",
      answer:
        "GoFix&Clean connects you with trusted local professionals for all your home service needs. Whether it's plumbing, electrical work, cleaning, or handyman services, we've got you covered.",
    },
    {
      question:
        "Got questions? We've got answers. If you don't find what you're looking for, feel free to contact our support team.",
      answer:
        "GoFix&Clean offers secure payment options. You can pay through our app using credit/debit cards or mobile money. Payment is only processed after the service is completed to your satisfaction.",
    },
    {
      question:
        "Got questions? We've got answers. If you don't find what you're looking for, feel free to contact our support team.",
      answer:
        "GoFix&Clean allows you to schedule services at your convenience. You can book appointments for the same day or choose a future date that works best for you.",
    },
    {
      question:
        "Got questions? We've got answers. If you don't find what you're looking for, feel free to contact our support team.",
      answer:
        "GoFix&Clean is committed to your satisfaction. If you're not happy with the service provided, please contact our support team within 24 hours. We will work to resolve the issue or provide a refund according to our guarantee terms.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 sm:px-6 md:px-16 py-16 bg-[#DFE7E5]">
      
      <div className="text-center max-w-3xl mx-auto mb-10">
       <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-2xl bg-[#FFD1C0] font-bold text-[#8C3B1D] mb-4">
          FAQs
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Frequently Asked Questions
        </h2>

        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
          Got questions? We've got answers. If you don't find what you're
          <br className="hidden sm:block" />
          looking for, feel free to contact our support team.
        </p>
      </div>

     
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl overflow-hidden transition-all duration-300
              ${openIndex === index ? "border-3 border-[#9cada8]" : "border border-gray-300"}`}
          >
            
            <div
              className="px-6 sm:px-10 py-5 flex items-center justify-between cursor-pointer"
              onClick={() => toggleQuestion(index)}
            >
              <p className="text-sm sm:text-base font-medium text-[#333]">
                {faq.question}
              </p>
              <MdOutlineKeyboardArrowDown
                className={`text-2xl text-gray-600 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

           
            <div
              className={`px-6 sm:px-10 pb-5 text-gray-500 text-sm sm:text-sm transition-all duration-300 ${
                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Questions;
