import { useState } from "react";
import { NavLink } from "react-router-dom";
import { TfiWorld } from "react-icons/tfi";
import { HiMenu, HiX } from "react-icons/hi";

interface LinkClassProps {
  isActive: boolean;
}

type Language = {
  code: string;
  flag: string;
  name: string;
  nativeName: string;
};

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [languageOpen, setLanguageOpen] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    code: "US",
    flag: "🇺🇸",
    name: "English",
    nativeName: "English"
  });

  const languages: Language[] = [
    { code: "US", flag: "🇺🇸", name: "English", nativeName: "English" },
    { code: "FR", flag: "🇫🇷", name: "Français", nativeName: "Français" },
    { code: "RW", flag: "🇷🇼", name: "Kinyarwanda", nativeName: "Kinyarwanda" }
  ];

  const linkClass = ({ isActive }: LinkClassProps): string =>
    isActive
      ? "text-brandOrange font-semibold"
      : "text-brandText hover:text-brandOrange transition";

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    setLanguageOpen(false);
    console.log(`Language changed to: ${language.name}`);
  };

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
         
          <div className="relative">
            <div
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl hover:bg-brandOrange hover:text-white cursor-pointer transition-colors"
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              <TfiWorld className="text-sm" />
              <span>{currentLanguage.code}</span>
            </div>

            {languageOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLanguageOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`w-full flex items-center gap-3 px-3 py-1.5 transition-colors rounded-md ${
                        currentLanguage.code === lang.code
                          ? "text-brandOrange font-medium hover:bg-brandOrange hover:text-white"
                          : "text-gray-700 hover:bg-brandOrange hover:text-white"
                      }`}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      <span className="text-sm w-5 text-center">{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <NavLink
            to="/signin"
            className={({ isActive }: LinkClassProps) =>
              isActive
                ? "text-brandOrange px-3 py-2 rounded-xl font-semibold"
                : "px-3 py-2 rounded-xl hover:bg-brandOrange hover:text-white transition"
            }
          >
            Sign in
          </NavLink>

          <NavLink
            to="/signup"
            className={({ isActive }: LinkClassProps) =>
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
          
          <div className="space-y-3">
            <div
              className="flex items-center justify-between gap-2 font-medium cursor-pointer"
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              <div className="flex items-center gap-2">
                <TfiWorld className="text-lg" />
                <span>{currentLanguage.code}</span>
              </div>
              <span className="text-xs">{languageOpen ? "▲" : "▼"}</span>
            </div>

            {languageOpen && (
              <div className="space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`w-full flex items-center gap-3 py-2 px-3 rounded-md transition-colors ${
                      currentLanguage.code === lang.code
                        ? "bg-brandOrange text-white"
                        : "hover:bg-brandOrange hover:text-white"
                    }`}
                    onClick={() => {
                      handleLanguageChange(lang);
                      setMenuOpen(false);
                    }}
                  >
                    <span className="text-base w-6 text-center">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
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
};

export default Navbar;