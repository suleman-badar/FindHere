import Listing from "../models/Listing.js";
import mongoose from "mongoose";


/**
 * @desc   Create new listing
 * @route  POST /api/listing/create-listing
 * @access Private (owner only)
 */
export const createListing = async(req, res) => {
    try {
        let { name, description, number, weblink, latitude, longitude } = req.body;

        if (!name || !description) {
            return res.status(400).json({ success: false, message: "Name and description are required" });
        }

        let openingHours = null;

        if (req.body.openingHours) {
            try {
                openingHours = JSON.parse(req.body.openingHours);
            } catch (e) {
                return res.status(400).json({ success: false, message: "Invalid openingHours format" });
            }
        }

        const loc = (latitude && longitude) ? [latitude, longitude] : null;
        const images = req.files ? req.files.map(file => file.path) : [];
        console.log("REQ BODY:", req.body);


        const listing = new Listing({
            name,
            location: loc,
            description,
            number,
            website: weblink,
            openingHours,
            images,
            owner: req.userId,
        });

        await listing.save();
        res.status(201).json({ success: true, data: listing });
    } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

/**
 * @desc   Update listing by ID
 * @route  PUT /api/listing/update-listing/:id
 * @access Private (owner only)
 */

export const updateListing = async(req, res) => {
    try {
        const listing = await Listing.findById(req.params.listingId);
        if (!listing) {
            return res.status(404).json({ success: false, message: "Listing not found" });
        }

        if (listing.owner.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: "Not authorized to update this listing" });
        }

        const { name, location, description, number, weblink, openingHours } = req.body;
        const images = req.files ? req.files.map(file => file.path) : [];


        console.log("images", images);
        if (images.length > 0) {
            listing.images = [...listing.images, ...images];
        }

        if (name) listing.name = name;
        if (location) {
            const parsedLoc = typeof location === "string" ? JSON.parse(location) : location;
            if (Array.isArray(parsedLoc) && parsedLoc.length === 2) {
                listing.location = parsedLoc.map(Number);

            }
        }
        if (description) listing.description = description;
        if (number) listing.number = number;
        if (weblink) listing.website = weblink;
        if (openingHours) {
            try {
                listing.openingHours =
                    typeof openingHours === "string" ? JSON.parse(openingHours) : openingHours;
            } catch (e) {
                return res.status(400).json({ success: false, message: "Invalid openingHours format" });
            }
        }
        await listing.save();
        res.status(200).json({ success: true, data: listing });
    } catch (error) {
        console.error("Error updating listing:", error.message, error.stack);
        res.status(500).json({ success: false, message: error.message });
    }
};



/**
 * @desc   Get all listings (public)
 * @route  GET /api/listing/all-listing
 * @access Public
 */
export const getAllListings = async(req, res) => {
    try {
        const listings = await Listing.find().populate("owner", "name email");
        res.json({ success: true, data: listings });
    } catch (e) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

/**
 * @desc   Get single listing by ID (public)
 * @route  GET /api/listing/details/:id
 * @access Public
 */
export const getListingById = async(req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate("owner", "name email");
        if (!listing) {
            return res.status(404).json({ success: false, message: "Listing not found" });
        }
        res.json({ success: true, data: listing });
    } catch (e) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

/**
 * @desc   Get all listings by logged-in owner
 * @route  GET /api/listing/owner
 * @access Private (owner only)
 */
export const getOwnerListings = async(req, res) => {
    try {

        const listings = await Listing.aggregate([{
                $match: { owner: new mongoose.Types.ObjectId(String(req.userId)) }
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "listingId",
                    as: "reviews"
                }
            },
            {
                $addFields: {
                    averageRating: { $avg: "$reviews.rating" },
                    reviewCount: { $size: "$reviews" }
                }
            }
        ]);


        res.json({ success: true, data: listings });
    } catch (error) {
        console.error("Error fetching owner listings:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

/**
 * @desc   Delete listing by ID
 * @route  DELETE /api/listing/delete-listing/:id
 * @access Private (owner only)
 */
export const deleteListing = async(req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ success: false, message: "Listing not found" });
        }

        if (listing.owner.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: "Not authorized to delete this listing" });
        }

        await listing.deleteOne();
        res.json({ success: true, message: "Listing deleted successfully" });
    } catch (e) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};