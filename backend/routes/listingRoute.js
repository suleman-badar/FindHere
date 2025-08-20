import express from "express";
import { upload } from "../config/cloudinary.js";
import { createListing } from "../controllers/listingController.js";

const router = express.Router();

// at a time user can upload 5 images at most
router.post("/", upload.array("images", 5), createListing);

export default router;
