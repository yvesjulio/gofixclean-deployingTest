import { FaArrowRight } from "react-icons/fa6";

function Ready() {
  return (
    <section className="px-6 md:px-12 py-20 bg-[#444444]">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">

        <h3 className="text-3xl md:text-3xl font-bold text-white">
          Ready to Start Earning?
        </h3>

       
        <p className="text-[#C5C5C5] ">
          Join our community of skilled professionals and start connecting with clients today.
        </p>

       
        <button className="flex items-center gap-2 bg-brandOrange text-brandWhite px-6 py-3 rounded-md transition-all duration-300 ease-out hover:bg-[#e05e2e] hover:scale-[1.03]">
              <span>Sign Up now</span>
              <FaArrowRight />
              </button>

      </div>
    </section>
  );
}

export default Ready;