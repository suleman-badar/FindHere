import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    TextField,
    Button,
    Box,
    Avatar,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import axios from "axios";
import userImg from "../assets/user.png";
import { useParams } from "react-router-dom";
import { reviewValidations } from "../validations/reviewValidations";
import AverageRating from "../components/Reviews/AverageRating";
import AverageStars from "../components/Reviews/AverageStars";
import { useNavigate } from "react-router-dom";




export default function ReviewForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        // Validation for form
        await reviewValidations.validate(
            { rating, reviewText, name, image },
            { abortEarly: false }
        );


        //posting data to database
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("rating", rating);
            formData.append("reviewText", reviewText);
            formData.append("name", name);
            if (image) {
                formData.append("image", image);
            } else {
                formData.append("image", userImg);
            }

            await axios.post(`http://localhost:8000/api/review/create-review/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Review submitted successfully!");
            setRating(0);
            setHoverRating(0);
            setReviewText("");
            setName("");
            setImage(null);
        } catch (err) {
            if (err.name === "ValidationError") {
                alert(err.errors.join("\n"));
            } else {
                console.error("Error posting review:", err);
                alert("Failed to submit review.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-lg rounded-2xl">
            <CardHeader
                title={
                    <Typography variant="h6" className="font-semibold">
                        Write a Review
                    </Typography>
                }
                subheader={
                    <Box className="flex gap-4 items-center">
                        <AverageStars id={id} />
                        <AverageRating id={id} />
                    </Box>
                }
            />
            <CardContent>
                <Box display="flex" gap={2} mb={3} alignItems="center">
                    <Avatar
                        src={image}
                        alt={name || "Anonymous"}
                        sx={{ width: 50, height: 50 }}
                    />
                    <TextField
                        label="Your Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="outlined"
                        component="label"
                    >
                        Upload
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Button>
                </Box>

                <Box display="flex" alignItems="center" mb={3}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Box
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            sx={{ cursor: "pointer" }}
                        >
                            {star <= (hoverRating || rating) ? (
                                <Star sx={{ color: "#facc15", fontSize: 32 }} />
                            ) : (
                                <StarBorder sx={{ color: "#facc15", fontSize: 32 }} />
                            )}
                        </Box>
                    ))}
                </Box>

                <TextField
                    label="Write your review..."
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />

                <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setReviewText("");
                            setName("");
                            setImage(null);
                            navigate(-1);
                        }}


                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Review"}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
