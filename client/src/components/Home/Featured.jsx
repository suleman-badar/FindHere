import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Carousel from "../Carousel";
import ListingCard from "./ListingCard";
import ListingSkeleton from "../Skeletons/ListingSkeleton";
// Loader replaced by skeleton placeholders for better UX
import api from "../../api/axios";

export default function Featured() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchListings() {
            try {
                const res = await api.get("/api/review/listings-with-reviews");
                setListings(res.data);
            } catch (err) {
                console.error("Failed to fetch listings:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchListings();
    }, []);



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
                        {[1, 2, 3, 4].map((i) => (
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
