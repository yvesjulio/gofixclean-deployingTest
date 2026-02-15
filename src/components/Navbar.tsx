import { useState } from "react";
import { NavLink } from "react-router-dom";
import { TfiWorld } from "react-icons/tfi";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-brandOrange font-semibold"
      : "text-brandText hover:text-brandOrange transition";

  return (
    <>
    
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 h-16 bg-white shadow-md">
        
       
        <NavLink to="/">
          <img
            src="/images/logo.png"
            alt="GoFix&Clean Logo"
            className="h-7 cursor-pointer"
          />
        </NavLink>

       
        <div className="hidden md:flex items-center gap-10 font-medium">
          <NavLink to="/services" className={linkClass}>
            Find a service
          </NavLink>

          <NavLink to="/become-provider" className={linkClass}>
            Become a provider
          </NavLink>
        </div>

       
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm px-3 py-2 hover:text-white rounded-xl hover:bg-brandOrange cursor-pointer">
            <TfiWorld className="text-sm" />
            <span>ENG</span>
          </div>

          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive
                ? "text-brandOrange px-3 py-2 rounded-xl font-semibold"
                : "px-3 py-2 rounded-xl hover:bg-brandOrange hover:text-white transition"
            }
          >
            Sign in
          </NavLink>

          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive
                ? "bg-brandOrange text-white px-4 py-2 rounded-md"
                : "bg-brandText text-white px-4 py-2 rounded-md transition-all duration-300 ease-out hover:scale-[1.02]"
            }
          >
            Sign Up
          </NavLink>
        </div>

       
        <div className="md:hidden text-brandText">
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
        <div className="px-6 py-6 text-brandText space-y-6">
          
          <div className="flex items-center gap-2 font-medium">
            <TfiWorld className="text-lg" />
            <span>ENG</span>
          </div>

          <hr />

          <div className="flex flex-col gap-4 text-base">
            <NavLink
              to="/services"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Find a service
            </NavLink>

            <NavLink
              to="/become-provider"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Become a provider
            </NavLink>

            <NavLink
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Sign in
            </NavLink>
          </div>

          <NavLink
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="w-full bg-brandText text-white py-3 rounded-md font-medium text-center block"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Navbar;
