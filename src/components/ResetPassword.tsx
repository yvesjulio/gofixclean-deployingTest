import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    alert("Reset instructions sent!");
  };

  return (
    <section className="flex flex-col md:flex-row h-screen overflow-hidden">

      <div className="flex-1 bg-[#EAEFEE] text-gray-700 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md flex flex-col gap-6">

        
          <div className="flex justify-center mt-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-brandText">
              GoFix<span className="text-brandOrange">&</span>Clean
            </h1>
          </div>

        
          <div className="text-center mt-8">
            <h2 className="text-3xl md:text-2xl font-bold text-[#696969]">
              Forgot your Password?
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              No worries, we'll send you reset instructions.
            </p>
          </div>

      
          <form className="flex flex-col gap-6 w-full pt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border bg-white border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandText transition"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-brandText text-white px-4 py-3 rounded-xl font-medium shadow-md mt-2
                         relative overflow-hidden transition-colors duration-200"
            >
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 rounded-xl transition-opacity duration-200"></span>
              <span className="relative z-10">Reset Password</span>
            </button>
          </form>

    
          <p className="text-center text-sm text-gray-500 mt-2">
            Already have an account?{" "}
            <span
              className="text-brandText hover:underline cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>

     
      <div className="flex-1 relative overflow-hidden">
        <img
          src="/images/Image3.png"
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

export default ResetPassword;