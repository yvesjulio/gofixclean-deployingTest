import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

interface LinkClassProps {
  isActive: boolean;
}

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const linkClass = ({ isActive }: LinkClassProps): string =>
    isActive
      ? "text-brandOrange font-semibold"
      : "text-brandText hover:text-brandOrange transition";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 h-16 bg-white shadow-sm">
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
          <a
            href="https://api.whatsapp.com/send/?phone=250780816439&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brandOrange text-white px-4 py-2 rounded-md transition-all duration-300 ease-out hover:bg-brandText hover:scale-[1.02]"
          >
            Contact Us
          </a>
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
          </div>

          <a
            href="https://api.whatsapp.com/send/?phone=250780816439&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-brandOrange text-white px-4 py-3 rounded-md transition-all duration-300 ease-out hover:bg-brandText hover:scale-[1.02]"
          >
            Contact Us
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
