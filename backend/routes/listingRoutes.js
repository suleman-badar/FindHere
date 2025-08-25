import express from "express";
import { upload } from "../config/cloudinary.js";
import { createListing, getAllListings, updateListing, getListingById, deleteListing } from "../controllers/listingController.js";
import { protect } from "../middlewares/identification.js";

const router = express.Router();
// Protected routes (must be logged in)
router.post("/create-listing", protect, upload.array("images", 5), createListing);
router.put("/update-listing/:id", protect, upload.array("images", 5), updateListing);
router.delete("/:id", protect, deleteListing);

// Public routes
router.get("/all-listing", getAllListings);
router.get("/details/:id", getListingById);

export default router;