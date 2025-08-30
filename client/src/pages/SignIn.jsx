import { Box } from "@mui/material";
import Btn from "../components/Btn";
import LoginImg from "../assets/LoginImg.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import { signInValidations } from "../validations/signInValidations";
import axios from "axios";
import PasswordInput from "../components/PasswordInput";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";


export default function SignIn() {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            await signInValidations.validate(
                { email, password },
                { abortEarly: false }
            );

            setErrors({});
            setLoading(true);

            const res = await axios.post(
                "http://localhost:8000/api/auth/login",
                { email, password },
                { withCredentials: true },
                { timeout: 5000 }
            );
            if (res.data.success) {
                login(res.data.user);
                setEmail("");
                setPassword("");
                toast.success("Welcome to FindHere");
                navigate("admin/dashboard");
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
                    // Redirect to OTP page with email
                    navigate("/verify-otp", { state: { email } });
                } else {
                    setErrors({ api: message || "Something went wrong" });
                }
            } else {
                setErrors({ api: "Network error. Please try again." });
            }
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <Box className="flex items-center justify-center min-h-screen relative overflow-hidden">
            {/* 🔥 Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-x" />

            {/* Decorative blur blobs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl" />

            {/* Glassmorphic Card */}
            <Box className="relative z-10 flex flex-col md:flex-row mx-2 bg-white/20 backdrop-blur-2xl border border-white/30 w-full max-w-4xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.2)] overflow-hidden">

                {/* Left Panel */}
                {/* Left Panel */}
                <Box className="hidden md:flex md:w-1/2 relative">
                    <img
                        src={LoginImg}
                        alt="Login"
                        className="w-full h-full object-cover"
                    />
                    <Box className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                        <h2 className="text-4xl font-extrabold tracking-tight drop-shadow-lg">Welcome Back</h2>
                        <p className="text-sm mt-3 opacity-90 leading-relaxed">
                            Access your personal dashboard, manage listings, and explore amazing places.
                        </p>

                        {/* Back to Home Button on Image */}
                        <Link
                            to="/"
                            className="mt-4 inline-block rounded-xl py-2 px-4 text-sm text-white/80 border border-white/40 hover:bg-white/10 transition self-start"
                        >
                            ← Back to Home
                        </Link>
                    </Box>
                </Box>


                {/* Right Panel */}
                <Box className="flex flex-col items-center justify-center px-10 py-14 w-full md:w-1/2">
                    <h3 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Sign In</h3>
                    <p className="text-gray-100/80 text-sm mb-8 tracking-wide">
                        Enter your credentials to unlock your account
                    </p>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                        className="flex flex-col items-center w-full max-w-sm"
                    >
                        {/* Email Input */}
                        <input
                            type="email"
                            placeholder="Email"
                            className="h-12 w-full rounded-xl border border-white/40 bg-white/20 px-4 mb-3 text-white placeholder-gray-200 focus:ring-2 focus:ring-pink-300 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-300 text-xs -mt-2 mb-2 self-start">{errors.email}</p>
                        )}

                        {/* Password Input */}
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="h-12 w-full rounded-xl border border-white/40 bg-white/20 px-4 text-white placeholder-gray-200 focus:ring-2 focus:ring-pink-300 focus:outline-none"
                        />
                        {errors.password && (
                            <p className="text-red-300 text-xs -mt-2 mb-2 self-start">{errors.password}</p>
                        )}

                        {errors.api && (
                            <p className="text-red-300 text-xs mt-1 mb-2">{errors.api}</p>
                        )}

                        {/* Sign In Button */}
                        <Btn
                            text="Sign In"
                            type="submit"
                            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-xl py-3 shadow-lg hover:opacity-90 transition"
                        />
                    </form>

                    {/* Divider */}
                    <div className="flex items-center w-full my-6">
                        <span className="flex-grow h-px bg-white/30" />
                        <span className="px-3 text-white/60 text-xs">OR</span>
                        <span className="flex-grow h-px bg-white/30" />
                    </div>

                    {/* Signup Link */}
                    <Box className="flex gap-1 text-sm mt-2">
                        <p className="text-gray-200">Don’t have an account?</p>
                        <Link
                            to="/signup"
                            className="text-pink-300 font-semibold hover:underline"
                        >
                            Create Account
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
