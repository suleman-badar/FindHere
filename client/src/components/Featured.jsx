import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import FeaturedCard from "./FeaturedCard";
import Carousel from "./Carousel";
import Loader from "../components/Loader";
import axios from "axios";

export default function Featured() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/listing/all-listing");
                setListings(res.data);
            }
            catch (err) {
                console.error("Error fetching listings:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, []);

    return (
        <Box sx={{ p: 4, backgroundColor: "#d0d0d0", textAlign: "center", position: "relative" }}>
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
                            <FeaturedCard id={listing._id} name={listing.name} image={listing.images[0]} />
                        ))}
                    </Carousel>
                </>
            )}
        </Box>
    );

}
