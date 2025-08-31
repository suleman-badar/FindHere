import Listing from "../models/Listing.js";
import mongoose from "mongoose";



/**
 * @desc   Create new listing
 * @route  POST /api/listing
 * @access Private (owner only)
 */
export const createListing = async(req, res) => {
    try {
        // Destructure data from req.body
        const {
            name,
            tagline,
            location,
            address,
            phone,
            email,
            website,
            hours,
            paymentMethods,
            services,
            tags,
            amenities,
            price,
        } = req.body;

        // Validate required fields
        if (!name || !location) {
            return res.status(400).json({
                success: false,
                message: "Name and location are required",
            });
        }

        // Prse hours if sent as string
        let parsedHours = {};
        if (hours) {
            parsedHours = typeof hours === "string" ? JSON.parse(hours) : hours;
        }
        if (Array.isArray(location)) {
            parsedLocation = location.map(Number)
        } else if (typeof location === "string") {
            parsedLocation = location.split(",").map(Number);
        }

        // Parse array fields if sent as strings
        const parsedPaymentMethods = typeof paymentMethods === "string" ? JSON.parse(paymentMethods) : paymentMethods || [];
        const parsedServices = typeof services === "string" ? JSON.parse(services) : services || [];
        const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags || [];
        const parsedAmenities = typeof amenities === "string" ? JSON.parse(amenities) : amenities || [];


        const images = req.files ? req.files.map((file) => file.path) : [];
        console.log("images", images);

        const listing = new Listing({
            name,
            tagline,
            location: parsedLocation,
            address,
            phone,
            email,
            website,
            hours: parsedHours,
            paymentMethods: parsedPaymentMethods || [],
            services: parsedServices || [],
            tags: parsedTags || [],
            amenities: parsedAmenities || [],
            price: price || 0,
            images,
            owner: req.userId,
        });


        await listing.save();

        res.status(201).json({
            success: true,
            data: listing,
            message: "Listing created successfully",
        });
    } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
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
        const listing = await Listing.findById(req.params.listingId);
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