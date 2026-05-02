import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import useReviews from "../../Hooks/useReviews";
import { useQueryClient } from '@tanstack/react-query';
import StarRating from "../Reviews/StarRating";
import {
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Loader from "../Loader";
import useDetails from "../../Hooks/useDetails";

export default function ListingReviewsEdit() {
    const { placeId } = useParams();
    const navigate = useNavigate();
    const { loading, error } = useDetails(placeId);
    const queryClient = useQueryClient();
    const { reviews = [] } = useReviews(placeId);

    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        try {
            await api.delete(`/api/review/delete/${reviewId}`, {
                withCredentials: true,
            });

            toast.success("Review deleted successfully");
            // invalidate cached reviews for this listing so UI updates
            queryClient.invalidateQueries(["reviews", placeId]);
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to delete review"
            );
        }
    };

    if (loading) return <Loader />;
    if (error) return <div>Error loading listing</div>;

    return (
        <Box
            sx={{
                backgroundColor: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "16px",
                p: 3,
                maxHeight: "500px",
                overflowY: "auto",
                backdropFilter: "blur(15px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            }}
        >
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <Box
                        key={review._id}
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            justifyContent: "space-between",
                            alignItems: { xs: "flex-start", sm: "center" },
                            p: 2,
                            mb: 2,
                            borderRadius: "14px",
                            border: "1px solid var(--color-border)",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                            },
                        }}
                    >
                        {/* Left Side */}
                        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                            <img
                                src={review.image || "/default-user.png"}
                                alt={review.name || "Anonymous"}
                                style={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "2px solid var(--color-primary)",
                                }}
                            />

                            <Box sx={{ ml: 2 }}>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {review.name || "Anonymous"}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: 12,
                                        color: "var(--color-muted)",
                                    }}
                                >
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </Typography>

                                <StarRating
                                    rating={Math.round(review.rating)}
                                    size={20}
                                />

                                <Typography
                                    sx={{
                                        mt: 1,
                                        color: "var(--color-text)",
                                    }}
                                >
                                    {review.reviewText}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Delete */}
                        <IconButton
                            onClick={() => handleDelete(review._id)}
                            sx={{
                                mt: { xs: 2, sm: 0 },
                                color: "var(--color-primary)",
                                "&:hover": {
                                    backgroundColor:
                                        "rgba(185,28,28,0.08)",
                                },
                            }}
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                ))
            ) : (
                <Typography
                    sx={{
                        textAlign: "center",
                        py: 3,
                        color: "var(--color-muted)",
                    }}
                >
                    No reviews yet.
                </Typography>
            )}
        </Box>
    );
}