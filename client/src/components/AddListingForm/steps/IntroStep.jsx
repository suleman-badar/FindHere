import { Button, Typography, Box, Divider } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";

export default function IntroStep({ nextStep }) {
    return (
        <Box
            sx={{
                p: 6,
                borderRadius: "16px",
                bgcolor: "white",
                boxShadow: 2,
                border: "1px solid #e5e7eb",
                textAlign: "center",
            }}
        >
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <RestaurantIcon
                    sx={{
                        fontSize: 50,
                        color: "primary.main",
                        mb: 2,
                    }}
                />
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                    Add a New Restaurant Listing
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 1, maxWidth: 600, mx: "auto" }}
                >
                    Welcome! We’ll guide you step by step to add all the necessary
                    information about your restaurant so it can rank higher, get
                    discovered, and attract more customers.
                </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* CTA */}
            <Button
                variant="contained"
                size="large"
                sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                }}
                onClick={nextStep}
            >
                🚀 Get Started
            </Button>
        </Box>
    );
}
