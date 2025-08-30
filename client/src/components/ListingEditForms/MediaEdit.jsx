import { useRef } from "react";
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
import { useOutletContext } from "react-router-dom";

export default function MediaEdit() {
    const fileInputRef = useRef(null);
    const { listingDetails, setListingDetails, onSave, onCancel } = useOutletContext();
    const API_BASE = "http://localhost:8000";

    const handleAddImage = () => fileInputRef.current.click();

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length) {
            const newEntries = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));

            setListingDetails((prev) => ({
                ...prev,
                images: [...(prev.images || []), ...newEntries],
            }));
        }
    };

    const getSrc = (imgObj) => {
        if (imgObj.preview) return imgObj.preview;
        if (typeof imgObj === "string") return imgObj.startsWith("http") ? imgObj : `${API_BASE}/${imgObj}`;
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
        const existingImages = listingDetails.images.filter((img) => typeof img === "string");
        const newFiles = listingDetails.images.filter((img) => img.file).map((img) => img.file);
        onSave({ ...listingDetails, existingImages }, newFiles);
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
                background: "linear-gradient(135deg, #f3f4f6, #ffffff)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
            }}
        >
            {/* Header with gradient overlay */}
            <CardHeader
                title={
                    <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 0.5, color: "#1f2937" }}>
                        Edit Media
                    </Typography>
                }
                sx={{
                    background: "linear-gradient(90deg, rgba(59,130,246,0.15), rgba(99,102,241,0.15))",
                    py: 3,
                    px: 5,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
            />

            <Divider sx={{ borderColor: "rgba(0,0,0,0.08)" }} />

            <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#374151" }}>
                            Gallery Images
                        </Typography>

                        <Stack spacing={3}>
                            {(listingDetails.images || []).map((img, index) => {
                                const src = getSrc(img);
                                if (!src) return null;
                                return (
                                    <Stack
                                        key={index}
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={4}
                                        alignItems="center"
                                        sx={{
                                            borderRadius: 3,
                                            padding: 2,
                                            backgroundColor: "#ffffff",
                                            boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
                                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                            "&:hover": { transform: "translateY(-2px)", boxShadow: "0 5px 15px rgba(0,0,0,0.08)" },
                                        }}
                                    >
                                        <img
                                            src={src}
                                            alt={`preview-${index}`}
                                            className="rounded-lg border"
                                            style={{ width: "180px", height: "110px", objectFit: "cover", borderRadius: "12px" }}
                                        />
                                        <IconButton color="error" onClick={() => handleRemoveImage(index)}>
                                            <Delete />
                                        </IconButton>
                                    </Stack>
                                );
                            })}
                        </Stack>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            style={{ display: "none" }}
                            multiple
                        />
                        <Button
                            variant="outlined"
                            onClick={handleAddImage}
                            sx={{
                                textTransform: "none",
                                borderRadius: "12px",
                                py: 1.5,
                                fontWeight: 600,
                                color: "#1d4ed8",
                                borderColor: "#60a5fa",
                                "&:hover": { backgroundColor: "rgba(59,130,246,0.1)", borderColor: "#3b82f6" },
                                width: "fit-content",
                            }}
                        >
                            + Add Image
                        </Button>
                    </Stack>

                    <div className="flex justify-end gap-4 mt-10">
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={onCancel}
                            sx={{
                                borderRadius: "12px",
                                textTransform: "none",
                                px: 4,
                                py: 1.5,
                                fontWeight: 500,
                                color: "#4b5563",
                                borderColor: "#d1d5db",
                                "&:hover": { backgroundColor: "rgba(107,114,128,0.1)" },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: "12px",
                                textTransform: "none",
                                px: 5,
                                py: 1.7,
                                fontWeight: 600,
                                boxShadow: "0 5px 20px rgba(59,130,246,0.25)",
                                "&:hover": { boxShadow: "0 8px 25px rgba(59,130,246,0.35)" },
                            }}
                        >
                            Save Media
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
