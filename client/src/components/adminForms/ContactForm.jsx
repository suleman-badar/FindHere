import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Grid,
    TextField,
    Button,
    Divider,
    Stack,
} from "@mui/material";

export default function ContactForm() {
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
                        Contact Info
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
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone Number"
                            fullWidth
                            variant="outlined"
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            fullWidth
                            variant="outlined"
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Website"
                            fullWidth
                            variant="outlined"
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                        />
                    </Grid>
                </Grid>

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
                        Save Contact
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
