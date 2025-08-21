import Listing from "../models/Listing.js";

export const createListing = async(req, res) => {
    try {
        const {
            name,
            location,
            description,
            number,
            weblink,
            openingHours
        } = req.body;

        const images = req.files ? req.files.map(file => file.path) : [];


        const listing = new Listing({
            name,
            location,
            description,
            number,
            weblink,
            openingHours,
            images
        });

        await listing.save();
        res.status(201).json({ success: true, data: listing });
    } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};