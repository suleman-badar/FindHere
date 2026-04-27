import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logoImg.png';
import api from '../api/axios';
import { signInValidations } from '../validations/signInValidations';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInValidations.validate(
        { email, password },
        { abortEarly: false }
      );

      setErrors({});
      setLoading(true);

      const res = await api.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true, timeout: 5000 }
      );

      if (res.data.success) {
        login(res.data.user);
        toast.success("Welcome to FindHere");

        setEmail("");
        setPassword("");

        navigate("/admin/dashboard");
      }

    } catch (e) {
      if (e.name === "ValidationError") {
        const validationErrors = {};
        e.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);

      } else if (e.response) {
        const { message, email } = e.response.data;

        if (message?.includes("Email not verified")) {
          navigate("/verify-otp", { state: { email } });
        } else {
          setErrors({ api: message || "Something went wrong" });
        }

      } else {
        setErrors({ api: "Network error. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen w-full flex" style={{ fontFamily: 'Roboto, sans-serif' }}>

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1771574205963-0c1d84ac7354?fit=max&w=1080')`
          }}
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex flex-col justify-between p-10 text-white w-full">
          
          {/* Top */}
          <div className="flex items-center justify-between">
            <img src={Logo} className="h-20 w-auto invert brightness-0" />

            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
          </div>

          {/* Center */}
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
            <p className="text-lg text-white/90">
              Manage your listings and explore amazing places with ease.
            </p>
          </div>

          {/* Bottom */}
          <div className="flex space-x-8">
            <div>
              <p className="text-3xl font-bold">2,500+</p>
              <p className="text-white/80 text-sm">Active Listings</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-white/80 text-sm">Happy Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-2">
              Sign In
            </h2>
            <p className="text-[#6b7280]">
              Enter your credentials to continue
            </p>
          </div>

          {/* API Error */}
          {errors.api && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <p className="text-sm text-red-600">{errors.api}</p>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-[#0f172a] mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border-2 rounded-xl border-[#e9e5e5] focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/20 outline-none"
                  style={{ background: '#fff6f5' }}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-[#0f172a] mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border-2 rounded-xl border-[#e9e5e5] focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/20 outline-none"
                  style={{ background: '#fff6f5' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Links */}
            <div className="flex justify-between text-sm">
              <Link to="/send-fp-code" className="text-[#6b7280] hover:text-[#b91c1c]">
                Forgot Password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold"
              style={{ background: 'linear-gradient(90deg, #9d1717, #b91c1c)' }}
            >
              Sign In
            </button>
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e9e5e5]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#6b7280]">OR</span>
              </div>
            </div>

            {/* Signup */}
            <div className="text-center">
              <p className="text-[#6b7280] text-sm">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-[#ff7043] hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}