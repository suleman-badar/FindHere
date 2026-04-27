import React from "react";
import { Card, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export default function ListingSkeleton({ sx = {} }) {
  return (
    <Card sx={{ minWidth: 280, height: 320, borderRadius: 3, overflow: "hidden", position: "relative", boxShadow: 3, margin: "0.8rem", ...sx }}>
      <Box sx={{ height: "65%" }}>
        <Skeleton variant="rectangular" animation={false} sx={{ width: "100%", height: "100%" }} />
      </Box>
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" animation={false} width="70%" />
        <Skeleton variant="text" animation={false} width="40%" />
      </Box>
    </Card>
  );
}
