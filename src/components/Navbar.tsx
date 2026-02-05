import { useState } from "react";
import { TfiWorld } from "react-icons/tfi";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
     
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 h-16 bg-white shadow-md">
        
        <img src="/images/logo.png" alt="GoFix&Clean Logo" className="h-7" />
        <div className="hidden md:flex items-center gap-10 text-[#025E4C] font-medium">
          <p className="cursor-pointer hover:text-[#FF6B35] transition">
            Find a service
          </p>
          <p className="cursor-pointer hover:text-[#FF6B35] transition">
            Become a provider
          </p>
        </div>

      
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <TfiWorld className="text-lg" />
            <span className="hover:text-[#FF6B35]">ENG</span>
          </div>

          <p className="cursor-pointer hover:text-[#FF6B35] transition">
            Sign in
          </p>

          <button className="bg-[#025E4C] text-white px-4 py-2 rounded-md transition-all duration-300 ease-out hover:bg-[#064136] hover:scale-[1.02]">
            Sign Up
          </button>
        </div>

       
        <div className="md:hidden text-[#025E4C]">
          {menuOpen ? (
            <HiX
              className="text-2xl cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <HiMenu
              className="text-2xl cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </nav>

     
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-white z-40 transition-transform duration-300 shadow-lg ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-6 py-6 text-[#025E4C] space-y-6">
          <div className="flex items-center gap-2 font-medium">
            <TfiWorld className="text-lg" />
            <span>ENG</span>
          </div>

          <hr />

          <div className="flex flex-col gap-4 text-base">
            <p className="cursor-pointer transition active:text-[#FF6B35] active:scale-[1.02]">
              Find a service
            </p>
            <p className="cursor-pointer transition active:text-[#FF6B35] active:scale-[1.02]">
              Become a provider
            </p>
            <p className="cursor-pointer text-black transition active:text-[#FF6B35] active:scale-[1.02]">
              Sign in
            </p>
          </div>

          <button className="w-full bg-[#025E4C] text-white py-3 rounded-md font-medium transition-all duration-200 ease-out active:bg-[#064136] active:scale-[1.02]">
            Sign Up
          </button>
        </div>
      </div>

     
      <div className="h-16 md:h-16" />
    </>
  );
}

export default Navbar;
