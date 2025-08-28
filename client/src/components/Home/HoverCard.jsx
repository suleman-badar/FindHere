import React from "react";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardMedia, Box, Typography } from "@mui/material";
import Btn from "../Btn"
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AverageStars from "../Reviews/AverageStars";
import AverageRating from "../Reviews/AverageRating";


const HoverCard = ({ id, name, image, averageRating, reviewCount, locationLat, locationLon }) => {
    const navigate = useNavigate();
    const handleViewMore = () => {
        navigate(`details/${id}`);
    }

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
            <CardMedia
                component="img"
                image={image}
                alt={name}
                sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                }}
            />

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
                    transform: "translateY(82%)",
                    transition: "transform 0.4s ease, opacity 0.4s ease",
                    opacity: 1,
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>{name}</Typography>

                <Box className="mb-8">
                    <AverageStars id={id} />
                    <Box> {averageRating?.toFixed(1)} ({reviewCount} reviews)</Box>
                </Box>
                <Btn text="View More" onClick={handleViewMore} w="100%"></Btn>
            </Box>
        </Card>
    );
};

export default HoverCard;
