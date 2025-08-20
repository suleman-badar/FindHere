import { Box, Typography } from "@mui/material";
import FeaturedCard from "./FeaturedCard";
import Carousel from "./Carousel";

export default function Featured() {
    return (
        <Box
            sx={{
                p: 4,
                backgroundColor: "#d0d0d0",
                textAlign: "center",
                position: "relative",
            }}
        >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Featured Locations
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
                Explore the most popular and highest-rated destinations based on Google
                reviews and community feedback.
            </Typography>

            {/* First Row */}
            <Carousel>
                <FeaturedCard />
                <FeaturedCard />
                <FeaturedCard />
                <FeaturedCard />
                <FeaturedCard />
            </Carousel>

            {/* Second Row */}
            <Carousel>
                <FeaturedCard />
                <FeaturedCard />
                <FeaturedCard />
                <FeaturedCard />
            </Carousel>
        </Box>
    );
}
