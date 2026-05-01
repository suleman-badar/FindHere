import {
    Card,
    CardContent,
    Typography,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Chip,
    MenuItem,
    Select,
    OutlinedInput,
    Box,
    Stack,
    Divider,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import useDetails from "../../Hooks/useDetails";
import api from "../../api/axios";

const tagsOptions = [
    "Family Friendly",
    "Romantic",
    "Vegan Options",
    "Pet Friendly",
    "Casual",
];

const amenitiesOptions = [
    "Wifi",
    "Parking",
    "Live Music",
    "Air Conditioning",
];

export default function TagsEdit() {
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
            await api.put(
                `/api/listing/update-listing/${placeId}`,
                data,
                { withCredentials: true }
            );

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

    const handleCheckboxChange = (field, option, checked) => {
        let updated = listingDetails[field]
            ? [...listingDetails[field]]
            : [];

        if (checked) {
            if (!updated.includes(option)) updated.push(option);
        } else {
            updated = updated.filter((o) => o !== option);
        }

        setListingDetails({ ...listingDetails, [field]: updated });
    };

    const fieldSx = {
        "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            backgroundColor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(5px)",

            "& fieldset": {
                borderColor: "rgba(0,0,0,0.15)",
            },

            "&:hover fieldset": {
                borderColor: "var(--color-primary)",
            },

            "&.Mui-focused fieldset": {
                borderColor: "var(--color-primary)",
            },
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--color-primary)",
        },
    };

    const checkboxSx = {
        color: "var(--color-muted)",
        "&.Mui-checked": {
            color: "var(--color-primary)",
        },
    };

    return (
        <Card
            sx={{
                maxWidth: 900,
                mx: "auto",
                mt: 10,
                borderRadius: 4,
                overflow: "hidden",
                backdropFilter: "blur(15px)",
                backgroundColor: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            }}
        >
            {/* HEADER */}
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    textAlign: "center",
                    py: 3,
                    background:
                        "linear-gradient(135deg, rgba(185,28,28,0.12), rgba(255,112,67,0.12))",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
            >
                Edit Tags & Amenities
            </Typography>

            <Divider sx={{ borderColor: "rgba(0,0,0,0.08)" }} />

            <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
                <Stack spacing={4}>
                    {/* TAGS */}
                    <FormGroup>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                mb: 1,
                                color: "var(--color-text)",
                            }}
                        >
                            Tags
                        </Typography>

                        <Select
                            multiple
                            fullWidth
                            value={listingDetails?.tags || []}
                            onChange={(e) =>
                                setListingDetails({
                                    ...listingDetails,
                                    tags: e.target.value,
                                })
                            }
                            input={
                                <OutlinedInput label="Tags" sx={fieldSx} />
                            }
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.5,
                                    }}
                                >
                                    {selected.map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                        />
                                    ))}
                                </Box>
                            )}
                        >
                            {tagsOptions.map((tag) => (
                                <MenuItem key={tag} value={tag}>
                                    {tag}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormGroup>

                    {/* AMENITIES */}
                    <FormGroup>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                color: "var(--color-text)",
                            }}
                        >
                            Amenities
                        </Typography>

                        {amenitiesOptions.map((amenity) => (
                            <FormControlLabel
                                key={amenity}
                                control={
                                    <Checkbox
                                        sx={checkboxSx}
                                        checked={
                                            listingDetails?.amenities?.includes(
                                                amenity
                                            ) || false
                                        }
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                "amenities",
                                                amenity,
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label={amenity}
                            />
                        ))}
                    </FormGroup>

                    {/* ACTIONS */}
                    <Stack
                        direction="row"
                        spacing={3}
                        justifyContent="flex-end"
                        sx={{ mt: 4 }}
                    >
                        <Button
                            variant="outlined"
                            onClick={onCancel}
                            sx={{
                                borderRadius: "14px",
                                textTransform: "none",
                                px: 4,
                                color: "var(--color-muted)",
                                borderColor: "var(--color-border)",
                                backgroundColor:
                                    "rgba(255,255,255,0.5)",
                                "&:hover": {
                                    backgroundColor:
                                        "rgba(255,255,255,0.7)",
                                },
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            disabled={loading}
                            onClick={() => onSave(listingDetails)}
                            sx={{
                                borderRadius: "14px",
                                textTransform: "none",
                                px: 5,
                                fontWeight: 600,
                                background: "var(--gradient-primary)",
                                boxShadow:
                                    "0 6px 20px rgba(185,28,28,0.35)",
                                "&:hover": {
                                    boxShadow:
                                        "0 8px 25px rgba(185,28,28,0.45)",
                                },
                            }}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}