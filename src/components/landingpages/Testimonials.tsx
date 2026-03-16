import { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface Provider {
  name: string;
  job: string;
  image: string;
  rating: number;
  quote: string;
}

const Testimonials: React.FC = () => {
  const providers: Provider[] = [
    {
      name: "John Dril",
      job: "Plumbing expert",
      image:
        "https://plus.unsplash.com/premium_photo-1705563088246-3673a401ed6a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      quote:
        "As a busy working mom, I don't have time to search for home service providers<br/>GoFix&Clean makes it easy to find trusted cleaners and handymen<br/>Love the video call feature!",
    },
    {
      name: "Jane Doe",
      job: "Electrical Specialist",
      image:
        "https://plus.unsplash.com/premium_photo-1681493771936-7d76691184d9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4,
      quote:
         "I don't have time to search for home service providers<br/>GoFix&Clean makes it easy to find trusted cleaners and handymen<br/>Love the video call feature!",
    },
    {
      name: "Mark Smith",
      job: "Gardening Expert",
      image:
        "https://images.unsplash.com/photo-1552493450-2b5ce80ed13f?q=80&w=814&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 3,
      quote:
        "They made gardening so easy! Friendly staff and trustworthy providers.<br/>Will use again.",
    },
    {
      name: "Jane Doe",
      job: "Electrical Specialist",
      image:
        "https://plus.unsplash.com/premium_photo-1681493771936-7d76691184d9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4,
      quote:
        "Excellent service! Quick response and very professional.<br/>Highly recommend GoFix&Clean.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

 
  const clearAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

 
  const startAutoSlide = () => {
    clearAutoSlide(); 
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === providers.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
  };


  useEffect(() => {
    startAutoSlide();
    return () => clearAutoSlide();
  }, []);

  const nextTestimonial = () => {
    clearAutoSlide(); 
    setCurrentIndex((prev) =>
      prev === providers.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    clearAutoSlide(); 
    setCurrentIndex((prev) =>
      prev === 0 ? providers.length - 1 : prev - 1
    );
  };

  const handleIndicatorClick = (idx: number) => {
    clearAutoSlide(); 
    setCurrentIndex(idx);
  };

  return (
    <section className="px-4 sm:px-6 md:px-16 py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-2xl bg-[#B1CDC8] font-medium text-[#01342A] mb-4">
          Testimonials
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          What Our Customers Say
        </h2>

        <p className="text-[#696969] text-sm">
          Don't just take our word for it. Here's what real customers have to
          <br />
          say about their experience with GoFix&Clean.
        </p>
      </div>

      <div className="relative px-6 py-6 bg-[#E6EFED] rounded-xl max-w-5xl mx-auto flex flex-col gap-4 shadow-lg min-h-[400px]">

        <button
          onClick={prevTestimonial}
          className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow flex items-center justify-center bg-[#ECECEC] hover:bg-brandOrange transition"
        >
          <IoChevronBack size={24} />
        </button>

        <button
          onClick={nextTestimonial}
          className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow flex items-center justify-center bg-[#ECECEC] hover:bg-brandOrange transition"
        >
          <IoChevronForward size={24} />
        </button>

       
        <div className="flex justify-start">
          <img
            src="/images/bet.png"
            alt="GoFix&Clean Logo"
            className="w-12 h-12"
          />
        </div>

       
        <div className="relative">
          <div className="flex gap-1 text-2xl absolute -top-8 left-7">
            {Array.from({ length: providers[currentIndex].rating }).map((_, i) => (
              <FaStar key={i} className="text-black" />
            ))}
          </div>
        </div>

     
        <div className="pt-4">
          <p
            className="text-[#4B4B4B] text-sm sm:text-base ml-6"
            dangerouslySetInnerHTML={{
              __html: `"${providers[currentIndex].quote}"`,
            }}
          />
        </div>

       
        <div className="flex items-center gap-4 mt-4 ml-6">
          <img
            src={providers[currentIndex].image}
            alt={providers[currentIndex].name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
          />

          <div>
            <h3 className="font-bold text-base sm:text-lg">
              {providers[currentIndex].name}
            </h3>
            <p className="text-sm">{providers[currentIndex].job}</p>
          </div>
        </div>

       
        <div className="flex gap-4 justify-center mt-4">
          {providers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleIndicatorClick(idx)}
              className={`rounded-full transition ${
                idx === currentIndex
                  ? "bg-[#01342A] w-10 h-3"
                  : "bg-[#D9D9D9] w-3 h-3"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;