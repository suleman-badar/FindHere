import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function ContactForm() {
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");

    const handleSave = () => {
        console.log({ phone, website });
    };

    return (
        <Box display="flex" flexDirection="column" gap={3} maxWidth="600px">
            <TextField
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
            />
            <TextField
                label="Website Link"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                fullWidth
            />
            <Button variant="contained" onClick={handleSave}>
                Save
            </Button>
        </Box>
    );
}
