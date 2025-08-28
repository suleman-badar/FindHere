import express from "express";
import { getReviewsByListingId, createReviews, getListingsWithRatings } from "../controllers/reviewController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/all-review/:id", getReviewsByListingId);

router.post("/create-review/:id", upload.single("image"), createReviews);

router.get("/listings-with-reviews", getListingsWithRatings);
export default router;