import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Button } from "@mui/material";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationPicker({ setLocation }) {
    useMapEvents({
        click(e) {
            setLocation([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
}

export default function FreeMapSelector({ location, setLocation }) {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async (query) => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8000/api/search", {
                params: { q: query },
            });
            console.log(res.data);
            setSearch(res.data);
        } catch (err) {
            console.error("Search error:", err);
            alert("Failed to fetch search results");
        }
    };

    return (
        <div>
            <div style={{ marginBottom: "10px" }}>
                <input
                    type="text"
                    value={search}
                    placeholder="Search place..."
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: "8px", width: "70%", marginRight: "5px", border: "1px solid #082567", borderRadius: "0.4rem" }}
                />
                <Button variant="outlined" onClick={handleSearch} style={{ padding: "8px 12px" }}>
                    Search
                </Button>
                {loading && (
                    <span style={{ marginLeft: "10px", color: "#082567" }}>Searching...</span>
                )}
            </div>

            <MapContainer
                center={location}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={location}></Marker>
                <LocationPicker setLocation={setLocation} />
            </MapContainer>

            <p>
                Selected Lat: {location[0]}, Lng: {location[1]}
            </p>
        </div>
    );
}
