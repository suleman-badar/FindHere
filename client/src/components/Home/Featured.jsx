import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Carousel from "../Carousel";
import ListingCard from "./ListingCard";
import ListingSkeleton from "../Skeletons/ListingSkeleton";
import api from "../../api/axios";

export default function Featured({ selectedCategory = null }) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchListings() {
            setLoading(true);
            try {
                const url = selectedCategory ? `/api/review/listings-with-reviews?category=${selectedCategory}` : "/api/review/listings-with-reviews";
                const res = await api.get(url);
                setListings(res.data);
            } catch (err) {
                console.error("Failed to fetch listings:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchListings();
    }, [selectedCategory]);

    
    return (
        <Box sx={{ p: 4, textAlign: "center", position: "relative" }}>
            {loading ? (
                <>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Featured Locations
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Loading featured locations...
                    </Typography>
                    <Carousel>
                        {[1, 2, 3, 4, 5 , 6].map((i) => (
                            <ListingSkeleton key={i} />
                        ))}
                    </Carousel>
                </>
            ) : (
                <>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Featured Locations
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Explore the most popular and highest-rated destinations based on Google reviews and community feedback.
                    </Typography>

                    <Carousel>
                        {listings.map((listing) => (
                            <ListingCard key={listing?._id} listing={listing} />
                        ))}
                    </Carousel>
                </>
            )}
        </Box>
    );

}
