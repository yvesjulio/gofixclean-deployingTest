import { SlSocialFacebook } from "react-icons/sl";
import { LuLinkedin, LuPhone } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { CgMail } from "react-icons/cg";

function Footer() {
  return (
    <>
  
      <a
        href="https://wa.me/250791692126" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-[#25D366] rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
      >
        <img src="/images/whatsapp.png" alt="WhatsApp" className="h-8 w-8" />
      </a>

    
      <footer className="bg-[#3E3E3E] text-white px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">
              GoFix<span className="text-[#FF6B35]">&</span>Clean
            </h2>
            <p className="text-sm text-[#C5C5C5] leading-relaxed mb-4">
              Connecting households with trusted service providers. Quality services at your fingertips.
            </p>
            <div className="flex gap-3">
              <div className="p-3 bg-[#696969] rounded-full transition cursor-pointer">
                <SlSocialFacebook />
              </div>
              <div className="p-3 rounded hover:bg-[#696969] transition cursor-pointer">
                <LuLinkedin />
              </div>
              <div className="p-3 rounded hover:bg-[#696969] transition cursor-pointer">
                <SlSocialFacebook />
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
