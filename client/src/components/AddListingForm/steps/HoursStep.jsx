import { Card, CardContent, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function HoursStep({ formData, setFormData, errors = {}, nextStep, prevStep }) {
    const [mode, setMode] = useState("different"); // "same" or "different"

    const handleSameChange = (field, value) => {
        // Update all days with the same value
        const updatedHours = {};
        days.forEach(day => {
            updatedHours[day] = { ...formData.hours[day], [field]: value };
        });
        setFormData("hours", updatedHours);
    };

    return (
        <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
                <Typography variant="h5" className="mb-4 font-bold">Opening Hours</Typography>

                {/* Selection Mode */}
                <RadioGroup
                    row
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="mb-6"
                >
                    <FormControlLabel value="same" control={<Radio />} label="Same hours for all days" />
                    <FormControlLabel value="different" control={<Radio />} label="Different hours for each day" />
                </RadioGroup>

                {mode === "same" ? (
                    // Same hours for all days
                    <div className="flex gap-4">
                        <TextField
                            type="time"
                            value={formData.hours[days[0]].open}
                            onChange={(e) => handleSameChange("open", e.target.value)}
                            error={!!errors[`hours.open`]}
                            helperText={errors[`hours.open`]}
                            label="Open"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            type="time"
                            value={formData.hours[days[0]].close}
                            onChange={(e) => handleSameChange("close", e.target.value)}
                            error={!!errors[`hours.close`]}
                            helperText={errors[`hours.close`]}
                            label="Close"
                            InputLabelProps={{ shrink: true }}
                        />
                    </div>
                ) : (
                    // Different hours for each day
                    days.map((day) => (
                        <div key={day} className="mb-4">
                            <Typography variant="subtitle1" className="mb-2">{day}</Typography>
                            <div className="flex gap-4">
                                <TextField
                                    type="time"
                                    value={formData.hours[day].open}
                                    onChange={(e) =>
                                        setFormData("hours", {
                                            ...formData.hours,
                                            [day]: { ...formData.hours[day], open: e.target.value }
                                        })
                                    }
                                    error={!!errors[`hours.${day}.open`]}
                                    helperText={errors[`hours.${day}.open`]}
                                    label="Open"
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    type="time"
                                    value={formData.hours[day].close}
                                    onChange={(e) =>
                                        setFormData("hours", {
                                            ...formData.hours,
                                            [day]: { ...formData.hours[day], close: e.target.value }
                                        })
                                    }
                                    error={!!errors[`hours.${day}.close`]}
                                    helperText={errors[`hours.${day}.close`]}
                                    label="Close"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                        </div>
                    ))
                )}

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                    <Button variant="outlined" onClick={prevStep}>Back</Button>
                    <Button variant="contained" color="primary" onClick={nextStep}>Next</Button>
                </div>
            </CardContent>
        </Card>
    );
}
