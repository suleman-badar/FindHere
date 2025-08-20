import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
export default function GoBack() {
    return (
        <Box className="flex justify-between w-full mb-4 " >
            <Box
                component={Link}
                to="/"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "black",
                    fontSize: "1rem",
                    gap: 0.5,
                }}
            >
                <ArrowBackIcon fontSize="small" />
                <span className="hidden sm:inline ml-1"> Back To Home</span>
            </Box>
        </Box>
    );
}