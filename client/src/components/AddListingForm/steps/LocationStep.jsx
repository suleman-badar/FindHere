import { Card, CardContent, Typography, Button, TextField } from "@mui/material";
import FreeMapSelector from "../../FreeMapSelector";

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
                    label="Address"
                    value={formData.address}
                    onChange={(e) => setFormData("address", e.target.value)}
                    margin="normal"
                    error={!!errors.address}
                    helperText={errors.address}
                />

                <div className="flex justify-between mt-6">
                    <Button variant="outlined" onClick={prevStep}>Back</Button>
                    <Button variant="contained" color="primary" onClick={nextStep}>Next</Button>
                </div>
            </CardContent>
        </Card>
    );
}
