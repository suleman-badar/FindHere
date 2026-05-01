import { useRef, useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Button,
    Divider,
    Stack,
    IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";
import useDetails from "../../Hooks/useDetails";
import api from "../../api/axios";
import { API_BASE } from "../../api/axios";

export default function MediaEdit() {
    const fileInputRef = useRef(null);
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
            const formData = new FormData();

            Object.keys(data).forEach((key) => {
                if (key !== "images") {
                    formData.append(key, JSON.stringify(data[key]));
                }
            });

            await api.put(
                `/api/listing/update-listing/${placeId}`,
                formData,
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

    const handleAddImage = () => fileInputRef.current.click();

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);

        if (!files.length) return;

        const newEntries = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setListingDetails((prev) => ({
            ...prev,
            images: [...(prev.images || []), ...newEntries],
        }));
    };

    const getSrc = (imgObj) => {
        if (imgObj.preview) return imgObj.preview;
        if (typeof imgObj === "string") {
            if (imgObj.startsWith("http")) return imgObj;
            const path = imgObj.startsWith("/") ? imgObj : `/${imgObj}`;
            return `${API_BASE}${path}`;
        }
        if (imgObj.file) return URL.createObjectURL(imgObj.file);
        return "";
    };

    const handleRemoveImage = (index) => {
        const updated = [...listingDetails.images];
        updated.splice(index, 1);
        setListingDetails((prev) => ({ ...prev, images: updated }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingImages =
            listingDetails.images?.filter((img) => typeof img === "string") ||
            [];

        onSave({ ...listingDetails, existingImages });
        fileInputRef.current.value = "";
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
                        Edit Media
                    </Typography>
                }
                sx={{
                    background:
                        "linear-gradient(135deg, rgba(185,28,28,0.12), rgba(255,112,67,0.12))",
                    py: 3,
                    px: 5,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
            />

            <Divider sx={{ borderColor: "rgba(0,0,0,0.08)" }} />

            <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                color: "var(--color-text)",
                            }}
                        >
                            Gallery Images
                        </Typography>

                        {/* IMAGES */}
                        <Stack spacing={3}>
                            {(listingDetails.images || []).map(
                                (img, index) => {
                                    const src = getSrc(img);
                                    if (!src) return null;

                                    return (
                                        <Stack
                                            key={index}
                                            direction={{
                                                xs: "column",
                                                sm: "row",
                                            }}
                                            spacing={3}
                                            alignItems="center"
                                            sx={{
                                                borderRadius: 3,
                                                p: 2,
                                                backgroundColor:
                                                    "rgba(255,255,255,0.8)",
                                                border:
                                                    "1px solid var(--color-border)",
                                                boxShadow:
                                                    "0 3px 10px rgba(0,0,0,0.06)",
                                                "&:hover": {
                                                    boxShadow:
                                                        "0 6px 18px rgba(0,0,0,0.1)",
                                                },
                                            }}
                                        >
                                            <img
                                                src={src}
                                                alt={`preview-${index}`}
                                                style={{
                                                    width: 180,
                                                    height: 110,
                                                    objectFit: "cover",
                                                    borderRadius: "12px",
                                                }}
                                            />

                                            <IconButton
                                                onClick={() =>
                                                    handleRemoveImage(index)
                                                }
                                                sx={{
                                                    color: "var(--color-primary)",
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Stack>
                                    );
                                }
                            )}
                        </Stack>

                        {/* FILE INPUT */}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            style={{ display: "none" }}
                            multiple
                        />

                        {/* ADD IMAGE BUTTON */}
                        <Button
                            variant="outlined"
                            onClick={handleAddImage}
                            sx={{
                                textTransform: "none",
                                borderRadius: "12px",
                                py: 1.3,
                                fontWeight: 600,
                                color: "var(--color-primary)",
                                borderColor: "var(--color-primary)",
                                "&:hover": {
                                    backgroundColor:
                                        "rgba(185,28,28,0.08)",
                                },
                            }}
                        >
                            + Add Image
                        </Button>
                    </Stack>

                    {/* ACTIONS */}
                    <Stack
                        direction="row"
                        spacing={3}
                        justifyContent="flex-end"
                        sx={{ mt: 10 }}
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
                                boxShadow:
                                    "0 6px 20px rgba(185,28,28,0.35)",
                                "&:hover": {
                                    boxShadow:
                                        "0 8px 25px rgba(185,28,28,0.45)",
                                },
                            }}
                        >
                            Save Media
                        </Button>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
}