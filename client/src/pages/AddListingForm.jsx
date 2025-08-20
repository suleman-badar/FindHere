import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import FreeMapSelector from "../components/FreeMapSelector";
import HourDropdown from "../components/HourDropdown";

const steps = [
    { key: "name", label: "Restaurant Name" },
    { key: "location", label: "Select Location on Map" },
    { key: "description", label: "Description" },
    { key: "phone", label: "Phone Number" },
    { key: "website", label: "Website URL" },
    { key: "openingHours", label: "Opening Hours" },
    { key: "images", label: "Upload Images" },
];

export default function AddListingForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        location: [31.5497, 74.3436],
        description: "",
        phone: "",
        website: "",
        openingHours: { open: "", close: "" },
        images: [],
    });

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [steps[currentStep].key]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
    };

    const handleSubmit = async () => {
        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key === "images") {
                    formData.images.forEach((file) => data.append("images", file));
                } else {
                    data.append(key, formData[key]);
                }
            });

            const res = await axios.post(
                "http://localhost:8000/api/listings",
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            alert("Restaurant Added!");
            console.log(res.data);

            setFormData({
                name: "",
                location: [51.505, -0.09],
                description: "",
                phone: "",
                website: "",
                openingHours: "",
                images: [],
            });
            setCurrentStep(0);
        } catch (err) {
            console.error(err);
            alert("Error adding restaurant!");
        }
    };

    return (
        <Box
            sx={{
                maxWidth: "500px",
                mx: "auto",
                my: 5,
                p: 4,
                border: "1px solid #ccc",
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            <Typography variant="h6" mb={2}>
                {steps[currentStep].label}
            </Typography>

            {currentStep === 1 ? (
                <FreeMapSelector
                    location={formData.location}
                    setLocation={(loc) => setFormData({ ...formData, location: loc })}
                />
            ) : currentStep === 5 ? (
                <Box sx={{ display: "flex", gap: 2 }}>
                    <HourDropdown
                        label="Opens At"
                        value={formData.openingHours.open}
                        onChange={(val) =>
                            setFormData({
                                ...formData,
                                openingHours: { ...formData.openingHours, open: val },
                            })
                        }
                    />
                    <HourDropdown
                        label="Closes At"
                        value={formData.openingHours.close}
                        onChange={(val) =>
                            setFormData({
                                ...formData,
                                openingHours: { ...formData.openingHours, close: val },
                            })
                        }
                    />
                </Box>
            ) : currentStep === steps.length - 1 ? (
                <Box
                    sx={{
                        border: "2px dashed #082567",
                        borderRadius: 2,
                        p: 3,
                        textAlign: "center",
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f9f9f9" },
                    }}
                    onClick={() => document.getElementById("file-upload").click()}
                >
                    <Typography variant="body1" color="textSecondary">
                        Click or Drag & Drop Images Here
                    </Typography>
                    <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                </Box>
            ) : (
                <TextField
                    fullWidth
                    value={formData[steps[currentStep].key]}
                    onChange={handleChange}
                    placeholder={`Enter ${steps[currentStep].label}`}
                />
            )}


            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button disabled={currentStep === 0} onClick={handlePrev}>
                    Back
                </Button>

                {currentStep < steps.length - 1 ? (
                    <Button variant="contained" onClick={handleNext}>
                        Next
                    </Button>
                ) : (
                    <Button variant="contained" color="success" onClick={handleSubmit}>
                        Submit
                    </Button>
                )}
            </Box>

            <Typography mt={2} textAlign="center">
                Step {currentStep + 1} of {steps.length}
            </Typography>
        </Box>
    );
}
