import { Card, CardContent, Typography, Box } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";

export default function FeatureCard({ Icon = ExploreIcon, title, description }) {
    return (
        <Card
            sx={{
                flex: {
                    xs: "1 1 100%",
                    sm: "1 1 40%",
                },
                borderRadius: "16px",
                boxShadow: 3,
                textAlign: "center",
                p: 2,
                m: 1,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                },
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Icon sx={{ fontSize: 48, color: "green" }} />
                </Box>

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}
