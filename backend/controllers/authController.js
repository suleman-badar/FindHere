import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtp, verifyOtp } from "./otpController.js";

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password });
    await sendOtp(email); 

    res.status(201).json({ message: "User created, OTP sent to email" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const verifyUserOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    await verifyOtp(email, otp);
    res.json({ message: "Email verified successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: "Email not verified. Please verify via OTP." });
    }
    res.json({ token: sign(user._id) });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


export const me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};