import express from "express";
import { upload } from "../config/cloudinary.js";
import { createListing, getAllListings, updateListing, getListingById, deleteListing } from "../controllers/listingController.js";

const router = express.Router();

router.post("/create-listing", upload.array("images", 5), createListing);
router.put("/update-listing/:id", upload.array("images", 5), updateListing);

router.get("/all-listing", getAllListings);
router.get("/details/:id", getListingById);

router.delete("/:id", deleteListing)
export default router;