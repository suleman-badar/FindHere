import { Box, Button, Divider } from "@mui/material";
import LoginImg from "../assets/LoginImg.png";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';


export default function SignIn() {
    let styles = {
        backgroundColor: "#082567",
        width: "80%",
        margin: "0.5rem",
        color: "white",
        borderRadius: "8px",
        padding: "8px 16px",
        textTransform: "none",
        boxShadow: 3,
        "&:hover": {
            backgroundColor: "#000d1a",
        },
    };
    return (
        <Box className="flex justify-center items-center bg-blue-100 w-full min-h-screen p-5">
            <Box className="flex bg-white w-[65%] h-[550px] rounded-lg shadow-lg overflow-hidden">

                <Box className="relative w-[45%] hidden md:block">
                    <img
                        src={LoginImg}
                        alt="Login"
                        className="w-full h-full object-cover"
                    />
                    <Box className="absolute inset-0 flex flex-col justify-center items-start bg-black/30 text-white p-4 m-4">
                        <h3 className="text-2xl font-bold">Create Your<br></br> Account</h3>
                        <Box >
                            <p className="text-sm mt-2">Sign up to explore new destinations,<br></br> connect with local guides, and keep<br></br> your adventures <br></br>organized.</p>
                        </Box>
                    </Box>
                </Box>

                <Box className="flex flex-col items-center justify-center p-6 w-full md:w-[55%]">
                    <h3 className="text-2xl font-bold mb-4">Sign Up</h3>
                    <input
                        type="name"
                        placeholder="Name"
                        className="rounded-sm h-10 w-[280px] m-2 border px-4"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        className="rounded-sm h-10 w-[280px] m-2 border px-4"
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="rounded-sm h-10 w-[280px] m-2 border px-4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="rounded-sm h-10 w-[280px] m-2 border px-4"
                    />



                    <Button
                        variant="contained"
                        sx={styles}
                    >
                        Join Us&nbsp;&nbsp;&nbsp;
                        <ArrowForwardIcon />
                    </Button>
                    <Box className="flex items-center w-full my-2">
                        <Divider sx={{ flexGrow: 1, borderColor: "gray" }} />
                        <span className="px-2 text-gray-500 text-sm">or</span>
                        <Divider sx={{ flexGrow: 1, borderColor: "gray" }} />
                    </Box>
                    <Button
                        variant="outlined"

                        sx={{
                            backgroundColor: "white",
                            width: "80%",
                            margin: "0.5rem",
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
                    <Button
                        variant="contained"
                        sx={styles}
                    >
                        <AppleIcon />
                        &nbsp;&nbsp;&nbsp;Sign Up With Apple

                    </Button>

                    <Box className="flex g-2 text-xs">

                        <p>Already have an account?</p><Link to="/signin" className="text-blue-600 hover:underline">
                            Sign In
                        </Link>
                    </Box>
                </Box>
            </Box >
        </Box >
    );
}
