import { Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function SectionHeader({ title, isOpen, onClick }) {
    return (
        <Box
            onClick={onClick}
            className="cursor-pointer mx-auto w-full max-w-lg 
           px-6 py-4 rounded-2xl 
           bg-gradient-to-r from-slate-200 to-indigo-300
           text-gray-800 shadow-md 
           flex items-center justify-between
           transition-all duration-300 
           hover:shadow-lg hover:scale-[1.02]"




        >
            {/* Title */}
            <Typography
                variant="h6"
                className="font-bold text-lg tracking-wide drop-shadow-md"
            >
                {title}
            </Typography>

            {/* Icon with rotation animation */}
            <Box
                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                    }`}
            >
                <ExpandMoreIcon fontSize="large" />
            </Box>
        </Box>
    );
}
