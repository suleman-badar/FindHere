import { Box } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

export default function StarRating({ rating = 0, maxStars = 5, size = 18 }) {
    const safeRating = Math.min(Math.max(rating, 0), maxStars);

    return (
        <Box className="flex gap-0.5">
            {[...Array(safeRating)].map((_, i) => (
                <Star key={i} sx={{ color: "#dae020ff", fontSize: size }} />
            ))}

            {[...Array(maxStars - safeRating)].map((_, i) => (
                <StarBorder key={i} sx={{ color: "#d1d5db", fontSize: size }} />
            ))}
        </Box>
    );
}
