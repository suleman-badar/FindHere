import axios from "axios";

export const searchOnMap = async(req, res) => {
    try {
        const { q } = req.query; // get ?q=islamabad from frontend
        if (!q) return res.status(400).json({ error: "Query missing" });

        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q, // search query
                format: "json",
                addressdetails: 1,
                limit: 5,
            },
            headers: { "User-Agent": "FindHere-App (https://github.com/suleman-badar/FindHere)" } // required by Nominatim!
        });

        res.json(response.data); // send data back to frontend
    } catch (err) {
        console.error("Error fetching from Nominatim:", err.message);
        res.status(500).json({ error: "Failed to fetch from OpenStreetMap" });
    }
}