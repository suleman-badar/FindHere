import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import Loader from "../components/Loader";
import { signUpValidations } from "../validations/signUpValidations";
import Logo from "../assets/logoImg.png";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError("");

    try {
      // ✅ Validation
      await signUpValidations.validate(
        {
          name: fullName,
          email,
          password,
          confirmPassword,
        },
        { abortEarly: false }
      );

      setIsLoading(true);

      // ✅ API Call
      const res = await api.post(
        "/api/auth/register",
        {
          name: fullName,
          email,
          password,
        },
        { timeout: 5000 }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Account created successfully");

        // save email for OTP page
        localStorage.setItem("pendingEmail", email);

        // reset
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // redirect
        navigate(`/verify-otp/${email}`);
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (e) {
      const validationErrors = {};

      if (e.name === "ValidationError") {
        e.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      } else if (e.response?.data) {
        validationErrors.api =
          e.response.data.message ||
          e.response.data.error ||
          "Signup failed";
      } else {
        validationErrors.api = "Network error. Try again.";
      }

      setErrors(validationErrors);
      setApiError(validationErrors.api);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen w-full flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1755811248279-1ab13b7d4384?auto=format&fit=crop&w=1080&q=80')`,
          }}
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* TOP */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              
                          <img src={Logo} className="h-20 w-auto invert brightness-0" />
              
            </div>

            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
          </div>

          {/* CENTER */}
          <div>
            <h1 className="text-5xl font-bold mb-4">Join FindHere</h1>
            <p className="text-white/90">
              Create your account and explore amazing places.
            </p>
          </div>

          {/* STATS */}
          <div className="flex space-x-8">
            <div>
              <p className="text-3xl font-bold">2,500+</p>
              <p className="text-sm text-white/80">Listings</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-sm text-white/80">Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">

          {/* HEADER */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-2">
              Create Account
            </h2>
            <p className="text-[#6b7280]">
              Fill in your details to get started
            </p>
          </div>

          {/* ERROR */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-2">
              <AlertCircle className="text-red-600" />
              <p className="text-sm text-red-600">{apiError}</p>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 py-3 border-2 rounded-xl bg-[#fff6f5]"
                />
              </div>
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 py-3 border-2 rounded-xl bg-[#fff6f5]"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border-2 rounded-xl bg-[#fff6f5]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="w-full pl-12 pr-12 py-3 border-2 rounded-xl bg-[#fff6f5]"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold"
              style={{
                background:
                  "linear-gradient(90deg, #9d1717, #b91c1c)",
              }}
            >
              Sign Up
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#b91c1c] font-semibold"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}