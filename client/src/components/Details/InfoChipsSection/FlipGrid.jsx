import { Grid } from "@mui/material";
import FlipCard from "./FlipCard";

export default function FlipGrid({ items, iconMap }) {
    return (
        <Grid container spacing={4} justifyContent="center" className="mt-6">
            {items.map((item, idx) => (
                <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
                    <FlipCard item={item} icon={iconMap[item]} />
                </Grid>
            ))}
        </Grid>
    );
}
