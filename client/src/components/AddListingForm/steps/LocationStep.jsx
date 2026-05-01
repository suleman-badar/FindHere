import { Card, CardContent, Typography, Button, TextField } from "@mui/material";
import FreeMapSelector from "../../FreeMapSelector";

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

export default function LocationStep({ formData, setFormData, nextStep, prevStep, errors = {} }) {
    return (
        <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
                <Typography variant="h5" className="mb-4 font-bold">Location</Typography>

                <FreeMapSelector
                    location={formData.location}
                    setLocation={(coords) => setFormData("location", coords)}
                />

                {errors["location[0]"] && <p className="text-red-500 text-sm mt-1">{errors["location[0]"]}</p>}
                {errors["location[1]"] && <p className="text-red-500 text-sm mt-1">{errors["location[1]"]}</p>}

                <TextField
                    fullWidth
                    label="Additional Address Note"
                    value={formData.addressNote}
                    onChange={(e) => setFormData("addressNote", e.target.value)}
                    margin="normal"
                    error={!!errors.addressNote}
                    helperText={errors.addressNote}
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
