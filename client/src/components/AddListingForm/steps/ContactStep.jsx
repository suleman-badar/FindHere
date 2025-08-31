import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

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
                />

                <TextField
                    fullWidth
                    label="Email (optional)"
                    value={formData.email}
                    onChange={(e) => setFormData("email", e.target.value)}
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email}
                />

                <TextField
                    fullWidth
                    label="Website (optional)"
                    value={formData.website}
                    onChange={(e) => setFormData("website", e.target.value)}
                    margin="normal"
                    error={!!errors.website}
                    helperText={errors.website}
                />

                <div className="flex justify-between mt-6">
                    <Button variant="outlined" onClick={prevStep}>Back</Button>
                    <Button variant="contained" color="primary" onClick={nextStep}>Next</Button>
                </div>
            </CardContent>
        </Card>
    );
}
