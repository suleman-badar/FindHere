// InfoSection.jsx
import { Box, Typography, Chip, Divider, Link } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";

export default function InfoSection({ details, place }) {
    return (
        <Box className="my-8 px-4 sm:px-8 md:px-16">
            {/* Contact & Location */}
            <Box className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
                <Box className="flex flex-col gap-2">
                    {details?.address && (
                        <Typography className="flex items-center gap-1">
                            <LocationOnIcon /> {details.address}
                        </Typography>
                    )}
                    {details?.phone && (
                        <Typography className="flex items-center gap-1">
                            <CallIcon /> {details.phone}
                        </Typography>
                    )}
                    {details?.email && (
                        <Typography className="flex items-center gap-1">
                            <EmailIcon /> {details.email}
                        </Typography>
                    )}
                    {details?.website && (
                        <Typography className="flex items-center gap-1">
                            <LanguageIcon />
                            <Link href={details.website} target="_blank" underline="hover">
                                {details.website}
                            </Link>
                        </Typography>
                    )}
                </Box>

                {/* Price */}
                {details?.price !== undefined && (
                    <Typography variant="h6" className="text-blue-700 font-semibold">
                        Avg Price: ${details.price}
                    </Typography>
                )}
            </Box>

            <Divider className="mb-6" />

            {/* Chips for Payment, Services, Tags, Amenities */}
            <Box className="flex flex-wrap gap-2">
                {details?.paymentMethods?.map((method, idx) => (
                    <Chip key={idx} label={method} color="primary" size="small" />
                ))}
                {details?.services?.map((service, idx) => (
                    <Chip key={idx} label={service} color="secondary" size="small" />
                ))}
                {details?.tags?.map((tag, idx) => (
                    <Chip key={idx} label={tag} variant="outlined" size="small" />
                ))}
                {details?.amenities?.map((amenity, idx) => (
                    <Chip key={idx} label={amenity} variant="filled" size="small" />
                ))}
            </Box>
        </Box>
    );
}
