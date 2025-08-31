// DetailsPage.jsx
import { Box, Divider } from "@mui/material";
import { useParams } from "react-router-dom";

import Loader from "../components/Loader.jsx";
import HeroSection from "../components/Details/HeroSection.jsx";
import GallerySection from "../components/Details/GallerySection.jsx";
import InfoChipsSection from "../components/Details/InfoChipsSection/InfoChipsSection.jsx";
import OpeningHoursSection from "../components/Details/OpeningHoursSection.jsx";
import MapSection from "../components/Details/MapSection.jsx";
import ReviewSection from "../components/Details/ReviewSection.jsx";
import Footer from "../components/Footer.jsx";
import GoBack from "../components/GoBack.jsx";

import useDetails from "../Hooks/useDetails.jsx";
import usePlaceLocation from "../Hooks/usePlaceLocation.jsx";
import Heading from "../components/Details/Heading.jsx";

export default function Details() {
    const { id } = useParams();
    const { details, detailsLoading } = useDetails(id);

    // Fetch city/province info if needed
    const { place, placeLoading } = usePlaceLocation(
        details?.data?.location?.[0],
        details?.data?.location?.[1]
    );

    if (detailsLoading || placeLoading || !details) return <Loader />;

    const data = details.data;

    return (
        <Box className="px-4 sm:px-8 md:px-16 py-8"  >

            <Box className="flex justify-start mb-4">
                <GoBack />
            </Box>
            <HeroSection details={data} />
            <Divider sx={{ my: 2, backgroundColor: "black" }} />

            <Heading heading="Opening Hours" />
            <OpeningHoursSection hours={data.hours} />
            <Divider sx={{ my: 2, backgroundColor: "black" }} />


            <Heading heading="Features & Services" />
            <InfoChipsSection
                address={data.address}
                phone={data.phone}
                email={data.email}
                website={data.website}
                services={data.services}
                amenities={data.amenities}
                paymentMethods={data.paymentMethods}
                tags={data.tags}
            />
            <Divider sx={{ my: 2, backgroundColor: "black" }} />


            <Heading heading="Image Gallery" />
            <GallerySection images={data.images} />
            <Divider sx={{ my: 2, backgroundColor: "black" }} />


            <Heading heading="Location & Map" />
            <MapSection location={data.location} />
            <Divider sx={{ my: 2, backgroundColor: "black" }} />



            <Heading heading="Reviews" />
            <ReviewSection listingId={id} />
            <Divider sx={{ my: 2, backgroundColor: "black" }} />


            <Footer />
        </Box>
    );
}
