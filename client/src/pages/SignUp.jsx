import { Box, Button, Divider } from "@mui/material";
import LoginImg from "../assets/LoginImg.png";
import Btn from "../components/Btn";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import axios from "axios";
import Loader from "../components/Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpValidations } from "../validations/signUpValidations";

export default function SignIn() {
    const [errors, setErrors] = useState({});

    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            // validate with Yup
            await signUpValidations.validate({ name, email, password }, { abortEarly: false });
            setErrors({}); // clear errors before submit

            setLoading(true);

            await axios.post(
                "http://localhost:8000/api/auth/register",
                { name, email, password },
                { timeout: 5000 }
            );

            // reset form
            setName("");
            setEmail("");
            setPassword("");
            navigate("/signIn");
        } catch (e) {
            const validationErrors = {};

            if (e.name === "ValidationError") {
                e.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
            }

            if (e.response?.status === 400) {
                validationErrors.email = "Email already exists";
            }

            setErrors(validationErrors);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <Box className="flex justify-center items-center bg-blue-100 min-h-screen p-4">
            {/* Outer Card */}
            <Box className="flex flex-col md:flex-row bg-white w-full max-w-5xl rounded-lg shadow-lg overflow-hidden">
                {/* Left Image Section */}
                <Box className="relative hidden md:block md:w-1/2">
                    <img
                        src={LoginImg}
                        alt="Login"
                        className="w-full h-full object-cover"
                    />
                    <Box className="absolute inset-0 flex flex-col justify-center items-start bg-black/40 text-white p-6">
                        <h3 className="text-2xl font-bold leading-snug">
                            Create Your <br /> Account
                        </h3>
                        <p className="text-sm mt-3 leading-relaxed">
                            Sign up to explore new destinations, connect with local guides,
                            and keep your adventures organized.
                        </p>
                    </Box>
                </Box>

                {/* Right Form Section */}
                <Box className="flex flex-col items-center justify-center p-6 w-full md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">Sign Up</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className="flex flex-col items-center w-full"
                    >
                        {/* Name Field */}
                        <Box className="flex flex-col w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="Name"
                                className="rounded-md h-10 w-full m-2 border px-4 text-sm"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && (
                                <span className="text-red-500 text-xs ml-2 -mt-1">
                                    {errors.name}
                                </span>
                            )}
                        </Box>

                        {/* Email Field */}
                        <Box className="flex flex-col w-full max-w-xs">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="rounded-md h-10 w-full m-2 border px-4 text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-xs ml-2 -mt-1">
                                    {errors.email}
                                </span>
                            )}
                        </Box>

                        {/* Password Field */}
                        <Box className="flex flex-col w-full max-w-xs">
                            <input
                                type="password"
                                placeholder="Password"
                                className="rounded-md h-10 w-full m-2 border px-4 text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-xs ml-2 -mt-1">
                                    {errors.password}
                                </span>
                            )}
                        </Box>

                        <Btn text="Join Us" IconEnd={ArrowForwardIcon} type="submit" />
                    </form>

                    {/* Divider */}
                    <Box className="flex items-center w-full my-4">
                        <Divider sx={{ flexGrow: 1, borderColor: "gray" }} />
                        <span className="px-2 text-gray-500 text-sm">or</span>
                        <Divider sx={{ flexGrow: 1, borderColor: "gray" }} />
                    </Box>

                    {/* Google Button */}
                    <Button
                        variant="outlined"
                        sx={{
                            backgroundColor: "white",
                            width: "80%",
                            maxWidth: "650px",
                            margin: "0.5rem 0",
                            color: "#082567",
                            borderColor: "#000d1a",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#082567",
                                color: "white",
                                boxShadow: 3,
                            },
                        }}
                    >
                        <GoogleIcon />
                        &nbsp;&nbsp;&nbsp;Sign Up With Google
                    </Button>

                    {/* Already have account */}
                    <Box className="flex gap-1 text-xs mt-3">
                        <p>Already have an account?</p>
                        <Link
                            to="/signin"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Sign In
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
