import { Box, Typography, Divider, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePlaceLocation from "../Hooks/usePlaceLocation.jsx";

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
import StarRating from "../components/Reviews/StarRating.jsx";
import AverageStars from "../components/Reviews/AverageStars.jsx";
import AverageRating from "../components/Reviews/AverageRating.jsx";






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

    const [details, setDetails] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(true);




    function handleWriteReview() {
        navigate(`/review/create-review/${id}`);
    }


    useEffect(() => {
        setLoading(true);
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/listing/details/${id}`);
                setDetails(res.data);
            }
            catch (err) {
                console.error("Error fetching details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);
    const { place } = usePlaceLocation(
        details?.location?.[0],
        details?.location?.[1]
    );




    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/review/all-review/${id}`);
                setReviews(res.data);
            } catch (err) {
                console.error("Error fetching revies:", err);
            }

        }
        fetchReviews();
    }, [id]);

    if (loading || !details) return <Loader />;


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
                    <img src={details?.images?.[0]} alt={details?.name} />
                </Box>

            </Box>
            <Box className="mx-4 my-6">
                <h1>{details?.name}</h1>
                <p>{details?.description}</p>
                <Box className="flex items-center gap-8 mb-8">
                    <AverageStars id={id} />
                    <AverageRating id={id} />

                </Box>
                <Divider sx={{ backgroundColor: "black" }}></Divider>

                <Box className="flex justify-around my-4 overflow-x-auto scrollbar-hide">
                    <InfoCard text={`${place.city}, ${place.province}`} Icon={LocationOnIcon} des="Lahore"></InfoCard>
                    <InfoCard text={`${details?.openingHours?.open} - ${details?.openingHours?.close}`} Icon={AccessTimeIcon} des="Opens daily"></InfoCard>
                    <InfoCard text={`${details?.number}`} Icon={CallIcon} des="Visitor Service"></InfoCard>
                    <InfoCard text={`${details?.weblink}`} Icon={LanguageIcon} des="Official Website"></InfoCard>

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
                    <Box className="h-[300px] bg-red-100 rounded-lg"><MapPreview location={details?.location} /></Box>

                </Box>
                <Box className="flex justify-center">
                    <Btn text="Directions" IconStart={LocationOnIcon} onClick={() => openDirections(details.location[0], details.location[1])}></Btn>
                </Box>
                <Box className="my-16">
                    <h3 className="my-4" >Reviews</h3>
                    <Box className="flex flex-col items-center justify-center">
                        {reviews && reviews.length > 0 ? (
                            reviews?.map((review) => (
                                <Box key={review._id} className="flex bg-gray-100 w-[90%] min-h-[180px] rounded-lg p-4 mb-4">
                                    <Box className="h-full w-[10%]">
                                        <img
                                            src={review.image || "/default-user.png"}
                                            alt={review.name || "Anonymous"}
                                            className="h-full w-full object-cover rounded-full"
                                        />
                                    </Box>
                                    <Box className="ml-4 flex flex-col justify-between">
                                        <Box>
                                            <Box className="font-semibold">{review.name || "Anonymous"}</Box>
                                            <Box className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</Box>
                                            <StarRating rating={Math.round(review.rating)} size={24} />

                                        </Box>
                                        <Box className="mt-2 text-gray-700">{review.reviewText}</Box>
                                    </Box>
                                </Box>
                            ))) :
                            <Typography className="text-gray-500 my-4">
                                No reviews yet. Be the first to write one!
                            </Typography>
                        }

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
