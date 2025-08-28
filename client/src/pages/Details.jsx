import { Box, Typography, Divider, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePlaceLocation from "../Hooks/usePlaceLocation.jsx";
import useDetails from "../Hooks/useDetails.jsx";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CallIcon from "@mui/icons-material/Call";
import LanguageIcon from "@mui/icons-material/Language";
import EventIcon from "@mui/icons-material/Event";

import axios from "axios";
import Loader from "../components/Loader.jsx";
import Btn from "../components/Btn";
import MapPreview from "../components/Details/MapPreview.jsx";
import GoBack from "../components/GoBack"
import Footer from "../components/Footer.jsx"
import InfoCard from "../components/Details/InfoCard.jsx";
import ImageGallery from "../components/Details/ImageGallery.jsx";
import AverageStars from "../components/Reviews/AverageStars.jsx";
import AverageRating from "../components/Reviews/AverageRating.jsx";
import AllReviews from "../components/Reviews/AllReviews";



let buttonStyles = {
    backgroundColor: "white",
    width: "80%",
    margin: "0.5rem",
    gap: 2,
    color: "#082567",
    borderColor: "#000d1a",
    borderRadius: "8px",
    padding: "8px 16px",
    textTransform: "none",
    "&:hover": {
        backgroundColor: "#082567",
        color: "white",
        boxShadow: 3,

    },
};

function openDirections(lat, lon) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            window.open(
                `https://www.google.com/maps/dir/${latitude},${longitude}/${lat},${lon}`,
                "_blank"
            );
        });
    }
}


export default function Details() {
    const { id } = useParams();
    const galleryRef = useRef();
    const navigate = useNavigate();
    const { details, detailsLoading } = useDetails(id);    //Fetching deta8ls in custom hook

    // console.log("details::", details);

    function handleWriteReview() {
        navigate(`/review/create-review/${id}`);
    }

    //fetching place information(city,province) in a  custom hook

    const { place, placeLoading } = usePlaceLocation(
        details?.data?.location?.[0],
        details?.data?.location?.[1]
    );

    //running loader on screen while the inforamtion is being fetched

    if (placeLoading || detailsLoading || !details) return <Loader />;


    return (


        <Box className="px-5">

            <Box className="flex flex-col items-center mt-4 w-full ">
                <Box className="flex justify-between w-full mb-4 ">
                    <GoBack></GoBack>

                    <Box className="flex gap-2">
                        <Btn
                            text={<span className="hidden sm:inline">Like</span>}
                            w="80px sm:w-[120px]"
                            IconStart={FavoriteIcon}
                        />
                        <Btn
                            text={<span className="hidden sm:inline">Share</span>}
                            w="80px sm:w-[120px]"
                            IconStart={ShareIcon}
                        />
                    </Box>
                </Box>

                <Box className="w-[90%] mx-2">
                    <img src={details?.data?.images?.[0]} alt={details?.name} />
                </Box>

            </Box>
            <Box className="mx-4 my-6">
                <h1>{details?.data?.name}</h1>
                <p>{details?.data?.description}</p>
                <Box className="flex items-center gap-8 mb-8">
                    <AverageStars id={id} />
                    <AverageRating id={id} />

                </Box>
                <Divider sx={{ backgroundColor: "black" }}></Divider>

                <Box className="flex justify-around my-4 overflow-x-auto scrollbar-hide">
                    <InfoCard
                        text={
                            place?.city && place?.province
                                ? `${place.city}, ${place.province}`
                                : "Unknown"
                        }
                        Icon={LocationOnIcon}
                        des="Lahore"
                    />
                    <InfoCard text={`${details?.data?.openingHours?.open} - ${details?.data?.openingHours?.close}`} Icon={AccessTimeIcon} des="Opens daily"></InfoCard>
                    <InfoCard text={`${details?.data?.number}`} Icon={CallIcon} des="Visitor Service"></InfoCard>
                    <InfoCard text={`${details?.data?.weblink}`} Icon={LanguageIcon} des="Official Website"></InfoCard>
                </Box>

                <Divider sx={{ backgroundColor: "black" }}></Divider>
                <Box >
                    <h3 className="my-6"> About</h3>
                    <Box>
                        About your product broooo
                    </Box>
                </Box>
                <Box className="flex flex-col justify-center items-center">
                    <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
                        <ImageGallery ref={galleryRef} details={details} previewCount={5} />
                    </Box>

                    <Btn text="View All Photos" onClick={() => galleryRef.current.openGallery(0)}
                    ></Btn>

                </Box>
                <Box className="my-8">
                    <h3 className="my-4" >Locations & Directions</h3>
                    <Box className="h-[300px] bg-red-100 rounded-lg"><MapPreview location={details?.data?.location} /></Box>

                </Box>
                <Box className="flex justify-center">
                    <Btn text="Directions" IconStart={LocationOnIcon} onClick={() => openDirections(details.location[0], details.location[1])}></Btn>
                </Box>
                <Box className="my-16">
                    <h3 className="my-4" >Reviews</h3>
                    <Box className="flex flex-col items-center justify-center">
                        <AllReviews id={id} />
                        <Btn text="Write a Review " onClick={handleWriteReview}></Btn>
                    </Box>
                </Box>
                <Box>
                    <h3>Plan Your Visit</h3>
                    <Box className="flex flex-col items-center">
                        <Btn text="Check Directions" IconStart={LocationOnIcon} onClick={() => openDirections(details.location[0], details.location[1])}></Btn>
                        <Button
                            variant="outlined"
                            sx={buttonStyles}
                        >
                            <EventIcon />
                            Plan an Event
                        </Button>
                        <Button
                            variant="outlined"
                            sx={buttonStyles} >
                            <CallIcon />
                            Contact Us
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box >
    );
}
