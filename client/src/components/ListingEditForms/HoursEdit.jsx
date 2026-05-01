import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    TextField,
    Button,
    Stack,
    Divider,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Loader from "../Loader";
import useDetails from "../../Hooks/useDetails";
import api from "../../api/axios";

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export default function HoursEdit() {
    const { placeId } = useParams();
    const navigate = useNavigate();

    const { details, loading } = useDetails(placeId);
    const [listingDetails, setListingDetails] = useState({ hours: {} });

    useEffect(() => {
        if (details) setListingDetails(details);
    }, [details]);

    const onSave = async (data) => {
        try {
            await api.put(
                `/api/listing/update-listing/${placeId}`,
                data,
                { withCredentials: true }
            );

            toast.success("Hours updated successfully");
            navigate("/admin/dashboard");
        } catch (err) {
            toast.error("Failed to update hours");
        }
    };

    const onCancel = () => {
        navigate("/admin/dashboard");
    };

    if (loading) return <Loader />;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(listingDetails);
    };

    // ✅ CONSISTENT FIELD STYLE (same as other forms)
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

    return (
        <Card
            sx={{
                maxWidth: 700,
                mx: "auto",
                mt: 8,
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
                            color: "var(--color-primary)",
                            textAlign: "center",
                        }}
                    >
                        Edit Operating Hours
                    </Typography>
                }
                sx={{
                    background:
                        "linear-gradient(135deg, rgba(185,28,28,0.12), rgba(255,112,67,0.12))",
                    py: 3,
                    px: 4,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
            />

            <Divider sx={{ borderColor: "rgba(0,0,0,0.08)" }} />

            <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        {days.map((day) => (
                            <div key={day}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 1, fontWeight: 600 }}
                                >
                                    {day}
                                </Typography>

                                <Stack direction="row" spacing={3}>
                                    <TextField
                                        label="Open"
                                        type="time"
                                        value={
                                            listingDetails.hours?.[day]?.open || ""
                                        }
                                        onChange={(e) =>
                                            setListingDetails((prev) => ({
                                                ...prev,
                                                hours: {
                                                    ...prev.hours,
                                                    [day]: {
                                                        ...prev.hours?.[day],
                                                        open: e.target.value,
                                                    },
                                                },
                                            }))
                                        }
                                        fullWidth
                                        variant="outlined"
                                        sx={fieldSx}
                                    />

                                    <TextField
                                        label="Close"
                                        type="time"
                                        value={
                                            listingDetails.hours?.[day]?.close || ""
                                        }
                                        onChange={(e) =>
                                            setListingDetails((prev) => ({
                                                ...prev,
                                                hours: {
                                                    ...prev.hours,
                                                    [day]: {
                                                        ...prev.hours?.[day],
                                                        close: e.target.value,
                                                    },
                                                },
                                            }))
                                        }
                                        fullWidth
                                        variant="outlined"
                                        sx={fieldSx}
                                    />
                                </Stack>
                            </div>
                        ))}

                        {/* Buttons */}
                        <Stack
                            direction="row"
                            spacing={3}
                            justifyContent="flex-end"
                        >
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
                                    color: "var(--color-muted)",
                                    borderColor: "rgba(0,0,0,0.15)",
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
                                Save Hours
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
}