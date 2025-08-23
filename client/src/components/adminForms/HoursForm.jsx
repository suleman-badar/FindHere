import { Box, TextField, Button, Card, CardContent, Typography, Stack } from "@mui/material";
import { useState } from "react";

export default function HoursForm() {
    const [openTime, setOpenTime] = useState("");
    const [closeTime, setCloseTime] = useState("");

    const handleSave = () => {
        console.log({ openTime, closeTime });
    };

    return (
        <Card
            className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            sx={{ maxWidth: 600, mx: "auto" }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    className="font-semibold mb-4"
                    sx={{ textAlign: "center" }}
                >
                    Operating Hours
                </Typography>

                <Stack spacing={3}>
                    <TextField
                        label="Opening Time"
                        type="time"
                        value={openTime}
                        onChange={(e) => setOpenTime(e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    />
                    <TextField
                        label="Closing Time"
                        type="time"
                        value={closeTime}
                        onChange={(e) => setCloseTime(e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: "10px",
                            textTransform: "none",
                            py: 1.5,
                            boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
                            "&:hover": { boxShadow: "0 6px 20px rgba(59,130,246,0.4)" },
                        }}
                        onClick={handleSave}
                    >
                        Save Hours
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
