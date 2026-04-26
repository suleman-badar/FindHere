import { Box, Typography } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";


export default function FlipCard({ item, icon }) {
    return (
        <Box className="relative w-44 sm:w-52 md:w-56 h-44 sm:h-52 md:h-56 [perspective:1200px] mx-auto">
            <Box className="absolute inset-0 transition-transform duration-700 ease-in-out [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">

                {/* Front */}
                <Box className="absolute inset-0 flex flex-col items-center justify-center bg-surface text-text border border-border rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backface-hidden p-4">
                    <Box className="mb-2">{icon || <TagIcon fontSize="large" color="disabled" />}</Box>
                    <Typography variant="subtitle1" className="mt-1 font-semibold text-text text-center">
                        {item}
                    </Typography>
                </Box>

                {/* Back */}
                <Box className="absolute inset-0 flex items-center justify-center bg-surface/90 text-muted rounded-2xl shadow-md [transform:rotateY(180deg)] backface-hidden p-4">
                    <Typography variant="body2" className="p-3 text-center text-muted leading-relaxed">
                        Learn more about <span className="font-semibold text-text">{item}</span>.
                        This feature makes your visit more enjoyable.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
