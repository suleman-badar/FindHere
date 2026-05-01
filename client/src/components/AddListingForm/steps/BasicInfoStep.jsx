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


const cuisines = ["Italian", "Chinese", "Fast Food", "Cafe", "Indian", "Mexican", "Japanese"];

export default function BasicInfoStep({
    formData,
    setFormData,
    nextStep,
    prevStep,
    errors = {}
}) {
    return (
        <Card className="shadow-lg rounded-2xl border border-[var(--color-border)]">
            <CardContent className="p-6">

                <Typography
                    variant="h5"
                    className="font-bold text-[var(--color-text)] mb-6"
                >
                    Basic Info
                </Typography>

                {/* FIXED SPACING SYSTEM */}
                <div className="flex flex-col gap-6">

                    {/* NAME */}
                    <div className="flex flex-col gap-1">
                        <TextField
                            fullWidth
                            label="Restaurant Name"
                            value={formData.name || ""}
                            onChange={(e) => setFormData("name", e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                            sx={inputSX}
                        />
                    </div>

                    {/* TAGLINE */}
                    <div className="flex flex-col gap-1">
                        <TextField
                            fullWidth
                            label="Tagline (optional)"
                            value={formData.tagline || ""}
                            onChange={(e) => setFormData("tagline", e.target.value)}
                            error={!!errors.tagline}
                            helperText={errors.tagline}
                            sx={inputSX}
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="flex flex-col gap-1">
                        <TextField
                            fullWidth
                            label="Description"
                            value={formData.description || ""}
                            onChange={(e) => setFormData("description", e.target.value)}
                            multiline
                            rows={4}
                            error={!!errors.description}
                            helperText={errors.description}
                            sx={inputSX}
                        />
                    </div>

                    {/* CUISINE */}
                    <div className="flex flex-col gap-1">
                        <FormControl fullWidth>
                            <InputLabel>Cuisine Type</InputLabel>
                            <Select
                                multiple
                                value={formData.cuisine || []}
                                onChange={(e) => setFormData("cuisine", e.target.value)}
                                input={<OutlinedInput label="Cuisine Type" sx={outlinedInputSX} />}
                                sx={inputSX}
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

                            {errors.cuisine && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.cuisine}
                                </p>
                            )}
                        </FormControl>
                    </div>

                    {/* YEAR */}
                    <div className="flex flex-col gap-1">
                        <TextField
                            fullWidth
                            label="Established Year"
                            type="number"
                            value={formData.establishedYear || ""}
                            onChange={(e) => setFormData("establishedYear", e.target.value)}
                            error={!!errors.establishedYear}
                            helperText={errors.establishedYear}
                            sx={inputSX}
                        />
                    </div>

                </div>

                {/* NAVIGATION */}
                <div className="flex justify-between mt-8 pt-4 border-t border-[var(--color-border)]">
                    <Button
                        variant="outlined"
                        onClick={prevStep}
                        sx={{
                            textTransform: "none",
                            borderColor: "var(--color-border)",
                            color: "var(--color-text)",
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