import client from "../../backend/meiliSearch.js";
import Listing from "../models/Listing.js";

export const syncResturants = async(req, res) => {
    try {
        const restaurants = await Listing.find();
        const index = client.index("restaurants");
        await client.deleteIndex("restaurants"); // ❌ remove old one

        await client.createIndex("restaurants", { primaryKey: "_id" }).catch(() => {});

        await index.updateFilterableAttributes([
            "tags",
            "amenities",
            "cuisine",
            "services",
            "paymentMethods"
        ]);


        await index.addDocuments(restaurants);
        res.json({ success: true, message: "Restaurants synced with Meilisearch" })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const searchResturants = async(req, res) => {
    try {
        const q = req.query.q || "";
        const index = client.index("restaurants");

        const filters = [];

        // ✅ handle array or single value
        if (req.query.tags) {
            const tags = Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags];
            const tagFilters = tags.map((tag) => `tags = "${tag}"`);
            filters.push(tagFilters.join(" OR "));
        }

        if (req.query.amenities) {
            const amenities = Array.isArray(req.query.amenities) ? req.query.amenities : [req.query.amenities];
            const amenityFilters = amenities.map((a) => `amenities = "${a}"`);
            filters.push(amenityFilters.join(" OR "));
        }

        if (req.query.cuisine) {
            const cuisines = Array.isArray(req.query.cuisine) ? req.query.cuisine : [req.query.cuisine];
            const cuisineFilters = cuisines.map((c) => `cuisine = "${c}"`);
            filters.push(cuisineFilters.join(" OR "));
        }

        // …repeat for services, paymentMethods, etc.

        const result = await index.search(q, {
            filter: filters.length ? filters.join(" AND ") : undefined,
        });

        res.json(result.hits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};