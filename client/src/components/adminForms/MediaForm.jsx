import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Button,
    Grid,
    TextField,
    Divider,
    Stack,
} from "@mui/material";

export default function MediaForm() {
    return (
        <Card
            className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            sx={{ overflow: "hidden" }}
        >
            {/* Header */}
            <CardHeader
                title={
                    <Typography
                        variant="h6"
                        className="font-semibold text-gray-800"
                        sx={{ letterSpacing: 0.3 }}
                    >
                        Media
                    </Typography>
                }
                sx={{
                    background:
                        "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.15))",
                    py: 2,
                    px: 3,
                }}
            />

            <Divider />

            {/* Content */}
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Stack spacing={3}>
                    <TextField
                        label="Logo URL"
                        fullWidth
                        variant="outlined"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    />

                    <TextField
                        label="Banner Image URL"
                        fullWidth
                        variant="outlined"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    />
                </Stack>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-8">
                    <Button
                        variant="outlined"
                        sx={{ borderRadius: "10px", textTransform: "none", px: 3 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: "10px",
                            textTransform: "none",
                            px: 3,
                            boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
                            "&:hover": { boxShadow: "0 6px 20px rgba(59,130,246,0.4)" },
                        }}
                    >
                        Upload Media
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
