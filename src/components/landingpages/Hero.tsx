import { useState, useEffect } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { HiStar } from "react-icons/hi2";
import { GoClock } from "react-icons/go";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const words: string[] = [
    "Plumber",
    "Electrician",
    "Cleaner",
    "Handyman",
    "General fix"
  ];

  useEffect(() => {
    const currentWord: string = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length + 1));
      }, 120);
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length - 1));
      }, 80);
    }

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 1000);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev: number) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  
  const handleNavClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <section className="bg-brandText text-brandWhite px-6 md:px-9 pt-16 pb-16 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/40 rounded-xl mb-6 bg-white/20 text-sm font-light text-gray-200">
        <VscWorkspaceTrusted className="text-2xl text-brandWhite" />
        <span className="text-sm">{"Verified & Trusted Providers"}</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-[#ECECEC]">
        {"Find Trusted"}{" "}
        <span className="text-brandOrange">
          {text}
          <span className="animate-pulse">|</span>
        </span>
        <br />
        {"Near You"}
      </h1>

      <p className="text-[#C5C5C5] mx-auto mb-8 max-w-3xl">
        {"Connect with certified plumbers, electricians, cleaners, and more. Quality home services made simple, safe, and affordable."}
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mb-12">
        <Link to="/services" onClick={handleNavClick}>
          <button className="bg-brandOrange text-brandWhite px-6 py-3 rounded-md transition-all duration-400 ease-out hover:bg-[#e05e2e] hover:scale-[1.03]">
            {"Book a provider"}
          </button>
        </Link>

        <Link to="/become-provider" onClick={handleNavClick}>
          <button className="bg-brandWhite px-6 py-3 rounded-md font-medium text-brandText transition-all duration-400 ease-out hover:scale-[1.03]">
            {"Become a provider"}
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 max-w-3xl mx-auto text-center">
        <div>
          <div className="flex items-center justify-center gap-2 text-lg font-bold">
            <HiStar className="text-2xl text-brandYellow" />
            <span className="text-3xl">{"4.9"}</span>
          </div>
          <p className="text-sm text-[#C5C5C5] mt-1">{"Average ratings"}</p>
        </div>

        <div>
          <div className="flex items-center justify-center gap-2 text-lg font-bold">
            <span className="text-3xl">30+</span>
          </div>
          <p className="text-sm text-[#C5C5C5] mt-1">{"Areas we cover"}</p>
        </div>

        <div>
          <div className="flex items-center justify-center gap-2 text-lg font-bold">
            <span className="text-3xl">10+</span>
          </div>
          <p className="text-sm text-[#C5C5C5] mt-1">{"Service providers"}</p>
        </div>

        <div>
          <div className="flex items-center justify-center gap-2 text-lg font-bold">
            <GoClock className="text-xl" />
            <span className="text-3xl">30 min</span>
          </div>
          <p className="text-sm text-[#C5C5C5] mt-1">{"Avg. response time"}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;