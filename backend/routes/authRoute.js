import { Router } from "express";
import { register, login, me, logout, resendOtp } from "../controllers/authController.js";
import { protect } from "../middlewares/identification.js";
import { verifyUserOtp } from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

const router = Router();


const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15,
    message: { message: "Too many login attempts, try again after 15 minutes" },
    standardHeaders: true,
    legacyHeaders: false,
});

router.get("/check-auth", protect, (req, res) => {
    res.json({ success: true, userId: req.userId });
});

router.post("/register", loginLimiter, register);
router.post("/register/verify", verifyUserOtp);
router.post("/register/resend-otp", resendOtp);
router.post("/login", loginLimiter, login);
router.get("/me", protect, me);
router.post("/logout", protect, logout);



export default router;