// HeroSection.jsx
import { Box, Typography, Chip } from "@mui/material";

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

                {/* Stronger Gradient overlay */}
                <Box className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-0"></Box>

                {/* Text overlay */}
                <Box className="absolute bottom-6 left-6 sm:left-12 sm:bottom-12 z-20 space-y-4">
                    {/* Title */}
                    <Typography
                        variant="h2"
                        className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl drop-shadow-2xl leading-tight"
                    >
                        {details?.name}
                    </Typography>

                    {/* Tagline */}
                    {details?.tagline && (
                        <Typography
                            variant="subtitle1"
                            className="text-gray-200/90 italic mt-1 sm:mt-2 text-lg sm:text-xl drop-shadow-md max-w-lg"
                        >
                            “{details.tagline}”
                        </Typography>
                    )}

                    {/* Cuisine Chips */}

                    {details?.cuisine?.length > 0 && (
                        <Box className="flex flex-wrap gap-2 mt-2 ">
                            {details.cuisine.map((c, idx) => (
                                <Chip
                                    key={idx}
                                    label={c}
                                    size="small"
                                    sx={{
                                        backgroundColor: "rgba(0,0,0,0.4)",
                                        color: "#fff",
                                        fontWeight: 500,
                                        backdropFilter: "blur(6px)",
                                        border: "1px solid rgba(255,255,255,0.3)"
                                    }}
                                />


                            ))}
                        </Box>
                    )}


                    {/* Price Box with glassmorphism */}
                    {details?.price !== undefined && details?.price !== null && (
                        <Box className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/30 mt-2">
                            <Typography
                                variant="body1"
                                className="text-gray-100 font-medium text-sm sm:text-base"
                            >
                                Average Price for One
                            </Typography>
                            <Typography
                                variant="h5"
                                className="text-yellow-300 font-bold text-xl sm:text-2xl"
                            >
                                Rs. {details.price}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
