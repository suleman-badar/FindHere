import React from "react";
import { Card, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export default function ListingSkeleton({ sx = {} }) {
    return (
        <Card sx={{ minWidth: 280, height: 320, borderRadius: 3, overflow: "hidden", position: "relative", boxShadow: 3, margin: "0.8rem", ...sx }}>
            <Box sx={{ height: "65%" }}>
                <Skeleton variant="rectangular" animation="wave" sx={{
                    borderRadius: "16px",
                    background: `linear-gradient(
                                    90deg,
                                    var(--color-surface) 25%,
                                    rgba(185, 28, 28, 0.15) 50%,
                                    var(--color-surface) 75%
                                    )`,
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite linear",
                    height: "100%"
                }} />
            </Box>
            <Box sx={{ p: 2 }}>
                <Skeleton variant="text" animation="wave" width="70%" />
                <Skeleton variant="text" animation="wave" width="40%" />
            </Box>
        </Card>
    );
}
