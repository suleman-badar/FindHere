import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Loader from "./Loader";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import MapPreview from "./Details/MapPreview";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function FreeMapSelector({ location, setLocation }) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    // console.log("Setting location:", location);


    const handleSearch = async () => {
        try {
            setLoading(true);
            const res = await axios.get("https://photon.komoot.io/api/", {
                params: { q: query },
            });

            if (res.data.features && res.data.features.length > 0) {
                setResults(res.data.features);
            } else {
                setResults([]);
                alert("No results found");
            }
        } catch (err) {
            console.error("Search error:", err);
            alert("Failed to fetch search results");
        } finally {
            setLoading(false);
        }
    };
    // console.log("results", results);


    return (
        <div>
            <div style={{ marginBottom: "10px" }}>
                <input
                    type="text"
                    value={query}
                    placeholder="Search place..."
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSearch();
                        }
                    }}
                    style={{
                        padding: "8px",
                        width: "70%",
                        marginRight: "5px",
                        border: "1px solid #082567",
                        borderRadius: "0.4rem",
                    }}
                />
                <Button
                    variant="outlined"
                    onClick={handleSearch}
                    style={{ padding: "8px 12px" }}
                >
                    Search
                </Button>
                <div>{loading && <Loader />}</div>
            </div>


            <ul style={{ marginTop: "10px", padding: 0 }}>
                {results.map((place, i) => (
                    <li
                        key={i}
                        style={{
                            listStyle: "none",
                            marginBottom: "5px",
                        }}
                    >
                        <button
                            style={{
                                cursor: "pointer",
                                border: "1px solid #ccc",
                                padding: "5px",
                                borderRadius: "5px",
                                width: "100%",
                                textAlign: "left",
                            }}
                            onClick={() => {
                                const coords = place.geometry?.coordinates;
                                if (!coords || coords.length < 2) return;
                                const [lng, lat] = coords;
                                setLocation([lat, lng]);
                                setResults([]);
                            }}
                        >
                            {place.properties.name || "Unnamed place"},{" "}
                            {place.properties.street || ""}{" "}
                            {place.properties.city || ""}{" "}
                            {place.properties.country || ""}
                        </button>
                    </li>
                ))}
            </ul>

            {/* console.log("locartiondfjh",location) */}
            <MapPreview location={location} />


            <p>
                {location
                    ? `Selected Lat: ${location[0]}, Lng: ${location[1]}`
                    : "No location selected"}
            </p>
        </div>
    );
}
