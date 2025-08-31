// ReviewsSection.jsx
import { Box, Typography } from "@mui/material";
import AverageStars from "../Reviews/AverageStars.jsx";
import AverageRating from "../Reviews/AverageRating.jsx";
import AllReviews from "../Reviews/AllReviews.jsx";
import Btn from "../Btn.jsx";
import { useNavigate } from "react-router-dom";

export default function ReviewSection({ listingId }) {
    const navigate = useNavigate();

    const handleWriteReview = () => {
        navigate(`/review/create-review/${listingId}`);
    };

    return (
        <Box className="my-8 px-4 sm:px-8 md:px-16">

            <Box className="flex items-center  justify-center gap-4 mb-6">
                <AverageStars id={listingId} />
                <AverageRating id={listingId} />
            </Box>

            <AllReviews id={listingId} />

            <Box className="flex justify-center mt-4">
                <Btn text="Write a Review" onClick={handleWriteReview} />
            </Box>
        </Box>
    );
}
