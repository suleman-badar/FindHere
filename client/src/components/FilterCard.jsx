import * as React from "react";
import { Card, CardActionArea, CardContent, Typography, Stack } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function FilterCard({ name, icon }) {
    return (
        <Card
            sx={{
                minWidth: 150,
                borderRadius: 3,
                boxShadow: 2,
                textAlign: "center",
                backgroundColor: "red",
                margin: "10px",
            }}
        >
            <CardActionArea>
                <CardContent sx={{ p: 2 }}>
                    <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
                        {icon}
                        <Typography variant="body2" fontWeight="bold">
                            {name}
                        </Typography>
                        <Typography sx={{ fontSize: 10 }}>
                            NaN places
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
