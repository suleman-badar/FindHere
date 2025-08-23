import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";


function MapUpdater({ location }) {
    const map = useMap();
    if (location && location.length === 2) {
        map.setView(location, 13);
    }
    return null;
}

export default function MapPreview({ location }) {
    if (!location || location.length !== 2) {
        return (
            <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        );
    }

    return (
        <MapContainer
            center={location}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location} />
            <MapUpdater location={location} />
        </MapContainer>
    );
}
