import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function LocationForm() {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");

    const handleSave = () => {
        console.log({ latitude, longitude, city, province });
    };

    return (
        <Box display="flex" flexDirection="column" gap={3} maxWidth="600px">
            <TextField
                label="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                fullWidth
            />
            <TextField
                label="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                fullWidth
            />
            <TextField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
            />
            <TextField
                label="Province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                fullWidth
            />
            <Button variant="contained" onClick={handleSave}>
                Save
            </Button>
        </Box>
    );
}
