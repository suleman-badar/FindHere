import { Router } from "express";
import { register, login, me } from "../controllers/authController.js";
import { protect } from "../middlewares/identification.js";
import { verifyUserOtp } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/verify", verifyUserOtp);
router.post("/login", login);
router.get("/me", protect, me);

export default router;
