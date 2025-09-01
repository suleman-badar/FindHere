import { Box, Button } from "@mui/material";
import Btn from "../components/Btn";
import LoginImg from "../assets/LoginImg.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import { signUpValidations } from "../validations/signUpValidations";
import axios from "axios";
import PasswordInput from "../components/PasswordInput";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { toast } from "react-toastify";

export default function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSignup = async () => {
        try {
            await signUpValidations.validate(
                { name, email, password, confirmPassword },
                { abortEarly: false }
            );
            setErrors({});
            setLoading(true);

            const res = await axios.post(
                "http://localhost:8000/api/auth/register",
                { name, email, password },
                { timeout: 5000 }
            );

            if (res.data.success) {
                toast.success(res.data.message || "Account created successfully");

                // save email in localStorage or context so VerifyOtp can use it
                localStorage.setItem("pendingEmail", email);

                setName(""); setEmail(""); setPassword(""); setConfirmPassword("");

                navigate(`/verify-otp/${email}`);
            } else {
                toast.error(res.data.message || "Signup failed. Try again.");
            }
        } catch (e) {
            const validationErrors = {};

            if (e.name === "ValidationError") {
                e.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
            } else if (e.response && e.response.data) {
                validationErrors.api =
                    e.response.data.message || e.response.data.error || "Signup failed. Try again.";
            }
            else if (e.response?.data?.errors) {
                Object.keys(e.response.data.errors).forEach(key => {
                    validationErrors[key] = e.response.data.errors[key];
                });
            }
            else if (e.response?.data?.message) {
                validationErrors.api = e.response.data.message;
            }
            else {
                validationErrors.api = "Signup failed. Try again.";
            }

            setErrors(validationErrors);
        } finally {
            setLoading(false);
        }
    };



    if (loading) return <Loader />;

    return (
        <Box className="flex items-center justify-center h-screen relative overflow-hidden px-4">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-x" />
            <div className="absolute top-20 left-20 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl" />

            {/* Card */}
            <Box className="relative z-10 flex flex-col md:flex-row 
                      bg-white/20 backdrop-blur-2xl border border-white/30 
                      w-full max-w-3xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] 
                      overflow-hidden mx-2">
                {/* Left Panel */}
                <Box className="hidden md:flex md:w-1/2 relative">
                    <img src={LoginImg} alt="Signup" className="w-full h-full object-cover" />
                    <Box className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                        <h2 className="text-3xl font-extrabold drop-shadow-lg">Join Us Today</h2>
                        <p className="text-sm mt-2 opacity-90 leading-relaxed">
                            Create your account to start managing your listings and exploring new opportunities.
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
                <Box className="flex flex-col items-center justify-center px-6 py-8 w-full md:w-1/2">
                    <h3 className="text-3xl font-extrabold text-white mb-1 drop-shadow-lg">Sign Up</h3>
                    <p className="text-gray-100/80 text-sm mb-6 tracking-wide">
                        Fill in the details below to create your account
                    </p>

                    <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}
                        className="flex flex-col items-center w-full max-w-sm">
                        {/* Name */}
                        <input type="text" placeholder="Full Name"
                            className="h-12 w-full rounded-xl border border-white/40 bg-white/20 px-4 mb-3 text-white placeholder-gray-200 focus:ring-2 focus:ring-pink-300 focus:outline-none"
                            value={name} onChange={(e) => setName(e.target.value)} />
                        {errors.name && <p className="text-red-300 text-xs -mt-2 mb-2 self-start">{errors.name}</p>}

                        {/* Email */}
                        <input type="email" placeholder="Email"
                            className="h-12 w-full rounded-xl border border-white/40 bg-white/20 px-4 mb-3 text-white placeholder-gray-200 focus:ring-2 focus:ring-pink-300 focus:outline-none"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <p className="text-red-300 text-xs -mt-2 mb-2 self-start">{errors.email}</p>}

                        {/* Password */}
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="h-12 w-full rounded-xl border border-white/40 bg-white/20 px-4 text-white placeholder-gray-200 focus:ring-2 focus:ring-pink-300 focus:outline-none" />
                        {errors.password && <p className="text-red-300 text-xs -mt-2 mb-2 self-start">{errors.password}</p>}

                        {/* Confirm Password */}
                        <PasswordInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="h-12 w-full rounded-xl border border-white/40 bg-white/20 px-4 text-white placeholder-gray-200 focus:ring-2 focus:ring-pink-300 focus:outline-none" />
                        {errors.confirmPassword && <p className="text-red-300 text-xs -mt-2 mb-2 self-start">{errors.confirmPassword}</p>}

                        {errors.api && <p className="text-red-300 text-xs mt-1 mb-2">{errors.api}</p>}

                        {/* Signup Button */}
                        <Btn text="Sign Up" type="submit"
                            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-xl py-3 shadow-lg hover:opacity-90 transition" />


                    </form>

                    {/* Divider */}
                    <div className="flex items-center w-full my-4">
                        <span className="flex-grow h-px bg-white/30" />
                        <span className="px-3 text-white/60 text-xs">OR</span>
                        <span className="flex-grow h-px bg-white/30" />
                    </div>

                    {/* Social Login Buttons */}
                    <Button variant="outlined" startIcon={<GoogleIcon />}
                        sx={{
                            width: "80%", maxWidth: "280px", mb: 2,
                            color: "#082567", borderColor: "#000d1a",
                            borderRadius: "8px", textTransform: "none",
                            "&:hover": { backgroundColor: "#082567", color: "white", boxShadow: 3 }
                        }}>
                        Sign Up with Google
                    </Button>

                    <Btn text="Sign Up with Apple" IconStart={AppleIcon} className="w-80 max-w-sm mb-2" />

                    {/* Sign In Link */}
                    <Box className="flex gap-1 text-sm mt-3">
                        <p className="text-gray-200">Already have an account?</p>
                        <Link to="/signin" className="text-pink-300 font-semibold hover:underline">Sign In</Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
