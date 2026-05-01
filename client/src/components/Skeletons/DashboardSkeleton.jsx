import React from "react";
import { Card, Box, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} sx={{ p: 3, borderRadius: 3, minHeight: 140, boxShadow: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Skeleton variant="circular" width={40} height={40} animation="wave" />
              <Skeleton variant="text" width={80} animation="wave" />
            </Box>
            <Skeleton variant="text" width="60%" animation="wave" />
            <Skeleton variant="text" width="40%" animation="wave" />
          </Card>
        ))}
      </div>

      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 4, borderRadius: 3, minHeight: 320, boxShadow: 3 }}>
            <Skeleton variant="text" width="35%" animation="wave" sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              {[...Array(3)].map((_, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ p: 2, borderRadius: 3, bgcolor: "background.paper", boxShadow: 1 }}>
                    <Skeleton variant="text" width="80%" animation="wave" sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="60%" animation="wave" />
                    <Skeleton variant="rectangular" height={110} animation="wave" sx={{ mt: 2, borderRadius: 2 }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 4, borderRadius: 3, minHeight: 320, boxShadow: 3 }}>
            <Skeleton variant="text" width="45%" animation="wave" sx={{ mb: 3 }} />
            {[...Array(4)].map((_, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Skeleton variant="text" width="55%" animation="wave" />
                <Skeleton variant="text" width="20%" animation="wave" />
              </Box>
            ))}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
