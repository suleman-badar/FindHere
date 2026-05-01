import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import StarRating from "../Reviews/StarRating";
import { Box, Typography, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Loader from "../Loader";
import useDetails from "../../Hooks/useDetails";

export default function ListingReviewsEdit() {
    const { placeId } = useParams();
    const navigate = useNavigate();
    const { details, loading, error } = useDetails(placeId);
    const [reviews, setReviews] = useState([]);

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await api.get(`/api/review/all-review/${placeId}`);
                setReviews(res.data || []);
            } catch (err) {
                console.error(err);
                setReviews([]);
            }
        };
        fetchReviews();
    }, [placeId]);

    const onSave = async (data) => {
        // For reviews, maybe no save needed, just navigate
        navigate('/admin/dashboard');
    };

    const onCancel = () => {
        navigate('/admin/dashboard');
    };

    if (loading) return <Loader />;
    if (error) return <div>Error loading listing</div>;

    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        try {
            await api.delete(`/api/review/delete/${reviewId}`, { withCredentials: true });
            toast.success("Review deleted successfully");
            setReviews((prev) => prev.filter((r) => r._id !== reviewId));
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete review");
        }
    };

    return (
        <Box className="bg-white p-6 rounded-xl shadow-md max-h-[500px] overflow-y-auto">
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <Box
                        key={review._id}
                        className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-blue-50 p-4 mb-4 rounded-xl hover:shadow-lg transition-shadow relative"
                        sx={{ border: "1px solid var(--color-border)" }}
                    >
                        <Box className="flex items-start sm:items-center">
                            <img
                                src={review.image || "/default-user.png"}
                                alt={review.name || "Anonymous"}
                                className="w-14 h-14 rounded-full border-2 border-blue-500 object-cover"
                            />
                            <Box className="ml-4 flex flex-col">
                                <Typography className="font-semibold text-lg">{review.name || "Anonymous"}</Typography>
                                <Typography className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</Typography>
                                <StarRating rating={Math.round(review.rating)} size={20} />
                                <Typography className="text-gray-700 mt-1">{review.reviewText}</Typography>
                            </Box>
                        </Box>
                        <IconButton
                            onClick={() => handleDelete(review._id)}
                            color="error"
                            className="mt-2 sm:mt-0"
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                ))
            ) : (
                <Typography className="text-gray-500 text-center py-6">No reviews yet.</Typography>
            )}
        </Box>
    );
}
