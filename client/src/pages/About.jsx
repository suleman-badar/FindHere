import { Box } from "@mui/material"
import GoBack from "../components/GoBack";
import DoubleRead from "../components/DoubleRead";
import AboutCard from "../components/AboutCard";
import Btn from "../components/Btn";
import FlagIcon from "@mui/icons-material/Flag";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import StarIcon from "@mui/icons-material/Star";
import NavigationIcon from "@mui/icons-material/Navigation";
import GroupsIcon from "@mui/icons-material/Groups";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";



export default function About() {
    return (
        <Box className="mt-2">
            <GoBack />
            <Box className=" flex flex-col justify-center items-center text-center h-[400px] bg-indigo-950 text-white">
                <b>
                    <h1 className="mb-10 ">About</h1>
                    <h4>Connecting people with amazing places around the world</h4>
                </b>
            </Box>
            <Box className="flex flex-col items-center text-center text-bold py-4">
                <FlagIcon sx={{ color: "red", margin: "2rem" }} fontSize="large"></FlagIcon>
                <h2 className="font-bold">Our Misson</h2>
                <h5 className="text-sm min-w-[300px] my-8 mb-16 max-w-[700px] " >At FindHere, we believe that discovering new places should be effortless adn inspiring.
                    Our mission is to connect curious travllers with authentic local experiences, making exploration accessible
                    to everyone while supporting local communities worldwide.
                </h5>
                <h2 className="font-bold my-8">What We Provide</h2>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        gap: 2,
                        maxWidth: "900px",
                        margin: "0 auto",
                    }}
                >
                    <AboutCard Icon={ExploreIcon} title="Comprehensive Listings" description="Discover thousands of verified places with detailed information and real-time updates" />
                    <AboutCard Icon={StarIcon} title="Authentic Reviews" description="Read geniuine reeviews from real visitors to make informed decisions about your next destination" />

                    <AboutCard Icon={SearchIcon} title="Smart Search" description="Find exactly what you are looking for qwith out advanced filtering and intelligrnt recommendation." />
                    <AboutCard Icon={NavigationIcon} title="Smart Navigation" description="Get turn-by-turn directions and optimal routes to reach your choosen destinations effortlessly" />

                    <AboutCard Icon={GroupsIcon} title="Community Driven" description="Connect with fellow explorers and share your discoveries with a passionate community" />
                    <AboutCard Icon={CameraAltIcon} title="Rich Visuals" description="Explore places through high-quality photos, virtual tours and immersive content." />
                </Box>
                <Box className="my-8">
                    <FavoriteBorderIcon sx={{ fontSize: 48, color: "red", marginBottom: "1rem" }} />
                    <b>
                        <h2 >Our Vision</h2>
                        <h6 className="text-sm min-w-[300px] my-8 mb-16 max-w-[700px]" >We envision a world where every travler can easily discover hidden gems, authentic experience,
                            and meaningful connections wherever they go. Through innovative technology and a passionate cimmunity
                        </h6>
                    </b>
                </Box>
                <Box>
                    <h2 className="font-bold">Why FindHere?</h2>
                    <Box className=" flex flex-col gap-4 my-8">
                        <DoubleRead text="Trusted by millions of travelers worldwide"></DoubleRead>
                        <DoubleRead text="Real-time updates and verified information"></DoubleRead>
                        <DoubleRead text="Personalized recommendations"></DoubleRead>
                        <DoubleRead text="Seamless integration across all your devices"></DoubleRead>
                        <DoubleRead text="24/7 customer support for your peace of mind"></DoubleRead>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
