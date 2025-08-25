import { useState, useEffect } from "react";
import axios from "axios";

export default function useReviews(id) {
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/review/all-review/${id}`);
                const reviewsData = res.data || [];

                setReviews(reviewsData);

                const total = reviewsData.length;
                const avg =
                    total > 0
                        ? reviewsData.reduce((acc, r) => acc + r.rating, 0) / total
                        : 0;

                setTotalReviews(total);
                setAvgRating(avg);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        };

        if (id) fetchReviews();
    }, [id]);

    return { reviews, avgRating, totalReviews };
}
