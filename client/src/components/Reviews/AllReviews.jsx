import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import StarRating from "./StarRating";

export default function AllReviews({
    id,
    containerClass = "",        // Tailwind / custom class for outer container
    containerSx = {},           // MUI sx for outer container
    reviewBoxClass = "",        // Tailwind / custom class for review box
    reviewBoxSx = {},           // MUI sx for review box
    imageClass = "",            // Tailwind / custom class for user image
    imageSx = {},               // MUI sx for user image
    nameClass = "",             // Tailwind / custom class for reviewer name
    nameSx = {},                // MUI sx for reviewer name
    dateClass = "",             // Tailwind / custom class for date
    dateSx = {},                // MUI sx for date
    textClass = "",             // Tailwind / custom class for review text
    textSx = {},                // MUI sx for review text
    ratingClass = "",           // Tailwind / custom class for star rating
    ratingSx = {},              // MUI sx for star rating
    showDate = true,
    showImage = true,
    showRating = true
}) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/review/all-review/${id}`);
                setReviews(res.data || []);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        };
        fetchReviews();
    }, [id]);

    return (
        <Box className={containerClass} sx={containerSx}>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <Box
                        key={review._id}
                        className={reviewBoxClass || "flex bg-gray-100 w-full min-h-[180px] rounded-lg p-4 mb-4"}
                        sx={reviewBoxSx}
                    >
                        {showImage && (
                            <Box className={imageClass || "h-full w-[10%]"} sx={imageSx}>
                                <img
                                    src={review.image || "/default-user.png"}
                                    alt={review.name || "Anonymous"}
                                    className="h-full w-full object-cover rounded-full"
                                    style={imageSx}
                                />
                            </Box>
                        )}
                        <Box className="ml-4 flex flex-col justify-around">
                            <Box>
                                <Box className={nameClass} sx={nameSx}>
                                    {review.name || "Anonymous"}
                                </Box>
                                {showDate && (
                                    <Box className={dateClass} sx={dateSx}>
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </Box>
                                )}
                                {showRating && (
                                    <Box className={ratingClass} sx={ratingSx}>
                                        <StarRating rating={Math.round(review.rating)} size={24} />
                                    </Box>
                                )}
                            </Box>
                            <Box className={textClass} sx={textSx}>
                                {review.reviewText}
                            </Box>
                        </Box>
                    </Box>
                ))
            ) : (
                <Typography className="text-gray-500 my-4">No reviews yet. Be the first to write one!</Typography>
            )}
        </Box>
    );
}
