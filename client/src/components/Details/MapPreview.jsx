import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Pan map when location changes
function MapUpdater({ location }) {
    const map = useMap();
    useEffect(() => {
        if (
            Array.isArray(location) &&
            location.length === 2 &&
            location[0] != null &&
            location[1] != null
        ) {
            map.setView(location, map.getZoom(), { animate: true });
        }
    }, [location, map]);
    return null;
}

export default function MapPreview({ location, onLocationChange }) {
    const safeLocation =
        Array.isArray(location) &&
            location.length === 2 &&
            location[0] != null &&
            location[1] != null
            ? location
            : [20, 0];

    return (
        <MapContainer center={safeLocation} zoom={13} style={{ height: "300px", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={safeLocation}
                draggable={!!onLocationChange}
                eventHandlers={{
                    dragend: (e) => {
                        if (onLocationChange) {
                            const { lat, lng } = e.target.getLatLng();
                            onLocationChange(lat, lng);
                        }
                    },
                }}
            />
            <MapUpdater location={safeLocation} />
        </MapContainer>
    );
}
