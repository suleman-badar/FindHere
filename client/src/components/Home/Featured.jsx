import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Carousel from "../Carousel";
import ListingCard from "./ListingCard";
import ListingSkeleton from "../Skeletons/ListingSkeleton";
import api from "../../api/axios";
import { forwardRef} from "react";


const Featured = forwardRef(({ selectedCategory }, ref) => {

    const fetchListings = async () => {
        const url = selectedCategory
            ? `/api/review/listings-with-reviews?category=${selectedCategory}`
            : "/api/review/listings-with-reviews";

        const res = await api.get(url);
        return res.data;
    };

    const { data: listings, isLoading, error } = useQuery({
        queryKey: ["featuredListings", selectedCategory],
        queryFn: fetchListings,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });

    return (
        <Box ref={ref} sx={{ p: 4, textAlign: "center", position: "relative" }}>
            {isLoading ? (
                <>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Featured Locations
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Loading featured locations...
                    </Typography>

                    <Carousel>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
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
                        {listings?.map((listing) => (
                            <ListingCard key={listing?._id} listing={listing} />
                        ))}
                    </Carousel>
                </>
            )}
        </Box>
    );
}
);

export default Featured;   