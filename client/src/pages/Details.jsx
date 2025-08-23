import { Box, Typography, Divider, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader.jsx";
import Btn from "../components/Btn";

import GoBack from "../components/GoBack"
import Footer from "../components/Footer.jsx"
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CallIcon from "@mui/icons-material/Call";
import LanguageIcon from "@mui/icons-material/Language";
import EventIcon from "@mui/icons-material/Event";
import InfoCard from "../components/InfoCard";


import Img from "../assets/s3.jpg";

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

export default function Details() {
    const { id } = useParams();

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

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
                    <Box >
                        <StarIcon sx={{ color: "#dae020ff", mr: 0.5 }} />
                        <StarIcon sx={{ color: "#dae020ff", mr: 0.5 }} />
                        <StarIcon sx={{ color: "#dae020ff", mr: 0.5 }} />
                        <StarIcon sx={{ color: "#dae020ff", mr: 0.5 }} />
                        <StarIcon sx={{ color: "#dae020ff", mr: 0.5 }} />
                    </Box>
                    <Typography sx={{ fontSize: "0.8rem" }} >4.7(19,987)</Typography>
                </Box>
                <Divider sx={{ backgroundColor: "black" }}></Divider>

                <Box className="flex justify-around my-4 overflow-x-auto scrollbar-hide">
                    <InfoCard text="Punjab, Pakistan" Icon={LocationOnIcon} des="Lahore"></InfoCard>
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
                    <Box className="flex">
                        <img src={Img} className="w-[100px] m-4 rounded-md"></img>
                        <img src={Img} className="w-[100px] m-4 rounded-md"></img>
                    </Box>
                    <Box className="flex">
                        <img src={Img} className="w-[100px] m-4 rounded-md"></img>
                        <img src={Img} className="w-[100px] m-4 rounded-md"></img>
                    </Box>
                    <Btn text="View All Photos"></Btn>
                </Box>
                <Box className="my-8">
                    <h3 className="my-4" >Locations & Directions</h3>
                    <Box className="h-[300px] bg-red-100 rounded-lg">Map Here</Box>
                </Box>
                <Box className="my-8">
                    <h3 className="my-4" >Reviews</h3>
                    <Box className="flex flex-col items-center justify-center">
                        <Box className="flex  bg-gray-100 w-[90%] h-[180px] rounded-lg p-4">
                            <Box className="h-full w-[10%]"> User Image</Box>
                            <Box>
                                <Box>Name</Box>
                                <Box>Description</Box>
                                <Box className="flex gap-12">
                                    <Box>
                                        <StarIcon sx={{ color: "#dae020ff", mr: 0.2 }} />
                                        <StarIcon sx={{ color: "#dae020ff", mr: 0.2 }} />
                                        <StarIcon sx={{ color: "#dae020ff", mr: 0.2 }} />
                                        <StarIcon sx={{ color: "#dae020ff", mr: 0.2 }} />
                                        <StarIcon sx={{ color: "#dae020ff", mr: 0.2 }} />
                                    </Box>
                                    <Box>
                                        {Date.now(30 * 24 * 60 * 60)}
                                    </Box>
                                </Box>
                                <Box className="my-4">
                                    Review Message
                                </Box>
                            </Box>
                        </Box>
                        <Btn text="Write a Review "></Btn>
                    </Box>
                </Box>
                <Box>
                    <h3>Plan Your Visit</h3>
                    <Box className="flex flex-col items-center">
                        <Btn text="Check Directions" IconStart={LocationOnIcon}></Btn>
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
        </Box>
    );
}
