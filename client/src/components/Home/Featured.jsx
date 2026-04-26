import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import HoverCard from "./HoverCard";
import Carousel from "../Carousel";
import Loader from "../Loader";
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
                <Loader />
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
                            <HoverCard
                                key={listing?._id}
                                id={listing?._id}
                                name={listing?.name}
                                image={listing?.images?.[0]}
                                averageRating={listing?.averageRating}
                                reviewCount={listing?.reviewCount}
                            // locationLat={listing?.location[0]}
                            // locationLon={listing?.location[1]}

                            />
                        ))}
                    </Carousel>
                </>
            )}
        </Box>
    );

}
