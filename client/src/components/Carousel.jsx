import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef } from "react";

export default function Carousel({ children, cardWidth = 320 }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -cardWidth : cardWidth,
                behavior: "smooth",
            });
        }
    };

    return (
        <Box sx={{ position: "relative", mb: "2rem" }}>
            <IconButton
                onClick={() => scroll("left")}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    transform: "translateY(-50%)",
                    bgcolor: "white",
                    boxShadow: 2,
                    zIndex: 2,
                }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>

            <Box
                ref={scrollRef}
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                {children}
            </Box>

            <IconButton
                onClick={() => scroll("right")}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                    transform: "translateY(-50%)",
                    bgcolor: "white",
                    boxShadow: 2,
                    zIndex: 2,
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
}
