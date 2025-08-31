// MapSection.jsx
import { Box, Button, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapPreview from "../../components/MapPreview";
import Btn from "../Btn";
function openDirections(lat, lon) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            window.open(
                `https://www.google.com/maps/dir/${latitude},${longitude}/${lat},${lon}`,
                "_blank"
            );
        });
    }
}

export default function MapSection({ location }) {
    { console.log("location", location) }
    if (!location || location.length < 2) return null;

    return (
        <Box className="my-8 px-4 sm:px-8 md:px-16">

            <Box className="h-[350px] w-full mb-4 rounded-lg overflow-hidden shadow-sm">
                <MapPreview location={location} />
            </Box>

            <Box className="flex justify-center">
                <Btn
                    text="Directions"
                    variant="contained"
                    startIcon={<LocationOnIcon />}
                    onClick={() => openDirections(location[0], location[1])}
                >
                    Get Directions
                </Btn>
            </Box>
        </Box>
    );
}
