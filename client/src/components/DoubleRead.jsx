import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Box } from "@mui/material";
export default function DoubleRead({ text }) {
    return (
        <Box className="flex gap-4">
            <DoneAllIcon></DoneAllIcon>
            <h5>{text}</h5>
        </Box>
    );
}