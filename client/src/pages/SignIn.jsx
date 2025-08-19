import { Box } from "@mui/material";
import Btn from "../components/Btn"
import LoginImg from "../assets/LoginImg.png";
import { Link } from "react-router-dom";


export default function SignIn() {
    return (
        <Box className="flex justify-center items-center bg-blue-100 w-full min-h-screen p-5">
            <Box className="flex bg-white w-[65%] h-[480px] rounded-lg shadow-lg overflow-hidden">

                <Box className="relative w-[45%] hidden md:block">
                    <img
                        src={LoginImg}
                        alt="Login"
                        className="w-full h-full object-cover"
                    />
                    <Box className="absolute inset-0 flex flex-col justify-center items-start bg-black/30 text-white p-4 m-4">
                        <h3 className="text-2xl font-bold">Welcome Back!</h3>
                        <Box >
                            <p className="text-sm mt-2 ">W're glad to see you again. let's pick up<br></br> where you left off.</p>
                        </Box>
                    </Box>
                </Box>

                <Box className="flex flex-col items-center justify-center p-6 w-full md:w-[55%]">
                    <h3 className="text-2xl font-bold mb-6">Sign In</h3>

                    <input
                        type="text"
                        placeholder="Username"
                        className="rounded-sm h-10 w-[280px] m-2 border px-4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="rounded-sm h-10 w-[280px] m-2 border px-4"
                    />

                    <Btn text="Sign In"></Btn>
                    <Box className="flex g-2 text-xs">
                        <p>Don't have any account?</p><Link to="/signup" className="text-blue-600 hover:underline">
                            Create Account
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
