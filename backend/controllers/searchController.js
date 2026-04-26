import client from "../config/meiliSearch.js";
import Listing from "../models/Listing.js";


// 🔥 Sync MongoDB → MeiliSearch
export const syncResturants = async () => {
  const listings = await Listing.find();

  const restaurants = listings.map(doc => ({
    _id: doc._id.toString(),
    name: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    cuisine: doc.cuisine,
    tags: doc.tags,
    amenities: doc.amenities,
    services: doc.services,
    paymentMethods: doc.paymentMethods,
    price: doc.price,
  }));

  console.log("Syncing", restaurants.length, "restaurants");

  //  Always get index reference
  let index = client.index("restaurants");

  //  Ensure settings are ALWAYS applied
  await index.updateSettings({
    searchableAttributes: [
      "name",
      "tagline",
      "description",
      "cuisine",
      "tags"
    ],
    filterableAttributes: [
      "tags",
      "amenities",
      "cuisine",
      "services",
      "paymentMethods",
      "price"
    ]
  });

  //  Add documents
  await index.addDocuments(restaurants);

  return index;
};

export const syncResturantsRoute = async (req, res) => {
  try {
    //  Optional: clear old index (recommended just once, when indexing for the first time)
    await client.deleteIndex("restaurants").catch(() => {});

    await syncResturants();

    res.json({ success: true, message: "Restaurants synced with Meilisearch" });
  } catch (error) {
    console.error("Sync error:", error.message);
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