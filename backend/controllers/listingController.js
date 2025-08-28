import Listing from "../models/Listing.js";
import mongoose from "mongoose";


/**
 * @desc   Create new listing
 * @route  POST /api/listing/create-listing
 * @access Private (owner only)
 */
export const createListing = async(req, res) => {
    try {
        const { name, description, number, weblink, openingHours, latitude, longitude } = req.body;

        if (!name || !description) {
            return res.status(400).json({ success: false, message: "Name and description are required" });
        }

        const loc = (latitude && longitude) ? [latitude, longitude] : null;
        const images = req.files ? req.files.map(file => file.path) : [];

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
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ success: false, message: "Listing not found" });
        }

        if (listing.owner.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: "Not authorized to update this listing" });
        }

        const { name, location, description, number, weblink, openingHours } = req.body;
        const images = req.files ? req.files.map(file => file.path) : [];

        if (name) listing.name = name;
        if (location) listing.location = location;
        if (description) listing.description = description;
        if (number) listing.number = number;
        if (weblink) listing.website = weblink;
        if (openingHours) listing.openingHours = openingHours;
        if (images.length > 0) listing.images = images;

        await listing.save();
        res.status(200).json({ success: true, data: listing });
    } catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).json({ success: false, message: "Server error" });
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