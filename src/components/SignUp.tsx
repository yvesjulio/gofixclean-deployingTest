import { useState, FormEvent, ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    return email.includes('@');
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 5;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email must contain @ symbol";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 5 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

   
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleBlur = (fieldName: string): void => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    
    const allTouched: Record<string, boolean> = {
      email: true,
      password: true,
      confirmPassword: true
    };
    setTouched(allTouched);
    
    if (validateForm()) {
      navigate("/provider-verifications");
    }
  };

  return (
    <section className="flex flex-col md:flex-row min-h-[calc(100vh-0.5px)] overflow-hidden">

     
      <div className="w-full md:flex-1 relative h-62.5 md:h-auto overflow-hidden">
        <img
          src="/images/Image2.png"
          alt="GoFix&Clean"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-4 right-8 flex items-center gap-2 text-white font-medium px-4 py-0.5 rounded-full border border-gray-400 hover:border-brandOrange hover:text-brandOrange transition-colors text-sm"
        >
          Back
        </button>
      </div>
      <div className="flex-1 bg-[#EAEFEE] text-gray-700 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md flex flex-col gap-2">

          <div className="flex justify-center mt-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-brandText">
              GoFix<span className="text-brandOrange">&</span>Clean
            </h1>
          </div>

          <div className="text-center mt-2">
            <h2 className="text-2xl md:text-xl font-bold text-[#696969]">
              Create Account
            </h2>
            <p className="text-gray-500 mt-1 text-xs">
              Sign up to get started with GoFix&Clean
            </p>
          </div>
          
          <form className="flex flex-col gap-3 w-full pt-2" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder="you@example.com"
                className={`w-full px-3 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText transition text-sm ${
                  touched.email && errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="password"
                  className={`w-full px-3 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText transition pr-10 text-sm ${
                    touched.password && errors.password ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 flex items-center justify-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur('confirmPassword')}
                placeholder="confirm password"
                className={`w-full px-3 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText transition text-sm ${
                  touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <p
              className="text-xs text-brandText hover:underline cursor-pointer text-right"
              onClick={() => navigate("/resetpassword")} 
            >
              Forgot password?
            </p>

            <button
              type="submit"
              className="bg-brandText text-white px-4 py-2 rounded-lg font-medium shadow-sm mt-1
                         relative overflow-hidden transition-colors duration-200 hover:bg-opacity-90 text-sm"
            >
              <span className="relative z-10">Sign Up</span>
            </button>
          </form>

          <div className="flex flex-col gap-1 w-full mt-1">
            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 border-t border-gray-300"></div>
              <p className="text-xs whitespace-nowrap font-medium">OR CONTINUE WITH</p>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button 
              type="button"
              className="flex items-center justify-center gap-2 w-full px-2 py-1.5 border border-gray-300 rounded-lg hover:shadow-md transition text-gray-900 font-medium text-sm"
              onClick={() => navigate("/provider-verifications")}
            >
              <FcGoogle className="text-xl" />
              <span>Google</span>
            </button>

            <p className="text-xs text-center text-gray-600 mt-1">
              Already have an account?{" "}
              <NavLink
                to="/signin"
                className="text-brandText font-medium hover:underline"
              >
                Sign In
              </NavLink>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SignUp;