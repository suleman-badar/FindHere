  import otpGenerator from "otp-generator";
  import nodemailer from "nodemailer";
  import User from "../models/User.js";
  import dotenv from "dotenv";
  import bcrypt from "bcryptjs";

  dotenv.config();

  export const sendOtp = async(email) => {
      const otp = otpGenerator.generate(6, {
          digits: true,
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false
      });

      // const expires = Date.now() + 10 * 60 * 1000; // 10 minutes
      const expiryMinutes = 0.5; // 30 seconds for testing
      const expires = Date.now() + expiryMinutes * 60 * 1000;


      const hashedOtp = await bcrypt.hash(otp, 10);

      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      user.verificationCode = hashedOtp;
      user.verificationCodeExpires = new Date(expires);
      user.otpAttempts = 0;
      await user.save();

      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
          }
      });

      await transporter.sendMail({
          from: `"FindHere" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Your OTP Code",
          text: `Your OTP is ${otp}. It will expire in ${expiryMinutes} minutes.`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
              <h2 style="color: #333; text-align: center;">Verify Your Email</h2>
              <p style="font-size: 16px; color: #555;">
                Use the following OTP to verify your email. This code is valid for <strong>10 minutes</strong>.
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <span style="font-size: 32px; letter-spacing: 4px; font-weight: bold; color: #2c3e50; padding: 10px 20px; background: #e6f2ff; border-radius: 6px; display: inline-block;">
                  ${otp}
                </span>
              </div>
              <p style="font-size: 14px; color: #777;">
                If you didn’t request this, you can ignore this email.
              </p>
            </div>
          `
      });

      return { otpSent: true };
  };

  export const verifyOtp = async(email, otp) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      if (!user.verificationCode || user.verificationCodeExpires < Date.now()) {
          throw new Error("OTP expired. Please request a new one.");
      }

      if (!user.otpAttempts) user.otpAttempts = 0;
      if (user.otpAttempts >= 5) throw new Error("Too many invalid attempts. Request a new OTP.");

      const isValid = await bcrypt.compare(otp, user.verificationCode);
      if (!isValid) {
          user.otpAttempts++;
          await user.save();
          throw new Error("Invalid OTP");
      }

      user.isVerified = true;
      user.verificationCode = undefined;
      user.otpAttempts = 0;
      user.verificationCodeExpires = undefined;
      await user.save();

      return { user, verified: true };
  };