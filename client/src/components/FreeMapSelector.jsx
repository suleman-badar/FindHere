import { useState } from "react";
import { Button } from "@mui/material";
import Loader from "./Loader";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import MapPreview from "./MapPreview";

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

    const handleSearch = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                "https://photon.komoot.io/api/",
                {
                    params: { q: query },
                }
            );

            if (res.data.features?.length > 0) {
                setResults(res.data.features);
            } else {
                setResults([]);
            }
        } catch (err) {
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: "100%" }}>
            {/* SEARCH BOX */}
            <div style={{ marginBottom: 12 }}>
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
                        padding: "10px 12px",
                        width: "70%",
                        marginRight: "8px",
                        borderRadius: "10px",
                        border: "1px solid var(--color-border)",
                        outline: "none",
                        backgroundColor: "rgba(255,255,255,0.8)",
                        transition: "0.2s",
                    }}
                    onFocus={(e) =>
                        (e.target.style.border =
                            "1px solid var(--color-primary)")
                    }
                    onBlur={(e) =>
                        (e.target.style.border =
                            "1px solid var(--color-border)")
                    }
                />

                <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                        borderRadius: "10px",
                        textTransform: "none",
                        px: 3,
                        py: 1.2,
                        fontWeight: 600,
                        background: "var(--gradient-primary)",
                        color: "#fff",
                        boxShadow:
                            "0 6px 20px rgba(185,28,28,0.25)",
                        "&:hover": {
                            boxShadow:
                                "0 8px 25px rgba(185,28,28,0.35)",
                        },
                    }}
                >
                    Search
                </Button>

                <div style={{ marginTop: 8 }}>
                    {loading && <Loader />}
                </div>
            </div>

            {/* RESULTS */}
            <ul style={{ marginTop: 10, padding: 0 }}>
                {results.map((place, i) => (
                    <li
                        key={i}
                        style={{
                            listStyle: "none",
                            marginBottom: "8px",
                        }}
                    >
                        <button
                            style={{
                                cursor: "pointer",
                                border: "1px solid var(--color-border)",
                                padding: "10px",
                                borderRadius: "10px",
                                width: "100%",
                                textAlign: "left",
                                backgroundColor:
                                    "rgba(255,255,255,0.7)",
                                transition: "0.2s",
                            }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.border =
                                    "1px solid var(--color-primary)")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.border =
                                    "1px solid var(--color-border)")
                            }
                            onClick={() => {
                                const coords =
                                    place.geometry?.coordinates;
                                if (!coords || coords.length < 2)
                                    return;

                                const [lng, lat] = coords;
                                setLocation([lat, lng]);
                                setResults([]);
                            }}
                        >
                            <span style={{ fontWeight: 600 }}>
                                {place.properties.name ||
                                    "Unnamed place"}
                            </span>
                            <br />
                            <span style={{ color: "var(--color-muted)" }}>
                                {place.properties.street || ""}{" "}
                                {place.properties.city || ""}{" "}
                                {place.properties.country || ""}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>

            {/* MAP */}
            <MapPreview location={location} />

            {/* COORDS DISPLAY */}
            <p style={{ marginTop: 10, color: "var(--color-muted)" }}>
                {location
                    ? `Selected Lat: ${location[0]}, Lng: ${location[1]}`
                    : "No location selected"}
            </p>
        </div>
    );
}