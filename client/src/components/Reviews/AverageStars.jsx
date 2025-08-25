
import StarIcon from "@mui/icons-material/Star";
import useReviews from "../../Hooks/useReviews";
import { Box } from "@mui/material"

export default function AverageStars({ id }) {
    const { avgRating } = useReviews(id);

    return (
        <Box display="flex" alignItems="center" gap={1}>
            {/* Stars */}
            <Box display="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                        key={star}
                        sx={{
                            color: star <= Math.round(avgRating) ? "#facc15" : "#e5e7eb",
                            fontSize: 28,
                        }}
                    />
                ))}
            </Box>
        </Box>

    );
}