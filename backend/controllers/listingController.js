import Listing from "../models/Listing.js";


export const createListing = async (req, res) => {
    try {
        const { name, location, description, number, weblink, openingHours } = req.body;

        const loc = location && location.length === 2 ? location : null;
        const opening = { open: req.body.open, close: req.body.close };
        const images = req.files ? req.files.map(file => file.path) : [];

        const listing = new Listing({
            name,
            location: loc,
            description,
            number,
            website: weblink,
            openingHours: opening,
            images,
            owner: req.userId
        });

        await listing.save();
        res.status(201).json({ success: true, data: listing });
    } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const updateListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: "Listing not found" });

        if (listing.owner.toString() !== req.userId) {
            return res.status(403).json({ message: "Not authorized to update this listing" });
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



export const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find().select("-password");
        res.json(listings);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: "Listing not found" });
        res.json(listing);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


export const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: "Listing not found" });

        if (listing.owner.toString() !== req.userId) {
            return res.status(403).json({ message: "Not authorized to delete this listing" });
        }

        await listing.deleteOne();
        res.json({ message: "Listing deleted" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
