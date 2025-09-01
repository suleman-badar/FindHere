import { useState } from "react";
import { Card, CardContent, CardHeader, Typography, TextField, Button, Stack, Divider } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import Loader from "../Loader";
import FreeMapSelector from "../FreeMapSelector";

export default function LocationEdit() {
    const { listingDetails, setListingDetails, loading, onSave, onCancel } = useOutletContext();
    const [localLocation, setLocalLocation] = useState(
        listingDetails?.location?.length === 2 ? listingDetails.location : [0, 0]
    );

    if (loading || !listingDetails) return <Loader />;

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numValue = parseFloat(value) || 0;

        const updated = name === "latitude" ? [numValue, localLocation[1]] : [localLocation[0], numValue];

        setLocalLocation(updated);
        setListingDetails((prev) => ({ ...prev, location: updated }));
    };

    const handleLocationChange = (coords) => {
        if (!coords || coords.length < 2) return;
        const [lat, lng] = coords;
        setLocalLocation([lat, lng]);
        setListingDetails((prev) => ({ ...prev, location: [lat, lng] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(listingDetails);
    };

    return (
        <Card
            sx={{
                maxWidth: 700,
                mx: "auto",
                mt: 10,
                borderRadius: 3,
                overflow: "hidden",
                backdropFilter: "blur(15px)",
                backgroundColor: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            }}
        >
            {/* Header */}
            <CardHeader
                title={
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: 0.5,
                            color: "#1e3a8a",
                            textAlign: "center",
                        }}
                    >
                        Edit Location
                    </Typography>
                }
                sx={{
                    background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(147,197,253,0.15))",
                    py: 3,
                    px: 4,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    backdropFilter: "blur(5px)",
                }}
            />

            <Divider sx={{ borderColor: "rgba(0,0,0,0.08)" }} />

            <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
                <Stack spacing={4}>
                    <TextField
                        label="Latitude"
                        name="latitude"
                        type="number"
                        inputProps={{ min: -90, max: 90, step: 0.000001 }}
                        value={localLocation[0]}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "14px",
                                backgroundColor: "rgba(255,255,255,0.8)",
                                backdropFilter: "blur(5px)",
                            },
                        }}
                    />

                    <TextField
                        label="Longitude"
                        name="longitude"
                        type="number"
                        inputProps={{ min: -180, max: 180, step: 0.000001 }}
                        value={localLocation[1]}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "14px",
                                backgroundColor: "rgba(255,255,255,0.8)",
                                backdropFilter: "blur(5px)",
                            },
                        }}
                    />

                    <FreeMapSelector location={localLocation} setLocation={handleLocationChange} />

<TextField
  label="Additional Address Note"
  value={listingDetails.addressNote || ""}
  onChange={(e) =>
    setListingDetails((prev) => ({ ...prev, addressNote: e.target.value }))
  }
  fullWidth
  margin="normal"
  variant="outlined"
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      backgroundColor: "rgba(255,255,255,0.8)",
      backdropFilter: "blur(5px)",
    },
  }}
/>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={3} justifyContent="flex-end">
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={onCancel}
                            sx={{
                                borderRadius: "14px",
                                textTransform: "none",
                                px: 4,
                                py: 1.5,
                                fontWeight: 500,
                                borderColor: "rgba(0,0,0,0.15)",
                                color: "#374151",
                                backdropFilter: "blur(5px)",
                                backgroundColor: "rgba(255,255,255,0.5)",
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.7)" },
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                borderRadius: "14px",
                                textTransform: "none",
                                px: 5,
                                py: 1.7,
                                fontWeight: 600,
                                background: "linear-gradient(90deg, #2563eb, #3b82f6)",
                                color: "#fff",
                                boxShadow: "0 6px 20px rgba(59,130,246,0.35)",
                                "&:hover": { boxShadow: "0 8px 25px rgba(59,130,246,0.45)" },
                            }}
                        >
                            Save Location
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
