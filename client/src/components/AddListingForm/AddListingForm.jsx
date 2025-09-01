import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, Button, Divider } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { steps } from "./stepsConfig";
import StepperHeader from "./StepperHeader";
import StepWrapper from "./StepWrapper";
import Preview from "./Preview";
import axios from "axios"
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

export default function AddListingForm() {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const [formData, setFormDataState] = useState({
        name: "",
        tagline: "",
        location: [],
        addressNote: "",
        phone: "",
        email: "",
        website: "",
        establishedYear: "",
        hours: {
            Monday: { open: "", close: "" },
            Tuesday: { open: "", close: "" },
            Wednesday: { open: "", close: "" },
            Thursday: { open: "", close: "" },
            Friday: { open: "", close: "" },
            Saturday: { open: "", close: "" },
            Sunday: { open: "", close: "" },
        },
        paymentMethods: [],
        services: [],
        tags: [],
        amenities: [],
        cuisine: [],
        price: "",
    });

    const setFormData = (field, value) => {
        setFormDataState((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const [direction, setDirection] = useState(1);

    const nextStep = () => {
        if (step < steps.length - 1) {
            setDirection(1);
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setDirection(-1);
            setStep(step - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const data = new FormData();

            // Append images
            formData.images.forEach((img) => {
                data.append("images", img);
            });

            // Append other fields
            Object.keys(formData).forEach((key) => {
                if (key === "location") {
                    formData.location.forEach((coord) => data.append("location[]", coord));
                } else if (key !== "images") {
                    if (typeof formData[key] === "object") {
                        data.append(key, JSON.stringify(formData[key]));
                    } else {
                        data.append(key, formData[key]);
                    }
                }
            });

            const res = await axios.post(
                "http://localhost:8000/api/listing",
                data,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success("Restaurant added successfully!");
            }
            navigate("/admin/dashboard");

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10 px-4 flex justify-center items-center">
            <AnimatePresence mode="wait">
                {step === 0 ? (
                    // Intro Step (Get Started)
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -40, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full max-w-2xl"
                    >
                        <Box
                            sx={{
                                p: { xs: 4, sm: 6 },
                                borderRadius: "16px",
                                bgcolor: "white",
                                boxShadow: 2,
                                border: "1px solid #e5e7eb",
                                textAlign: "center",
                            }}
                        >
                            {/* Header */}
                            <Box sx={{ mb: 4 }}>
                                <RestaurantIcon
                                    sx={{
                                        fontSize: { xs: 40, sm: 50 },
                                        color: "primary.main",
                                        mb: 2,
                                    }}
                                />
                                <Typography
                                    variant="h5"
                                    sm="h4"
                                    fontWeight="bold"
                                    color="text.primary"
                                >
                                    Add a New Restaurant Listing
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ mt: 1, maxWidth: 600, mx: "auto" }}
                                >
                                    Welcome! We’ll guide you step by step to add all the necessary
                                    information about your restaurant so it can rank higher, get
                                    discovered, and attract more customers.
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            {/* CTA */}
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    px: 5,
                                    py: 1.5,
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                }}
                                onClick={nextStep}
                            >
                                Get Started
                            </Button>
                        </Box>
                    </motion.div>
                ) : (
                    //  Normal Layout with Form + Preview
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, x: direction === 1 ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction === 1 ? -50 : 50 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 w-full"
                    >
                        {/* Left side - Form (always visible) */}
                        <div className="lg:col-span-2 space-y-8">
                            <StepperHeader step={step - 1} steps={steps.slice(1)} />
                            <StepWrapper
                                step={step}
                                steps={steps}
                                direction={direction}
                                formData={formData}
                                setFormData={setFormData}
                                nextStep={nextStep}
                                prevStep={prevStep}
                                handleSubmit={handleSubmit}
                            />
                        </div>

                        {/* Right side - Preview (hidden on small screens) */}
                        <div className="hidden lg:flex flex-col items-center space-y-6 sticky top-20">
                            <div className="bg-white rounded-2xl shadow-lg border p-6 w-full">
                                <Preview
                                    step={step}
                                    totalSteps={steps.length}
                                    formData={formData}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
