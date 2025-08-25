import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Box, Dialog, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";

const ImageGallery = forwardRef(({ details, previewCount = 4 }, ref) => {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = details?.images || [];

    const handleOpen = (index = 0) => {
        setCurrentIndex(index);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const showPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const showNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    useImperativeHandle(ref, () => ({
        openGallery: (index = 0) => handleOpen(index),
    }));

    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, images.length]);

    return (
        <Box className="flex flex-col justify-center items-center">
            {/* Thumbnails */}
            <Box sx={{ display: "flex", gap: 1, overflowX: "auto" }}>
                {images.slice(0, previewCount).map((url, idx) => (
                    <img
                        key={idx}
                        src={url}
                        alt={`image-${idx}`}
                        className="w-34 h-34 object-cover rounded-lg border cursor-pointer"
                        onClick={() => handleOpen(idx)}
                    />
                ))}

                {images.length > previewCount && (
                    <Box
                        onClick={() => handleOpen(0)}
                        className="w-24 h-24 flex items-center justify-center rounded-lg border cursor-pointer bg-gray-100 text-sm font-medium"
                    >
                        +{images.length - previewCount} More
                    </Box>
                )}
            </Box>

            {/* Modal */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        backgroundColor: "black",
                        position: "relative",
                        overflow: "hidden",
                    },
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{ position: "absolute", top: 10, right: 10, color: "white" }}
                >
                    <Close />
                </IconButton>

                <IconButton
                    onClick={showPrev}
                    sx={{ position: "absolute", top: "50%", left: 10, color: "white" }}
                >
                    <ArrowBack />
                </IconButton>

                <IconButton
                    onClick={showNext}
                    sx={{ position: "absolute", top: "50%", right: 10, color: "white" }}
                >
                    <ArrowForward />
                </IconButton>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
                    <img
                        src={images[currentIndex]}
                        alt={`image-${currentIndex}`}
                        style={{
                            maxWidth: "80%",
                            maxHeight: "80vh",
                            borderRadius: "8px",
                        }}
                    />
                </Box>
            </Dialog>
        </Box>
    );
});

export default ImageGallery;
