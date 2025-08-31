import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtp, verifyOtp } from "./otpController.js";

const sign = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });


// REGISTER
export const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }


        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ success: false, message: "Email already registered" });

        const user = await User.create({ name, email, password, isVerified: false });

        await sendOtp(email);

        return res.status(201).json({
            success: true,
            message: "OTP sent to email. Verify to complete registration.",
            email: user.email,
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
    }
};

// VERIFY OTP
export const verifyUserOtp = async(req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        const { user, verified } = await verifyOtp(email, otp);

        if (!verified) {
            return res.status(400).json({ success: false, message: "OTP verification failed" });
        }

        const token = sign(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "User verified successfully",
            token,
            user: { id: user._id, email: user.email, name: user.name }
        });
    } catch (error) {
        console.error("OTP verification error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};


//resend OTP
export const resendOtp = async(req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: "User already verified" });
        } else {
            await sendOtp(email);
            return res.status(200).json({ success: true, message: "OTP resent successfully" });

        }

    } catch (error) {
        console.error("Resend OTP error:", error);
        res.status(500).json({ success: false, message: "Failed to resend OTP" });
    }
};

// LOGIN
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        if (!user.isVerified) {
            await sendOtp(user.email);
            return res.status(403).json({
                success: false,
                message: "Email not verified. Please verify via OTP.",
                email: user.email
            });
        }

        const token = sign(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        }).json({ success: true, token, message: "Logged in successfully" });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// ME
export const me = async(req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.json(user);
    } catch (e) {
        res.status(500).json({ success: true, message: e.message });
    }
};

// LOGOUT
export const logout = (_req, res) => {
    res.clearCookie("token", { path: "/" }).json({ success: true, message: "Logged out successfully" });
};