import React from "react";
import { Card, CardMedia, Box, Typography, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import img from "../assets/s2.jpg"

const HoverCard = ({ name, image, rating, description }) => {
    return (
        <Card
            sx={{
                minWidth: 280,
                height: 320,
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                boxShadow: 3,
                margin: "0.8rem",

                "&:hover .hoverContent": {
                    transform: "translateY(30%)",
                },
            }}
        >
            <CardMedia component="img" height="350" image={img} alt={name} />

            <Box
                className="hoverContent"
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(99, 99, 99, 0.4)",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 2,
                    transform: "translateY(82%)", // initially mostly hidden at bottom
                    transition: "transform 0.4s ease, opacity 0.4s ease",
                    opacity: 1,
                }}
            >
                {/* Bottom name initially visible and slides up */}
                <Typography variant="h6" sx={{ mb: 2 }}>name</Typography>

                {/* Description and rating */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                    <StarIcon sx={{ color: "#082567", mr: 0.5 }} />
                    <StarIcon sx={{ color: "#082567", mr: 0.5 }} />
                    <StarIcon sx={{ color: "#082567", mr: 0.5 }} />
                    <StarIcon sx={{ color: "#082567", mr: 0.5 }} />
                    <StarIcon sx={{ color: "#082567", mr: 0.5 }} />
                </Box>
                <Typography sx={{ fontSize: "0.6rem", mb: 2 }} >4.7(19,987)</Typography>
                <Box sx={{ display: "flex" }}>
                    <LocationOnIcon sx={{ color: "#082567" }}></LocationOnIcon>
                    <Typography variant="body2" sx={{ fontSize: "1rem" }} gutterBottom>Pak, Lhr</Typography>
                </Box>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#082567",
                        width: "60%",
                        color: "white",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        textTransform: "none",
                        boxShadow: 3,
                        mt: 1,
                        "&:hover": {
                            backgroundColor: "#056acfff",
                        },
                    }}
                    to="/signin"
                >
                    View more
                </Button>

            </Box>

        </Card>
    );
};

export default HoverCard;
