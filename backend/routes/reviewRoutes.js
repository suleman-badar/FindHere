import express from "express";
import { getReviewsByListingId, createReviews } from "../controllers/reviewController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/all-review/:id", getReviewsByListingId);

router.post("/create-review/:id", upload.single("image"), createReviews);


export default router;