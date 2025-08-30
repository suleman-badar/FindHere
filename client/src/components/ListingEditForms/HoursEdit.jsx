import { Card, CardContent, CardHeader, Typography, TextField, Button, Stack, Divider } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import Loader from "../Loader";

export default function HoursEdit() {
    const { listingDetails, setListingDetails, loading, onSave, onCancel } = useOutletContext();

    if (!listingDetails || loading) return <Loader />;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(listingDetails); // send updated hours back to parent / API
    };

    return (
        <Card
            sx={{
                maxWidth: 600,
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
                        Edit Operating Hours
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

            {/* Content */}
            <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <TextField
                            label="Opening Time"
                            type="time"
                            value={listingDetails.openingHours?.open || ""}
                            onChange={(e) =>
                                setListingDetails(prev => ({
                                    ...prev,
                                    openingHours: { ...prev.openingHours, open: e.target.value }
                                }))
                            }
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
                            label="Closing Time"
                            type="time"
                            value={listingDetails.openingHours?.close || ""}
                            onChange={(e) =>
                                setListingDetails(prev => ({
                                    ...prev,
                                    openingHours: { ...prev.openingHours, close: e.target.value }
                                }))
                            }
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
                                Save Hours
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
}
