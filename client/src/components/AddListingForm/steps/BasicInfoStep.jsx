import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Chip,
    OutlinedInput
} from "@mui/material";

const cuisines = ["Italian", "Chinese", "Fast Food", "Cafe", "Indian", "Mexican", "Japanese"];

export default function BasicInfoStep({ formData, setFormData, nextStep, prevStep, errors = {} }) {
    return (
        <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
                <Typography variant="h5" className="mb-4 font-bold">Basic Info</Typography>

                <TextField
                    fullWidth
                    label="Restaurant Name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData("name", e.target.value)}
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name}
                />

                <TextField
                    fullWidth
                    label="Tagline (optional)"
                    value={formData.tagline || ""}
                    onChange={(e) => setFormData("tagline", e.target.value)}
                    margin="normal"
                    error={!!errors.tagline}
                    helperText={errors.tagline}
                />

                <TextField
                    fullWidth
                    label="Description"
                    value={formData.description || ""}
                    onChange={(e) => setFormData("description", e.target.value)}
                    margin="normal"
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Cuisine Type</InputLabel>
                    <Select
                        multiple
                        value={formData.cuisine || []}
                        onChange={(e) => setFormData("cuisine", e.target.value)}
                        input={<OutlinedInput label="Cuisine Type" />}
                        renderValue={(selected) => (
                            <div className="flex flex-wrap gap-1">
                                {selected.map((value) => (
                                    <Chip key={value} label={value} size="small" />
                                ))}
                            </div>
                        )}
                    >
                        {cuisines.map((cuisine) => (
                            <MenuItem key={cuisine} value={cuisine}>
                                {cuisine}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.cuisine && <p className="text-red-500 text-sm mt-1">{errors.cuisine}</p>}
                </FormControl>

                <TextField
                    fullWidth
                    label="Established Year"
                    type="number"
                    value={formData.establishedYear || ""}
                    onChange={(e) => setFormData("establishedYear", e.target.value)}
                    margin="normal"
                    error={!!errors.establishedYear}
                    helperText={errors.establishedYear}
                />

                <div className="flex justify-between mt-6">
                    <Button variant="outlined" onClick={prevStep}>Back</Button>
                    <Button variant="contained" color="primary" onClick={nextStep}>Next</Button>
                </div>
            </CardContent>
        </Card>
    );
}
