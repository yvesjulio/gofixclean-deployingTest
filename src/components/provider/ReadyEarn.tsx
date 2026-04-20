import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

function ReadyEarn() {
  const handleNavClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-6 md:px-12 py-20 bg-[#444444]">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <h3 className="text-3xl md:text-3xl font-bold text-white">
          Ready to Start Earning?
        </h3>

        <p className="text-[#C5C5C5] ">
          Join our community of skilled professionals and start connecting with clients today.
        </p>

        <NavLink to="/provider/verification" onClick={handleNavClick}>
          <button className="flex items-center gap-2 bg-brandOrange text-brandWhite px-6 py-3 rounded-md transition-all duration-300 ease-out hover:bg-[#e05e2e] hover:scale-[1.03] cursor-pointer">
            <span>Get Started</span>
            <FaArrowRight />
          </button>
        </NavLink>
      </div>
    </section>
  );
}

export default ReadyEarn;
