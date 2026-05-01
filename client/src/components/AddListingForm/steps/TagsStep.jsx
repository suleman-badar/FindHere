import { Card, CardContent, Typography, Button, FormGroup, FormControlLabel, Checkbox, Chip, MenuItem, Select, OutlinedInput, InputLabel, Box } from "@mui/material";

const inputSX = {
    "& .MuiOutlinedInput-root": {
        "& fieldset, & .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--color-border)",
        },
        "&.Mui-focused fieldset, &.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--color-primary)",
        },
    },
    "& label.Mui-focused": {
        color: "var(--color-primary)",
    },
};

const outlinedInputSX = {
    "& fieldset, & .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--color-border)",
    },
    "&.Mui-focused fieldset, &.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--color-primary)",
    },
};

const checkboxSX = {
    color: "var(--color-primary)",
    "&.Mui-checked": {
        color: "var(--color-primary)",
    },
};

const tagsOptions = ["Family Friendly", "Romantic", "Vegan Options", "Pet Friendly", "Casual"];
const amenitiesOptions = ["Wifi", "Parking", "Live Music", "Air Conditioning"];

export default function TagsStep({ formData, setFormData, errors = {}, nextStep, prevStep }) {
    return (
        <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
                <Typography variant="h5" className="mb-4 font-bold">Tags & Amenities</Typography>

                <FormGroup>
                    <Typography variant="subtitle1">Tags</Typography>
                    <Select
                        multiple
                        value={formData?.tags}
                        onChange={(e) => setFormData("tags", e.target.value)}
                        input={<OutlinedInput label="Tags" sx={outlinedInputSX} />}
                        sx={inputSX}
                        renderValue={(selected) => (
                            <Box className="flex flex-wrap gap-1">
                                {selected.map((tag) => <Chip key={tag} label={tag} size="small" />)}
                            </Box>
                        )}
                    >
                        {tagsOptions.map((tag) => (
                            <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                        ))}
                    </Select>
                    {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
                </FormGroup>

                <FormGroup className="mt-4">
                    <Typography variant="subtitle1">Amenities</Typography>
                    {amenitiesOptions.map((amenity) => (
                        <FormControlLabel
                            key={amenity}
                            control={
                                <Checkbox
                                    sx={checkboxSX}
                                    checked={formData.amenities?.includes(amenity) || false}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        let updated = [...formData.amenities];
                                        if (checked) updated.push(amenity);
                                        else updated = updated.filter((a) => a !== amenity);
                                        setFormData("amenities", updated);
                                    }}
                                />
                            }
                            label={amenity}
                        />
                    ))}
                </FormGroup>

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
