import { Box, Typography, Divider, Button } from "@mui/material";
import Btn from "../components/Btn";
import GoBack from "../components/GoBack"
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
                    <img
                        src={Img}
                        alt="img"
                        className="w-full h-[500px] object-cover rounded-lg"
                    />
                </Box>

            </Box>
            <Box className="mx-4 my-6">
                <h1>name</h1>
                <p>whatEver u want to werite here bro. I don't care what is this place and what food you have.</p>
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
                    <InfoCard text="6am-12pm" Icon={AccessTimeIcon} des="Opens daily"></InfoCard>
                    <InfoCard text="042-6555" Icon={CallIcon} des="Visitor Service"></InfoCard>
                    <InfoCard text="www.FindHere.com" Icon={LanguageIcon} des="Official Website"></InfoCard>

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
        </Box>
    );
}
