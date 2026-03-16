import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SlSocialFacebook } from "react-icons/sl";
import { LuLinkedin, LuPhone } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import { FiArrowUp } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { PiTiktokLogo } from "react-icons/pi";

const Footer: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;

      if (scrollPosition + windowHeight / 2 >= pageHeight / 2) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 w-10 h-10 flex items-center justify-center bg-[#025E4C] text-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <FiArrowUp className="text-xl" />
        </button>
      )}

      <a
        href="https://wa.me/250791692126"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 50,
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          animation: "forwardBackward 1.5s ease-in-out infinite",
        }}
      >
        <img src="/images/whatsapp.png" alt="WhatsApp" className="h-10 w-10" />
      </a>

      <style>
        {`
          @keyframes forwardBackward {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
          }
        `}
      </style>

      <footer className="bg-[#3E3E3E] text-white px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-white px-2 py-1 font-bold text-[#025E4C] rounded-xl">GF</span>
              <h2 className="text-2xl font-bold">
                GoFix<span className="text-[#FF6B35]">&</span>Clean
              </h2>
            </div>

            <p className="text-sm text-[#C5C5C5] leading-relaxed mb-4">
              Connecting households with trusted service providers. Quality services at your fingertips.
            </p>

            <div className="flex">
              <div className="p-4 text-2xl rounded-xl cursor-pointer hover:bg-[#696969] transition-colors">
                <SlSocialFacebook />
              </div>
              <div className="p-4 text-2xl rounded-xl cursor-pointer hover:bg-[#696969] transition-colors">
                <PiTiktokLogo/>
              </div>
              <div className="p-4 text-2xl rounded-xl cursor-pointer hover:bg-[#696969] transition-colors">
                <FaInstagram />
              </div>
              <div className="p-4 text-2xl rounded-xl cursor-pointer hover:bg-[#696969] transition-colors">
                <LuLinkedin />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-xl">Services</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Plumbers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Electricians</li>
              <li className="hover:text-white cursor-pointer transition-colors">Cleaners</li>
              <li className="hover:text-white cursor-pointer transition-colors">Painters</li>
              <li className="hover:text-white cursor-pointer transition-colors">Handymen</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-xl">Company</h3>
            <ul className="space-y-2 text-sm">
              <li
                className={`cursor-pointer transition-colors ${
                  location.pathname === "/about" ? "font-bold text-brandOrange" : "text-gray-300 hover:text-white"
                }`}
              >
                <Link to="/about" onClick={handleNavClick}>About Us</Link>
              </li>

              <li
                className={`cursor-pointer transition-colors ${
                  location.pathname === "/provider" ? "font-bold text-brandOrange" : "text-gray-300 hover:text-white"
                }`}
              >
                <Link to="/become-provider" onClick={handleNavClick}>Become a Provider</Link>
              </li>

              <li
                className={`cursor-pointer transition-colors ${
                  location.pathname === "/blog" ? "font-bold text-brandOrange" : "text-gray-300 hover:text-white"
                }`}
              >
                <Link to="/blog" onClick={handleNavClick}>Blog</Link>
              </li>

              <li
                className={`cursor-pointer transition-colors ${
                  location.pathname === "/careers" ? "font-bold text-brandOrange" : "text-gray-300 hover:text-white"
                }`}
              >
                <Link to="/careers" onClick={handleNavClick}>Careers</Link>
              </li>

              <li
                className={`cursor-pointer transition-colors ${
                  location.pathname === "/contact" ? "font-bold text-brandOrange" : "text-gray-300 hover:text-white"
                }`}
              >
                <Link to="/contact" onClick={handleNavClick}>Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-xl">Contact Us</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                <CiLocationOn /> Kigali, Rwanda
              </li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                <LuPhone /> +250 788 123 456
              </li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                <CgMail /> gofixandclean@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-10 pt-6 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} GoFix&Clean. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="cursor-pointer hover:underline">Privacy Policy</span>
              <span className="cursor-pointer hover:underline">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;