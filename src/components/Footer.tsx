import { useEffect, useState } from "react";
import { SlSocialFacebook } from "react-icons/sl";
import { LuLinkedin, LuPhone } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import { FiArrowUp } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;
      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      setShowTopBtn(footerTop < windowHeight + 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              <span className="bg-white px-2 py-1 font-bold text-[#025E4C] rounded-xl">
                GF
              </span>
              <h2 className="text-2xl font-bold">
                GoFix<span className="text-[#FF6B35]">&</span>Clean
              </h2>
            </div>

            <p className="text-sm text-[#C5C5C5] leading-relaxed mb-4">
              Connecting households with trusted service providers. Quality services at your fingertips.
            </p>

            <div className="flex gap-3">
              <div className="p-3 bg-[#696969] rounded-full cursor-pointer">
                <SlSocialFacebook />
              </div>
              <div className="p-3 bg-[#696969] rounded-full cursor-pointer">
                <FaXTwitter />
              </div>
              <div className="p-3 bg-[#696969] rounded-full cursor-pointer">
                <FaInstagram />
              </div>
              <div className="p-3 bg-[#696969] rounded-full cursor-pointer">
                <LuLinkedin />
              </div>
            </div>
          </div>

         
          <div>
            <h3 className="font-semibold mb-4 text-xl">Services</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Plumbers</li>
              <li>Electricians</li>
              <li>Cleaners</li>
              <li>Painters</li>
              <li>Handymen</li>
            </ul>
          </div>

         
          <div>
            <h3 className="font-semibold mb-4 text-xl">Company</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>About Us</li>
              <li>Become a Provider</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          
          <div>
            <h3 className="font-semibold mb-4 text-xl">Contact Us</h3>
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
              <CiLocationOn />
              <p>Kigali, Rwanda</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
              <LuPhone />
              <p>+250 788 123 456</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CgMail />
              <p>gofixandclean@gmail.com</p>
            </div>
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
}

export default Footer;
