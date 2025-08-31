// GallerySection.jsx
import { Box, Typography, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function GallerySection({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    if (!images || images.length === 0) return null;

    return (
        <Box className="my-8 w-full flex flex-col items-center">


            <Box className="relative w-full max-w-4xl overflow-hidden rounded-lg">
                <img
                    src={images[currentIndex]}
                    alt={`Gallery ${currentIndex + 1}`}
                    className="w-full h-80 sm:h-96 object-cover transition-all duration-500"
                />

                {/* Previous Button - extreme left */}
                <Box className="flex justify-around mt-8">
                    <IconButton
                        onClick={handlePrev}
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 ml-2 bg-white/70 hover:bg-white shadow-lg z-20"
                        size="large"
                    >
                        <ArrowBackIosNewIcon fontSize="medium" />
                    </IconButton>

                    {/* Next Button - extreme right */}
                    <IconButton
                        onClick={handleNext}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-2 bg-white/70 hover:bg-white shadow-lg z-20"
                        size="large"
                    >
                        <ArrowForwardIosIcon fontSize="medium" />
                    </IconButton>
                </Box>
            </Box>

            {/* Pagination dots */}
            <Box className="flex gap-2 mt-3">
                {images.map((_, idx) => (
                    <Box
                        key={idx}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${idx === currentIndex ? "bg-blue-600" : "bg-gray-300"
                            }`}
                        onClick={() => setCurrentIndex(idx)}
                    />
                ))}
            </Box>
        </Box>
    );
}
