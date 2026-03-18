import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    alert("Reset instructions sent!");
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      <div className="w-full md:flex-1 bg-[#EAEFEE] text-gray-700 flex items-center justify-center p-6 md:p-8 min-h-screen md:min-h-0 order-2 md:order-1">
        <div className="w-full max-w-md flex flex-col gap-4 md:gap-2">

          <div className="flex justify-center mt-4 md:mt-2">
            <h1 className="text-3xl md:text-3xl font-extrabold text-brandText">
              GoFix<span className="text-brandOrange">&</span>Clean
            </h1>
          </div>

          <div className="text-center mt-4 md:mt-2">
            <h2 className="text-2xl md:text-2xl font-bold text-[#696969]">
              Forgot your Password?
            </h2>
            <p className="text-gray-500 mt-2 md:mt-1 text-sm md:text-xs">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          <form className="flex flex-col gap-4 md:gap-3 w-full pt-4 md:pt-2" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-sm md:text-xs font-medium mb-1.5 md:mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 md:px-3 md:py-2 border bg-white border-gray-200 rounded-xl md:rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText transition text-base md:text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-brandText text-white px-4 py-3 md:py-2 rounded-xl md:rounded-lg font-medium shadow-md md:shadow-sm mt-3 md:mt-1
                         relative overflow-hidden transition-colors duration-200 text-base md:text-sm"
            >
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 rounded-xl md:rounded-lg transition-opacity duration-200"></span>
              <span className="relative z-10">Reset Password</span>
            </button>
          </form>

          <p className="text-center text-sm md:text-xs text-gray-500 mt-2">
            Already have an account?{" "}
            <span
              className="text-brandText hover:underline cursor-pointer font-medium"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
      <div className="w-full md:flex-1 relative h-70 sm:h-87.5 md:h-auto order-1 md:order-2">
        <img
          src="/images/Image3.png"
          alt="GoFix&Clean"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 md:top-4 md:left-8 text-white hover:text-brandOrange transition-colors"
        >
          <MdKeyboardBackspace size={24} />
        </button>
      </div>
    </section>
  );
};

export default ResetPassword;