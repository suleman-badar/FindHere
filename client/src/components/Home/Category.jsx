import FilterCard from "./FilterCard";
import { Box, Typography } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ParkIcon from "@mui/icons-material/Park";
import StoreIcon from '@mui/icons-material/Store';
import MuseumIcon from '@mui/icons-material/Museum';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export default function Category() {
    const categories = [
        { name: "Restaurants", icon: <RestaurantIcon fontSize="small" sx={{ color: "red" }} /> },
        { name: "Hotels", icon: <HotelIcon fontSize="small" sx={{ color: "blue" }} /> },
        { name: "Cafes", icon: <LocalCafeIcon fontSize="small" sx={{ color: "brown" }} /> },
        { name: "Parks", icon: <ParkIcon fontSize="small" sx={{ color: "green" }} /> },
        { name: "Shopping", icon: <StoreIcon fontSize="small" sx={{ color: "teal" }} /> },
        { name: "Museums", icon: <MuseumIcon fontSize="small" sx={{ color: "purple" }} /> },
        { name: "Gyms", icon: <FitnessCenterIcon fontSize="small" sx={{ color: "orange" }} /> },
    ];

    return (
        <Box
            sx={{
                p: 4,
                px: 10,
                backgroundColor: "#F8F9FA",
                textAlign: "center",
                position: "relative",
            }}
        >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Explore By Category
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
                Browse locations by type and discover new places that match your interests.
            </Typography>

            <Box sx={{ position: "relative", overflow: "hidden" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        overflowX: "auto",
                        gap: 2,
                        py: 2,
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {categories.map((cat, index) => (
                        <FilterCard key={index} name={cat.name} icon={cat.icon} />
                    ))}
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 15,
                        height: "100%",
                        background: "linear-gradient(to right, #F8F9FA 10%, transparent)",
                        pointerEvents: "none",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 15,
                        height: "100%",
                        background: "linear-gradient(to left, #F8F9FA 5%, transparent)",
                        pointerEvents: "none",
                    }}
                />
            </Box>
        </Box>
    );
}
