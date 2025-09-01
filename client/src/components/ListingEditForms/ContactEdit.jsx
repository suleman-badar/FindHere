import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Grid,
    TextField,
    Button,
    Divider,
    Stack,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";
import Loader from "../Loader";

export default function ContactEdit() {
    const { listingDetails, setListingDetails, loading, onSave, onCancel } = useOutletContext();

    if (loading || !listingDetails) return <Loader />;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setListingDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(listingDetails);
    };

    return (
        <Card
            sx={{
                maxWidth: 900,
                mx: "auto",
                mt: 10,
                borderRadius: 3,
                overflow: "hidden",
                backdropFilter: "blur(15px)",
                backgroundColor: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                transition: "all 0.3s ease",

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
                        }}
                    >
                        Edit Contact Info
                    </Typography>
                }
                sx={{
                    background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(147,197,253,0.15))",
                    py: 3,
                    px: 5,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    backdropFilter: "blur(5px)",
                }}
            />

            <Divider sx={{ borderColor: "rgba(0,0,0,0.08)" }} />

            {/* Content */}
            <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Phone Number"
                                name="number"
                                value={listingDetails.phone || ""}
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                name="email"
                                value={listingDetails.email || ""}
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Website"
                                name="website"
                                value={listingDetails.website || ""}
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
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={3} justifyContent="flex-end" sx={{ mt: 10 }}>
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
                            Save Changes
                        </Button>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
}
