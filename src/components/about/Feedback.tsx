import React from "react";

interface FeedbackItem {
  number: string;
  label: string;
}

const Feedback: React.FC = () => {

  const feedbackData: FeedbackItem[] = [
    { number: "30+", label: "Areas We Cover" },
    { number: "10+", label: "Service Providers" },
    { number: "10+", label: "Jobs Completed" },
    { number: "20+", label: "Happy Clients" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-16 text-center px-6">
        {feedbackData.map((item, index) => (
          <div key={index} className="flex flex-col">
            <p className="text-2xl md:text-3xl font-bold text-brandText">{item.number}</p>
            <p className="text-sm md:text-base text-gray-700">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feedback;
