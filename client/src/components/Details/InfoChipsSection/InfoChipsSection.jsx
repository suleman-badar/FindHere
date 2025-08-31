import { useState } from "react";
import { Box, Collapse } from "@mui/material";
import FlipGrid from "./FlipGrid";
import SectionHeader from "./SectionHeader";



import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PaymentIcon from "@mui/icons-material/Payment";
import PetsIcon from "@mui/icons-material/Pets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SpaIcon from "@mui/icons-material/Spa";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TagIcon from "@mui/icons-material/Tag";

// Icon mapping
const iconMap = {
    WifiIcon: <WifiIcon fontSize="large" color="primary" />,
    LocalParkingIcon: <LocalParkingIcon fontSize="large" color="success" />,
    RestaurantIcon: <RestaurantIcon fontSize="large" color="secondary" />,
    PaymentIcon: <PaymentIcon fontSize="large" color="success" />,
    PetsIcon: <PetsIcon fontSize="large" color="warning" />,
    FavoriteIcon: <FavoriteIcon fontSize="large" color="error" />,
    SpaIcon: <SpaIcon fontSize="large" color="success" />,
    FamilyRestroomIcon: <FamilyRestroomIcon fontSize="large" color="primary" />,
    MusicNoteIcon: <MusicNoteIcon fontSize="large" color="secondary" />,
    AcUnitIcon: <AcUnitIcon fontSize="large" color="primary" />,
    DeliveryDiningIcon: <DeliveryDiningIcon fontSize="large" color="success" />,
    TakeoutDiningIcon: <TakeoutDiningIcon fontSize="large" color="warning" />,
    EventSeatIcon: <EventSeatIcon fontSize="large" color="info" />,
    BookOnlineIcon: <BookOnlineIcon fontSize="large" color="primary" />,
    AccountBalanceWalletIcon: <AccountBalanceWalletIcon fontSize="large" color="secondary" />,
    CreditCardIcon: <CreditCardIcon fontSize="large" color="warning" />,
    TagIcon: <TagIcon fontSize="large" color="info" />,
};

// Dummy fallback values for testing
const fallbackData = {
    tags: ["Family Friendly", "Romantic", "Vegan Options", "Pet Friendly", "Casual"],
    amenities: ["Wifi", "Parking", "Live Music", "Outdoor Seating", "Air Conditioning"],
    services: ["Dine-in", "Takeaway", "Delivery", "Outdoor Seating", "Reservation"],
    paymentMethods: ["Cash", "Card", "Digital Wallet"],
};

export default function InfoChipsSection({ tags, amenities, services, paymentMethods }) {
    const [openSection, setOpenSection] = useState(null);

    const sections = [
        { title: "Tags", items: tags?.length ? tags : fallbackData.tags, color: "from-pink-100 to-pink-200", accent: "text-pink-600" },
        { title: "Amenities", items: amenities?.length ? amenities : fallbackData.amenities, color: "from-green-100 to-green-200", accent: "text-green-600" },
        { title: "Services", items: services?.length ? services : fallbackData.services, color: "from-blue-100 to-blue-200", accent: "text-blue-600" },
        { title: "Payment Methods", items: paymentMethods?.length ? paymentMethods : fallbackData.paymentMethods, color: "from-yellow-100 to-yellow-200", accent: "text-yellow-600" },
    ];

    return (
        <Box className="my-16">
            {sections.map((section, idx) => (
                <Box key={idx} className="mb-10">
                    <SectionHeader
                        title={section.title}
                        isOpen={openSection === section.title}
                        onClick={() => setOpenSection(openSection === section.title ? null : section.title)}
                        color={section.color}
                        accent={section.accent}
                    />

                    <Collapse in={openSection === section.title} timeout={500}>
                        <FlipGrid items={section.items} iconMap={iconMap} />
                    </Collapse>
                </Box>
            ))}
        </Box>
    );
}
