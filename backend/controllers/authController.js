import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { sendOtp, verifyOtp } from "./otpController.js";

import { changePasswordSchema, acceptFPCodeSchema, hmacProcess } from "../middlewares/validator.js";

dotenv.config();

const transport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	},
});

const sign = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });


// REGISTER
export const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already registered" });

        const user = await User.create({ name, email, password, isVerified: false });

        await sendOtp(email);

        return res.status(201).json({
            success: true,
            message: "OTP sent to email. Verify to complete registration.",
            email: user.email,
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
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

// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  const userId = req.userId; 
  const { oldPassword, newPassword } = req.body;

  try {
    const { error } = changePasswordSchema.validate({ oldPassword, newPassword });
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist!" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ success: false, message: "You are not verified!" });
    }

    const validPassword = await user.comparePassword(oldPassword);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Invalid credentials!" });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const sendForgotPasswordCode = async (req, res) => {
	const { email } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res
				.status(404)
				.json({ success: false, message: 'User does not exist!' });
		}

		const codeValue = Math.floor(Math.random() * 1000000).toString();
		let info = await transport.sendMail({
			from: process.env.EMAIL_USER,
			to: existingUser.email,
			subject: 'Forgot password code',
			html: '<h1>' + codeValue + '</h1>',
		});

		if (info.accepted[0] === existingUser.email) {
			const hashedCodeValue = hmacProcess(
				codeValue,
				process.env.HMAC_VERIFICATION_CODE_SECRET
			);
			existingUser.forgotPasswordCode = hashedCodeValue;
			existingUser.forgotPasswordCodeValidation = Date.now();
			await existingUser.save();
			return res.status(200).json({ success: true, message: 'Code sent!' });
		}
		res.status(400).json({ success: false, message: 'Code sent failed!' });
	} catch (error) {
		console.log(error);
	}
};

export const verifyForgotPasswordCode = async (req, res) =>{
    const {email, providedCode, newPassword} = req.body;

    try {
        const {error, value} = acceptFPCodeSchema.validate({email, providedCode, newPassword});

        if(error){
            return res.status(401).json({success: false, message: error.details[0].message})
        }

        const codeValue = providedCode.toString();

        const existingUser = await User.findOne({email}).select("+forgotPasswordCode +forgotPasswordCodeValidation");

        if (!existingUser) {
			return res
				.status(404)
				.json({ success: false, message: 'User does not exist!' });
		}

        if(!existingUser.forgotPasswordCode || !existingUser.forgotPasswordCodeValidation){
            return res.status(400).json({success: false, message: "Internal Server Error!"});
        }

        if(Date.now() - existingUser.forgotPasswordCodeValidation > 5 * 60 * 1000){
            return res.status(400).json({success: false, message: "Code has been expired!"});
        }

        const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET);

        if(hashedCodeValue === existingUser.forgotPasswordCode){
            const hashedPassword = newPassword;
            existingUser.password = hashedPassword;
            existingUser.forgotPasswordCode = undefined;
            existingUser.forgotPasswordCodeValidation = undefined;
            await existingUser.save();
            return res.status(200).json({success: true, message: "Your password has been updated!"});
        }

        return res.status(400).json({success: false, message: "Unexpected Error occured!"});

    } catch (error) {
        console.error(error);
    }
}