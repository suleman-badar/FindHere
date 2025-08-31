// HeroSection.jsx
import { Box, Typography, Button } from "@mui/material";

export default function HeroSection({ details }) {
    const mainImage = details?.images?.[0] || "/placeholder.jpg";

    return (
        <Box className="relative w-full rounded-2xl overflow-hidden shadow-2xl mb-10">
            {/* Image Container */}
            <Box className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] overflow-hidden group">
                <img
                    src={mainImage}
                    alt={details?.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <Box className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></Box>

                {/* Text overlay */}
                <Box className="absolute bottom-6 left-6 sm:left-12 sm:bottom-12 z-10">
                    <Typography
                        variant="h2"
                        className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl drop-shadow-xl leading-tight"
                    >
                        {details?.name}
                    </Typography>

                    {details?.tagline && (
                        <Typography
                            variant="subtitle1"
                            className="text-white/80 mt-2 sm:mt-3 text-lg sm:text-xl drop-shadow-md max-w-lg"
                        >
                            {details.tagline}
                        </Typography>
                    )}

                    {/* Optional CTA */}
                    <Box className="mt-4">
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontWeight: 600,
                                borderRadius: "12px",
                                textTransform: "none",
                                boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                            }}
                        >
                            Explore Now
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
