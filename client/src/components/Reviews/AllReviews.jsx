import StarRating from "./StarRating"
import axios from "axios"
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material"

export default function AllReviews({ id }) {
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/review/all-review/${id}`);
                setReviews(res.data);
            } catch (err) {
                console.error("Error fetching revies:", err);
            }
        }
        fetchReviews();
    }, [id]);

    return (
        <Box>
            {reviews && reviews.length > 0 ? (
                reviews?.map((review) => (
                    <Box key={review._id} className="flex bg-gray-100 w-[90%] min-h-[180px] rounded-lg p-4 mb-4">
                        <Box className="h-full w-[10%]">
                            <img
                                src={review.image || "/default-user.png"}
                                alt={review.name || "Anonymous"}
                                className="h-full w-full object-cover rounded-full"
                            />
                        </Box>
                        <Box className="ml-4 flex flex-col justify-around">
                            <Box>
                                <Box className="font-semibold">{review.name || "Anonymous"}</Box>
                                <Box className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</Box>
                                <StarRating rating={Math.round(review.rating)} size={24} />
                            </Box>
                            <Box className="text-gray-700">{review.reviewText}</Box>
                        </Box>
                    </Box>
                ))) :
                <Typography className="text-gray-500 my-4">
                    No reviews yet. Be the first to write one!
                </Typography>
            }


        </Box>

    );
}