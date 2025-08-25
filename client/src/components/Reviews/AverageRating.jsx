import { Box, Typography } from "@mui/material";
import useReviews from "../../Hooks/useReviews";

export default function AverageRating({ id }) {
    const { avgRating, totalReviews } = useReviews(id);
    return (
        <Box>
            <Typography variant="body1" color="textSecondary">
                {avgRating.toFixed(1)} ({totalReviews} reviews)
            </Typography>
        </Box>
    );
}
