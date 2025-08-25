import { Box } from "@mui/material";

export default function InfoCard({ Icon, text = "none", des }) {
    return (
        <Box className="flex gap-2 min-w-[180px] mx-2 bg-gray-100 p-2 rounded-lg py-4">
            <Icon></Icon>
            <Box>
                <Box >
                    <b>{text}</b>
                </Box>
                <Box sx={{ fontSize: 10 }}>
                    {des}
                </Box>
            </Box>
        </Box>
    );
}