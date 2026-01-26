import { useState } from "react";
import { TfiWorld } from "react-icons/tfi";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 py-4  bg-white">
        
       
        <img
          src="/images/logo.png"
          alt="GoFix&Clean Logo"
          className="h-7"
        />

      
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
            <span>ENG</span>
          </div>

          <p className="cursor-pointer hover:text-[#FF6B35] transition">
            Sign in
          </p>

          <button className="bg-[#025E4C] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition">
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

      
      {menuOpen && (
        <div className="md:hidden bg-white px-6 py-6 text-[#025E4C]  space-y-6">
          <div className="flex items-center gap-2 font-medium">
            <TfiWorld className="text-lg" />
            <span>ENG</span>
          </div>
          <hr />


          <div className="flex flex-col gap-4 text-base">
            <p className="cursor-pointer">Find a service</p>
            <p className="cursor-pointer">Become a provider</p>
            <p className="cursor-pointer text-black">Sign in</p>
          </div>

          {/* Button */}
          <button className="w-full bg-[#025E4C] text-white py-3 rounded-md font-medium">
            Sign Up
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;
