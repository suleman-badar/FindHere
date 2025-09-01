// ContactDetailsSection.jsx
import { Box, Typography, Stack, Card, CardContent, Link } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const infoItems = [
    { key: "phone", label: "Call Us", icon: <PhoneIcon fontSize="large" color="success" /> },
    { key: "email", label: "Email", icon: <EmailIcon fontSize="large" color="error" /> },
    { key: "website", label: "Website", icon: <LanguageIcon fontSize="large" color="primary" /> },
    { key: "avgPrice", label: "Avg. Price", icon: <AttachMoneyIcon fontSize="large" sx={{ color: "goldenrod" }} /> },
];

export default function ContactSection({ phone, email, website, avgPrice }) {
    const data = { phone, email, website, avgPrice };

    return (
        <Box className="my-12 px-4 sm:px-8 md:px-16 text-center">
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                justifyContent="center"
                alignItems="stretch"
            >
                {infoItems.map((item) => {
                    if (!data[item.key]) return null;

                    let content;
                    switch (item.key) {
                        case "phone":
                            content = (
                                <Link href={`tel:${data.phone}`} underline="hover" color="inherit">
                                    {data.phone}
                                </Link>
                            );
                            break;
                        case "email":
                            content = (
                                <Link href={`mailto:${data.email}`} underline="hover" color="inherit">
                                    {data.email}
                                </Link>
                            );
                            break;
                        case "website":
                            content = (
                                <Link href={data.website} target="_blank" rel="noopener noreferrer" underline="hover" color="inherit">
                                    {data.website}
                                </Link>
                            );
                            break;
                        default:
                            content = null;
                    }

                    return (
                        <Card
                            key={item.key}
                            sx={{
                                flex: 1,
                                minWidth: 250,
                                backgroundColor: "#f3f4f6",
                                borderRadius: "16px",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                transition: "all 0.3s ease",
                                "&:hover": { transform: "translateY(-6px)", boxShadow: "0 8px 20px rgba(0,0,0,0.15)" },
                            }}
                        >
                            <CardContent>
                                <Box className="flex flex-col items-center gap-3">
                                    {item.icon}
                                    <Typography variant="subtitle1" fontWeight="600">
                                        {item.label}
                                    </Typography>
                                    {content}
                                </Box>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Box>
    );
}
