import { Box, Typography, Divider } from "@mui/material"
export default function Heading({ heading, description }) {
    return (
        <Box textAlign="center" mb={6}>
            <Typography variant="h4" fontWeight="bold">
                {heading}
            </Typography>
            <Divider
                sx={{
                    width: "80px",
                    margin: "8px auto 0",
                    borderBottomWidth: 3,
                    borderColor: "primary.main",
                }}
            />
            <Typography variant="subtitle1" color="text.secondary" mt={1}>
                {description}
            </Typography>
        </Box>
    );
}