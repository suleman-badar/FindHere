import { Card, CardContent, Typography, TextField, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const paymentOptions = ["Cash", "Card", "Digital Wallet"];
const serviceOptions = ["Dine-in", "Takeaway", "Delivery", "Outdoor Seating", "Reservation"];

export default function PricingStep({ formData, setFormData, errors = {}, nextStep, prevStep }) {
    return (
        <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
                <Typography variant="h5" className="mb-4 font-bold">Pricing & Services</Typography>

                <TextField
                    fullWidth
                    label="Average Meal Price"
                    type="number"
                    value={formData.avgPrice}
                    onChange={(e) => setFormData("avgPrice", e.target.value)}
                    margin="normal"
                    error={!!errors.avgPrice}
                    helperText={errors.avgPrice}
                />

                <Typography variant="subtitle1" className="mt-4">Payment Methods</Typography>
                <FormGroup row>
                    {paymentOptions.map((option) => (
                        <FormControlLabel
                            key={option}
                            control={
                                <Checkbox
                                    checked={formData?.paymentMethods?.includes(option)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        let updated = formData.paymentMethods ? [...formData.paymentMethods] : [];
                                        if (checked) updated.push(option);
                                        else updated = updated.filter((o) => o !== option);
                                        setFormData("paymentMethods", updated);
                                    }}
                                />
                            }
                            label={option}
                        />
                    ))}
                </FormGroup>

                <Typography variant="subtitle1" className="mt-4">Services</Typography>
                <FormGroup row>
                    {serviceOptions.map((option) => (
                        <FormControlLabel
                            key={option}
                            control={
                                <Checkbox
                                    checked={formData.services?.includes(option) || false}   // ✅ safe
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        let updated = formData.services ? [...formData.services] : [];
                                        if (checked) updated.push(option);
                                        else updated = updated.filter((o) => o !== option);
                                        setFormData("services", updated);
                                    }}
                                />
                            }
                            label={option}
                        />
                    ))}
                </FormGroup>

                <div className="flex justify-between mt-6">
                    <Button variant="outlined" onClick={prevStep}>Back</Button>
                    <Button variant="contained" color="primary" onClick={nextStep}>Next</Button>
                </div>
            </CardContent>
        </Card>
    );
}
