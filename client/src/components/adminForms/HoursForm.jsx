import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function HoursForm() {
    const [openTime, setOpenTime] = useState("");
    const [closeTime, setCloseTime] = useState("");

    const handleSave = () => {
        console.log({ openTime, closeTime });
    };

    return (
        <Box display="flex" flexDirection="column" gap={3} maxWidth="600px">
            <TextField
                label="Opening Time"
                type="time"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Closing Time"
                type="time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" onClick={handleSave}>
                Save
            </Button>
        </Box>
    );
}
