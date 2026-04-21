import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface FAQ {
  question: string;
  answer: string;
}

const Questions: React.FC = () => {

  const faqs: FAQ[] = [
    {
      question: "What is GoFix&Clean?",
      answer: "GoFix&Clean connects you with trusted local professionals for all your home service needs. Whether it's plumbing, electrical work, cleaning, painting, or handyman services, we've got you covered with reliable and professional service providers in Kigali.",
    },
    {
      question: "How do I book a service?",
      answer: "It's simple! Go to our Services page, select the service category you need, choose your preferred provider, and follow the booking process. Our team will confirm your booking and assign a verified professional to help you.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept secure payments through Mobile Money and Bank transfers. Payment details will be confirmed during your booking. Payment is processed after the service is completed to your satisfaction.",
    },
    {
      question: "Can I schedule services at a time that works for me?",
      answer: "Absolutely! GoFix&Clean allows you to schedule services at your convenience. You can book for the same day or choose a future date that works best for you. Just provide your preferred time during booking.",
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "Your satisfaction is our priority. If you're not happy with the service, please contact our support team within 24 hours. We will work to resolve the issue, arrange a replacement provider if needed, or provide a refund according to our satisfaction guarantee.",
    },
    {
      question: "How quickly can a provider arrive?",
      answer: "Response time depends on provider availability and your location. We work to assign a verified provider as soon as possible after booking confirmation. For urgent services, we prioritize faster assignments.",
    },
    {
      question: "Are the service providers verified?",
      answer: "Yes! All our service providers go through a verification process to ensure quality and reliability. We maintain high standards to ensure you get professional and trustworthy service.",
    },
    {
      question: "What if the provider doesn't show up?",
      answer: "If a provider fails to show up, we'll immediately arrange a replacement provider at no extra cost. If no replacement is available, we'll provide a full refund. Your satisfaction and time are important to us.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 sm:px-6 md:px-16 py-16 bg-[#DFE7E5]">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-2xl bg-[#FFD1C0] font-bold text-[#8C3B1D] mb-4">
          {"FAQs"}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          {"Frequently Asked Questions"}
        </h2>

        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
          {"Find answers to common questions about GoFix&Clean services. If you need more help, contact our support team anytime."}
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
};

export default Questions;