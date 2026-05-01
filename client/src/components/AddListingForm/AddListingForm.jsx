import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, Button, Divider } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { steps } from "./stepsConfig";
import StepperHeader from "./StepperHeader";
import StepWrapper from "./StepWrapper";
import Preview from "./Preview";
import api from "../../api/axios"
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

export default function AddListingForm() {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
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
        images: [],
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

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    const [direction, setDirection] = useState(1);

    const validateFormStep = (currentStep) => {
        const validationErrors = {};

        switch (currentStep) {
            case 1:
                if (!formData.name?.trim()) validationErrors.name = "Restaurant name is required";
                if (!formData.description?.trim()) validationErrors.description = "Description is required";
                if (!formData.cuisine?.length) validationErrors.cuisine = "Select at least one cuisine";
                break;
            case 2:
                if (!formData.phone?.trim()) {
                    validationErrors.phone = "Phone number is required";
                } else if (!/^\+?[0-9\s()-]{7,20}$/.test(formData.phone)) {
                    validationErrors.phone = "Enter a valid phone number";
                }
                if (formData.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    validationErrors.email = "Invalid email address";
                }
                break;
            case 3:
                if (!formData.location?.length || formData.location.some((coord) => coord === undefined || coord === null || coord === "")) {
                    validationErrors["location[0]"] = "Please select a valid location";
                }
                break;
            case 5:
                if (!formData.avgPrice?.toString().trim()) validationErrors.avgPrice = "Average price is required";
                break;
            case 6:
                if (!formData.tags?.length) validationErrors.tags = "Add at least one tag";
                break;
            case 7:
                if (!formData.images?.length) validationErrors.images = "Upload at least one image";
                break;
            default:
                break;
        }

        return validationErrors;
    };

    const nextStep = () => {
        const validationErrors = validateFormStep(step);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
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
        const validationErrors = validateFormStep(step);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

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

            const res = await api.post(
                "/api/listing",
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
        <div className="min-h-screen bg-[#fff6f5] py-10 px-4 flex justify-center items-start">
            <AnimatePresence mode="wait">
                {step === 0 ? (
                    /* ================= INTRO ================= */
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -40, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-2xl"
                    >
                        <Box
                            sx={{
                                p: { xs: 4, sm: 6 },
                                borderRadius: "20px",
                                bgcolor: "#ffffff",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                                border: "1px solid var(--color-border)",
                                textAlign: "center",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* Accent Top Bar */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "4px",
                                    background:
                                        "linear-gradient(90deg, var(--color-primary-dark), var(--color-primary))",
                                }}
                            />

                            <Box sx={{ mb: 4 }}>
                                <RestaurantIcon
                                    sx={{
                                        fontSize: 50,
                                        color: "var(--color-primary)",
                                        mb: 2,
                                    }}
                                />

                                <Typography fontWeight="bold" sx={{ fontSize: "1.6rem", color: "var(--color-text)" }}>
                                    Add a New Restaurant Listing
                                </Typography>

                                <Typography sx={{ mt: 1, color: "var(--color-muted)" }}>
                                    We’ll guide you step by step to create a powerful listing that attracts customers.
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 4, borderColor: "var(--color-border)" }} />

                            <Button
                                onClick={nextStep}
                                sx={{
                                    px: 5,
                                    py: 1.5,
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    color: "white",
                                    background:
                                        "linear-gradient(90deg, var(--color-primary-dark), var(--color-primary))",
                                    "&:hover": {
                                        boxShadow: "0 8px 20px rgba(185,28,28,0.3)",
                                    },
                                }}
                            >
                                Get Started
                            </Button>
                        </Box>
                    </motion.div>
                ) : (
                    /* ================= MAIN FORM ================= */
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, x: direction === 1 ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction === 1 ? -50 : 50 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 w-full"
                    >
                        {/* LEFT SIDE */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Stepper Wrapper */}
                            <div className="bg-white border border-[#e9e5e5] rounded-2xl p-5 shadow-sm">
                                <StepperHeader step={step - 1} steps={steps.slice(1)} />
                            </div>

                            {/* Step Content */}
                            <div className="bg-white border border-[#e9e5e5] rounded-2xl p-6 shadow-md relative overflow-hidden">

                                {/* Accent line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9d1717] to-[#b91c1c]" />

                                <StepWrapper
                                    step={step}
                                    steps={steps}
                                    direction={direction}
                                    formData={formData}
                                    setFormData={setFormData}
                                    nextStep={nextStep}
                                    prevStep={prevStep}
                                    handleSubmit={handleSubmit}
                                    errors={errors}
                                    loading={loading}
                                />
                            </div>
                        </div>

                        {/* RIGHT SIDE PREVIEW */}
                        <div className="hidden lg:flex flex-col sticky top-20">

                            <div className="bg-white border border-[#e9e5e5] rounded-2xl shadow-lg p-6 relative overflow-hidden">

                                {/* Accent */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff7043] to-[#b91c1c]" />

                                <h3 className="text-sm font-semibold text-[#6b7280] mb-4 uppercase tracking-wide">
                                    Live Preview
                                </h3>

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
        </div>);
}
