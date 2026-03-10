import { useState, FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] overflow-hidden">

      <div className="flex-1 bg-[#EAEFEE] text-gray-700 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md flex flex-col gap-4">

          <div className="flex justify-center mt-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-brandText">
              GoFix<span className="text-brandOrange">&</span>Clean
            </h1>
          </div>

          <div className="text-center mt-8">
            <h2 className="text-3xl md:text-2xl font-bold text-[#696969]">
              Welcome Back
            </h2>
            <p className=" text-gray-500 mt-2 text-sm">
              Sign in to access your account
            </p>
          </div>

          <form className="flex flex-col gap-6 w-full pt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border bg-white border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandText transition"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="w-full px-4 py-3 border bg-white border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandText transition pr-12"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 flex items-center justify-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            <p
              className="text-sm text-brandText hover:underline cursor-pointer text-right"
              onClick={() => navigate("/resetpassword")}
            >
              Forgot password?
            </p>

            <button
              type="submit"
              className="bg-brandText text-white px-4 py-3 rounded-xl font-medium shadow-md mt-2
                         relative overflow-hidden transition-colors duration-200"
            >
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 rounded-xl transition-opacity duration-200"></span>
              <span className="relative z-10">Sign In</span>
            </button>
          </form>

          <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-gray-300"></div>
              <p className="text-sm whitespace-nowrap font-medium">
                OR CONTINUE WITH
              </p>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button className="flex items-center justify-center gap-3 w-full px-3 py-2 border border-gray-300 rounded-xl hover:shadow-md transition text-gray-900 font-medium">
              <FcGoogle className="text-3xl" />
              <span>Google</span>
            </button>

            <p className="text-sm text-center text-gray-600">
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

      <div className="flex-1 relative overflow-hidden">
        <img
          src="/images/image.png"
          alt="GoFix&Clean"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-6 left-16 flex items-center gap-2 text-white font-medium px-6 py-1 rounded-full border border-gray-400 hover:border-brandOrange hover:text-brandOrange transition-colors"
        >
          Back
        </button>
      </div>

    </section>
  );
};

export default SignIn;