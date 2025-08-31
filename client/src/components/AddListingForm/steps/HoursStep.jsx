import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function HoursStep({ formData, setFormData, errors = {}, nextStep, prevStep }) {
    return (
        <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
                <Typography variant="h5" className="mb-4 font-bold">Opening Hours</Typography>

                {days.map((day) => (
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
                                InputLabelProps={{ shrink: true }}
                                label="Open"
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
                                InputLabelProps={{ shrink: true }}
                                label="Close"
                            />
                        </div>
                    </div>
                ))}

                <div className="flex justify-between mt-6">
                    <Button variant="outlined" onClick={prevStep}>Back</Button>
                    <Button variant="contained" color="primary" onClick={nextStep}>Next</Button>
                </div>
            </CardContent>
        </Card>
    );
}
