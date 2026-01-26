import { FaStar } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function Testimonials() {
  const providers = [
    {
      name: "John Dril",
      job: "Plumbing expert",
      image:
        "https://plus.unsplash.com/premium_photo-1705563088246-3673a401ed6a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      quote:
        "As a busy working mom, I don't have time to search for home service providers<br/>GoFix&Clean makes it easy to find trusted cleaners and handymen<br/>Love the video call feature!",
    },
  ];

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
      {providers.map((person, index) => (
        <div
          key={index}
          className="relative px-6 py-6 bg-[#E6EFED] rounded-xl max-w-5xl mx-auto flex flex-col gap-4"
        >
         
          <button className="absolute -left-6.25 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#ECECEC] shadow flex items-center justify-center hover:bg-gray-100 transition">
            <IoChevronBack size={24} />
          </button>

        
          <button className="absolute -right-6.25 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#ECECEC] shadow flex items-center justify-center hover:bg-gray-100 transition">
            <IoChevronForward size={24} />
          </button>

         
          <div className="flex justify-start">
            <img
              src="/images/bet.png"
              alt="GoFix&Clean Logo"
              className="w-12 h-12"
            />
          </div>
          <div className="flex gap-1 text-2xl -mt-10 pl-7">
            {Array.from({ length: person.rating }).map((_, i) => (
              <FaStar key={i} className="text-black" />
            ))}
          </div>
          <p
            className="text-[#4B4B4B] text-sm sm:text-base mt-2 ml-6"
            dangerouslySetInnerHTML={{ __html: `"${person.quote}"` }}
          />
         
          <div className="flex items-center gap-4 mt-4 ml-6">
            <img
              src={person.image}
              alt={person.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {person.name}
              </h3>
              <p className="text-sm">{person.job}</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center mt-4">
            <button className="px-6 py-2 bg-[#01342A] rounded-full"></button>
            <button className="px-3 py-2 bg-[#D9D9D9] rounded-full"></button>
            <button className="px-3 py-2 bg-[#D9D9D9] rounded-full"></button>
            <button className="px-3 py-2 bg-[#D9D9D9] rounded-full"></button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Testimonials;
