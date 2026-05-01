import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    TextField,
    Button,
    Divider,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    OutlinedInput,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import useDetails from "../../Hooks/useDetails";
import api from "../../api/axios";

const cuisines = ["Italian", "Chinese", "Fast Food", "Cafe", "Indian", "Mexican", "Japanese"];

export default function BasicInfoEdit() {
    const { placeId } = useParams();
    const navigate = useNavigate();
    const { details, loading, error } = useDetails(placeId);
    const [listingDetails, setListingDetails] = useState({});

    useEffect(() => {
        if (details) {
            setListingDetails(details);
        }
    }, [details]);

    const onSave = async (data) => {
        try {
            await api.put(`/api/listing/update-listing/${placeId}`, data, {
                withCredentials: true,
            });
            toast.success("Listing updated successfully");
            navigate("/admin/dashboard");
        } catch (err) {
            toast.error("Failed to update listing");
        }
    };

    const onCancel = () => {
        navigate("/admin/dashboard");
    };

    if (loading) return <Loader />;
    if (error) return <div>Error loading listing</div>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setListingDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleCuisineChange = (event) => {
        const { value } = event.target;
        setListingDetails((prev) => ({
            ...prev,
            cuisine: typeof value === "string" ? value.split(",") : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(listingDetails);
    };

    // ✅ FIXED: focus outline (removes blue border, uses your theme color)
    const fieldSx = {
        "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            backgroundColor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(5px)",

            // default border
            "& fieldset": {
                borderColor: "var(--color-border)",
            },

            // hover border
            "&:hover fieldset": {
                borderColor: "var(--color-primary)",
            },

            // focused border (THIS removes blue outline issue)
            "&.Mui-focused fieldset": {
                borderColor: "var(--color-primary)",
            },
        },

        // label focus color fix
        "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--color-primary)",
        },
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
                backgroundColor: "rgba(255,255,255,0.6)", // ✅ KEPT ORIGINAL STYLE
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
                            color: "var(--color-primary)",
                        }}
                    >
                        Edit General Information
                    </Typography>
                }
                sx={{
                    background: "linear-gradient(135deg, rgba(185,28,28,0.15), rgba(255,112,67,0.15))",
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
                    <Stack spacing={4}>
                        {/* Restaurant Name */}
                        <TextField
                            label="Restaurant Name"
                            name="name"
                            value={listingDetails.name || ""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={fieldSx}
                        />

                        {/* Tagline */}
                        <TextField
                            label="Tagline (optional)"
                            name="tagline"
                            value={listingDetails.tagline || ""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={fieldSx}
                        />

                        {/* Description */}
                        <TextField
                            label="Description"
                            name="description"
                            value={listingDetails.description || ""}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={5}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={fieldSx}
                        />

                        {/* Cuisine Type */}
                        <FormControl fullWidth>
                            <InputLabel shrink>Cuisine Type</InputLabel>
                            <Select
                                multiple
                                value={listingDetails.cuisine || []}
                                onChange={handleCuisineChange}
                                input={<OutlinedInput label="Cuisine Type" />}
                                renderValue={(selected) => (
                                    <div className="flex flex-wrap gap-1">
                                        {selected.map((value) => (
                                            <Chip
                                                key={value}
                                                label={value}
                                                size="small"
                                                sx={{
                                                    backgroundColor: "rgba(255,112,67,0.12)",
                                                    color: "var(--color-accent)",
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                                sx={{
                                    borderRadius: "14px",
                                    backgroundColor: "rgba(255,255,255,0.8)",
                                    "& fieldset": {
                                        borderColor: "var(--color-border)",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "var(--color-primary)",
                                    },
                                }}
                            >
                                {cuisines.map((cuisine) => (
                                    <MenuItem key={cuisine} value={cuisine}>
                                        {cuisine}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Established Year */}
                        <TextField
                            label="Established Year"
                            name="establishedYear"
                            type="number"
                            value={listingDetails.establishedYear || ""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={fieldSx}
                        />
                    </Stack>

                    {/* Actions */}
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
                                backgroundColor: "rgba(255,255,255,0.5)",
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.7)",
                                },
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
                                background: "var(--gradient-primary)",
                                color: "#fff",
                                boxShadow: "0 6px 20px rgba(185,28,28,0.35)",
                                "&:hover": {
                                    boxShadow: "0 8px 25px rgba(185,28,28,0.45)",
                                },
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