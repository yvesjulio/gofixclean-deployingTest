import { useState, FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate("/dashboard");
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
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2 md:mt-1 text-sm md:text-xs">
              Sign in to access your account
            </p>
          </div>

          <form className="flex flex-col gap-4 md:gap-3 w-full pt-4 md:pt-2" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-sm md:text-xs font-medium mb-1.5 md:mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 md:px-3 md:py-2 border bg-white border-gray-200 rounded-xl md:rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText transition text-base md:text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm md:text-xs font-medium mb-1.5 md:mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="w-full px-4 py-3 md:px-3 md:py-2 border bg-white border-gray-200 rounded-xl md:rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText transition pr-12 md:pr-10 text-base md:text-sm"
                />
                <button
                  type="button"
                  className="absolute right-3 md:right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 flex items-center justify-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} className="md:w-4.5 md:h-4.5" />
                  ) : (
                    <AiOutlineEye size={22} className="md:w-4.5 md:h-4.5" />
                  )}
                </button>
              </div>
            </div>

            <p
              className="text-sm md:text-xs text-brandText hover:underline cursor-pointer text-right mt-1"
              onClick={() => navigate("/resetpassword")}
            >
              Forgot password?
            </p>

            <button
              type="submit"
              className="bg-brandText text-white px-4 py-3 md:py-2 rounded-xl md:rounded-lg font-medium shadow-md md:shadow-sm mt-3 md:mt-1
                         relative overflow-hidden transition-colors duration-200 text-base md:text-sm"
            >
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 rounded-xl md:rounded-lg transition-opacity duration-200"></span>
              <span className="relative z-10">Sign In</span>
            </button>
          </form>

          <div className="flex flex-col gap-4 md:gap-2 w-full mt-2">
            <div className="flex items-center gap-3 md:gap-2 my-6 md:my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <p className="text-sm md:text-xs whitespace-nowrap font-medium">
                OR CONTINUE WITH
              </p>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button 
              className="flex items-center justify-center gap-3 md:gap-2 w-full px-4 py-3 md:px-2 md:py-1.5 border border-gray-300 rounded-xl md:rounded-lg hover:shadow-md transition text-gray-900 font-medium text-base md:text-sm"
              onClick={() => navigate("/services")}
            >
              <FcGoogle className="text-2xl md:text-xl" />
              <span>Google</span>
            </button>

            <p className="text-sm md:text-xs text-center text-gray-600 mt-2">
              Don't have an account?{" "}
              <NavLink
                to="/signup"
                className="text-brandText font-medium hover:underline"
              >
                SignUp
              </NavLink>
            </p>
          </div>

        </div>
      </div>

      
      <div className="w-full md:flex-1 relative h-70 sm:h-87.5 md:h-auto order-1 md:order-2">
        <img
          src="/images/image.png"
          alt="GoFix&Clean"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 md:top-4 md:right-8 text-white hover:text-brandOrange transition-colors"
        >
          < FaArrowRightLong size={24} />
        </button>
      </div>

    </section>
  );
};

export default SignIn;