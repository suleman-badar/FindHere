import client from "../../backend/meiliSearch.js";
import Listing from "../models/Listing.js";

export const syncResturants = async() => {
    const listings = await Listing.find();

    // Convert ObjectId to string so Meilisearch accepts it
    const restaurants = listings.map(doc => ({
        ...doc.toObject(),
        _id: doc._id.toString(),
    }));

    console.log("Syncing", restaurants.length, "restaurants");

    let index;
    try {
        index = await client.getIndex("restaurants");
    } catch (e) {
        index = await client.createIndex("restaurants", { primaryKey: "_id" });
        await index.updateFilterableAttributes([
            "tags",
            "amenities",
            "cuisine",
            "services",
            "paymentMethods",
        ]);
    }

    await index.addDocuments(restaurants);
    return index;
};


export const syncResturantsRoute = async(req, res) => {
    try {
        await syncResturants();
        res.json({ success: true, message: "Restaurants synced with Meilisearch" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchResturants = async(req, res) => {
    try {
        const q = req.query.q || "";

        let index;

        try {
            index = client.index("restaurants");
            await index.getStats();
        } catch (e) {
            index = await syncResturants();
        }

        const filters = [];

        if (req.query.tags) {
            const tags = Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags];
            const tagFilters = tags.map((tag) => `tags = "${tag}"`);
            filters.push(tagFilters.join(" OR "));
        }

        if (req.query.amenities) {
            const amenities = Array.isArray(req.query.amenities) ?
                req.query.amenities : [req.query.amenities];
            const amenityFilters = amenities.map((a) => `amenities = "${a}"`);
            filters.push(amenityFilters.join(" OR "));
        }

        if (req.query.cuisine) {
            const cuisines = Array.isArray(req.query.cuisine) ?
                req.query.cuisine : [req.query.cuisine];
            const cuisineFilters = cuisines.map((c) => `cuisine = "${c}"`);
            filters.push(cuisineFilters.join(" OR "));
        }

        const result = await index.search(q, {
            filter: filters.length ? filters.join(" AND ") : undefined,
        });

        res.json(result.hits);
    } catch (error) {
        console.error("Search error:", error.message);
        res.status(500).json({ error: error.message });
    }
};