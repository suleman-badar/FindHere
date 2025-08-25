import jwt from "jsonwebtoken";
import User from "../models/User.js";

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already registered" });

        const user = await User.create({ name, email, password });
        res.status(201).json({ message: "User created", token: sign(user._id) });
        console.log("user created");
        alert("Created");
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        res.json({ token: sign(user._id) });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const me = async(req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// Get all users 
export const getAllUsers = async(req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// Get user by ID
export const getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// Update user by ID (self or admin)
export const updateUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;

        await user.save();
        res.json({ message: "User updated", user: {...user.toObject(), password: undefined } });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


export const deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};