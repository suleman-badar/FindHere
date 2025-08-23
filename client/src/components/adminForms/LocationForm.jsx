import { Box, TextField, Button, Card, CardContent, Typography, Stack } from "@mui/material";
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
        <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300" sx={{ maxWidth: 600, mx: "auto" }}>
            <CardContent>
                <Typography variant="h6" className="font-semibold mb-4" sx={{ textAlign: "center" }}>
                    Location Information
                </Typography>

                <Stack spacing={3}>
                    <TextField
                        label="Latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        fullWidth
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    />
                    <TextField
                        label="Longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        fullWidth
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    />
                    <TextField
                        label="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        fullWidth
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    />
                    <TextField
                        label="Province"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        fullWidth
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: "10px",
                            textTransform: "none",
                            py: 1.5,
                            boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
                            "&:hover": { boxShadow: "0 6px 20px rgba(59,130,246,0.4)" },
                        }}
                        onClick={handleSave}
                    >
                        Save Location
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
