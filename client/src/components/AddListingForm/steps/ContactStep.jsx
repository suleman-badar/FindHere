import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const inputSX = {
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "var(--color-border)",
        },
        "&.Mui-focused fieldset": {
            borderColor: "var(--color-primary)",
        },
    },
    "& label.Mui-focused": {
        color: "var(--color-primary)",
    },
};

export default function ContactStep({ formData, setFormData, nextStep, prevStep, errors = {} }) {
    return (
        <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
                <Typography variant="h5" className="mb-4 font-bold">Contact Info</Typography>

                <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData("phone", e.target.value)}
                    margin="normal"
                    error={!!errors.phone}
                    helperText={errors.phone}
                    sx={inputSX}
                />

                <TextField
                    fullWidth
                    label="Email (optional)"
                    value={formData.email}
                    onChange={(e) => setFormData("email", e.target.value)}
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={inputSX}
                />

                <TextField
                    fullWidth
                    label="Website (optional)"
                    value={formData.website}
                    onChange={(e) => setFormData("website", e.target.value)}
                    margin="normal"
                    error={!!errors.website}
                    helperText={errors.website}
                    sx={inputSX}
                />

                <div className="flex justify-between mt-6">
                    <Button
                        variant="outlined"
                        onClick={prevStep}
                        sx={{
                            textTransform: "none",
                            color: "var(--color-text)",
                            borderColor: "var(--color-border)",
                            "&:hover": {
                                borderColor: "var(--color-primary)",
                            },
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={nextStep}
                        sx={{
                            textTransform: "none",
                            background: "var(--gradient-primary)",
                            color: "#fff",
                            "&:hover": {
                                boxShadow: "0 8px 24px rgba(185,28,28,0.25)",
                            },
                        }}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
