import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Button } from "@mui/material";
import Loader from "./Loader";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { useMap } from "react-leaflet";

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

const defaultCenter = [31.5497, 74.3436];

function MapUpdater({ location }) {
    const map = useMap();

    if (location && location.length === 2 && location[0] && location[1]) {
        map.setView(location, 13);
    } else {
        map.setView(defaultCenter, 13);
    }

    return null;
}

export default function FreeMapSelector({ location, setLocation }) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8000/api/map/search", {
                params: { q: query },
            });
            console.log(res.data);
            if (res.data.length > 0) {
                const { lat, lon } = res.data[0];
                setLocation([parseFloat(lat), parseFloat(lon)]);
            } else {
                alert("No results found");
            }
        } catch (err) {
            console.error("Search error:", err);
            alert("Failed to fetch search results");
        } finally {
            setLoading(false);
        }
    };


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
                    }
                    }
                    style={{ padding: "8px", width: "70%", marginRight: "5px", border: "1px solid #082567", borderRadius: "0.4rem" }}
                />
                <Button variant="outlined" onClick={handleSearch} style={{ padding: "8px 12px" }}>
                    Search
                </Button>
                <div>{loading && (<Loader />)}</div>

            </div>

            <MapContainer
                center={location && location.length === 2 ? location : defaultCenter}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {location && location.length === 2 && (
                    <Marker position={location}></Marker>
                )}
                <LocationPicker setLocation={setLocation} />

                <MapUpdater location={location} />
            </MapContainer>


            <p>
                Selected Lat: {location[0]}, Lng: {location[1]}
            </p>
        </div>
    );
}
