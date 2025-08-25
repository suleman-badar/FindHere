import { Box } from "@mui/material";
import Btn from "../components/Btn";
import LoginImg from "../assets/LoginImg.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import { signInValidations } from "../validations/signInValidations";
import axios from "axios";

export default function SignIn() {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            // Validate inputs
            await signInValidations.validate(
                { email, password },
                { abortEarly: false }
            );
            setErrors({});

            setLoading(true);

            // API call
            const res = await axios.post(
                "http://localhost:8000/api/auth/login",
                { email, password },
                { timeout: 5000 }
            );

            console.log("Login success:", res.data);

            // Reset fields
            setEmail("");
            setPassword("");

            // Navigate after login
            navigate("/dashboard");
        } catch (e) {
            if (e.name === "ValidationError") {
                // Handle Yup validation errors
                const validationErrors = {};
                e.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                console.error(e.message);
                setErrors({ api: "Invalid email or password" });
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <Box className="flex justify-center items-center bg-blue-100 w-full min-h-screen p-4">
            <Box className="flex flex-col md:flex-row bg-white w-full max-w-[900px] rounded-lg shadow-lg overflow-hidden">

                {/* Left Side Image - hidden on small screens */}
                <Box className="relative md:w-[45%] hidden md:block">
                    <img
                        src={LoginImg}
                        alt="Login"
                        className="w-full h-full object-cover"
                    />
                    <Box className="absolute inset-0 flex flex-col justify-center items-start bg-black/30 text-white p-4 m-4">
                        <h3 className="text-2xl font-bold">Welcome Back!</h3>
                        <p className="text-sm mt-2">
                            We're glad to see you again. Let's pick up where you left off.
                        </p>
                    </Box>
                </Box>

                {/* Right Side Form */}
                <Box className="flex flex-col items-center justify-center p-6 w-full md:w-[55%]">
                    <h3 className="text-2xl font-bold mb-6">Sign In</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                        className="flex flex-col items-center w-full"
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            className="rounded-sm h-10 w-full max-w-[280px] m-2 border px-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs">{errors.email}</p>
                        )}

                        <input
                            type="password"
                            placeholder="Password"
                            className="rounded-sm h-10 w-full max-w-[280px] m-2 border px-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs">{errors.password}</p>
                        )}

                        {errors.api && (
                            <p className="text-red-500 text-xs mt-2">{errors.api}</p>
                        )}

                        <Btn text="Sign In" type="submit" className="w-full max-w-[280px]" />
                    </form>

                    {/* Signup Link */}
                    <Box className="flex gap-1 text-xs mt-3">
                        <p>Don't have an account?</p>
                        <Link
                            to="/signup"
                            className="text-blue-600 hover:underline"
                        >
                            Create Account
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
