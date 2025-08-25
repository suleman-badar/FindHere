import { use, useState } from "react";
import Stepper from "../components/AddListingForm/Stepper";
import StepCard from "../components/AddListingForm/StepCard";
import Preview from "../components/AddListingForm/Preview";
import FreeMapSelector from "../components/FreeMapSelector";
import Loader from "../components/Loader";
import ListingValidation from "../validations/listingValidations";
import axios from "axios";

export default function AddListingForm() {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        location: null,
        description: "",
        number: "",
        openingHours: { open: "", close: "" },
        images: [],
    });

    const nextStep = async () => {
        try {
            await ListingValidation[step].validate(formData, { abortEarly: false });
            setErrors({});
            setStep((s) => Math.min(s + 1, 4));
        } catch (err) {
            if (err.inner) {
                const formErrors = {};
                err.inner.forEach((e) => {
                    formErrors[e.path] = e.message;
                });
                setErrors(formErrors);
            }
        }
    };

    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async () => {
        try {
            for (let i = 1; i <= 4; i++) {
                await ListingValidation[i].validate(formData, { abortEarly: false });
            }

            const data = new FormData();
            data.append("name", formData.name);
            data.append("number", formData.number);
            data.append("description", formData.description);
            data.append("latitude", formData.location[0]);
            data.append("longitude", formData.location[1]);
            data.append("open", formData.openingHours.open);
            data.append("close", formData.openingHours.close);

            formData.images.forEach((img, idx) => {
                data.append("images", img);
            });

            try {
                setLoading(true);
                await axios.post("http://localhost:8000/api/listing/create-listing", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setFormData({
                    name: "",
                    location: ["", ""],
                    description: "",
                    number: "",
                    openingHours: { open: "", close: "" },
                    images: [],
                });
                setStep(1);
            } catch (err) {
                console.error("Submission error:", err);
                alert(err.response?.data?.message || "Failed to submit listing");
            } finally {
                setLoading(false);
                alert("Listing submitted successfully!");


            }

        } catch (err) {
            if (err.inner) {
                const formErrors = {};
                err.inner.forEach((e) => {
                    formErrors[e.path] = e.message;
                });
                setErrors(formErrors);
            } else {
                console.error(err);
            }
        }
    };

    const inputClasses =
        "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm " +
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none";

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-6">
            <div className="flex-1">
                <Stepper currentStep={step} />

                {/*Basic Info */}
                {step === 1 && (
                    <StepCard title="Basic Info">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className={inputClasses}
                            value={formData.name}
                            onChange={(e) => updateField("name", e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

                        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            placeholder="Enter phone number"
                            className={inputClasses}
                            value={formData.number}
                            onChange={(e) => updateField("number", e.target.value)}
                        />
                        {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}

                        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            placeholder="Write a short description..."
                            className={`${inputClasses} h-28 resize-none`}
                            value={formData.description}
                            onChange={(e) => updateField("description", e.target.value)}
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}

                        <div className="flex justify-between mt-6">
                            <button disabled className="px-4 py-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed">Back</button>
                            <button onClick={nextStep} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Next</button>
                        </div>
                    </StepCard>
                )}

                {/* Location */}
                {step === 2 && (
                    <StepCard title="Location">
                        <FreeMapSelector
                            location={formData.location}
                            setLocation={(coords) => updateField("location", coords)}
                        />
                        <div className="flex justify-between mt-6">
                            <button onClick={prevStep} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Back</button>
                            <button onClick={nextStep} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Next</button>
                        </div>
                        {errors["location[0]"] && (
                            <p className="text-red-500 text-sm mt-1">{errors["location[0]"]}</p>
                        )}
                        {errors["location[1]"] && (
                            <p className="text-red-500 text-sm mt-1">{errors["location[1]"]}</p>
                        )}

                    </StepCard>
                )}

                {step === 3 && (
                    <StepCard title="Opening Hours">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Opening Time</label>
                        <input
                            type="time"
                            className={inputClasses}
                            value={formData.openingHours.open}
                            onChange={(e) =>
                                updateField("openingHours", {
                                    ...formData.openingHours,
                                    open: e.target.value,
                                })
                            }
                        />
                        {errors["openingHours.open"] && (
                            <p className="text-red-500 text-sm mt-1">{errors["openingHours.open"]}</p>
                        )}


                        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Closing Time</label>
                        <input
                            type="time"
                            className={inputClasses}
                            value={formData.openingHours.close}
                            onChange={(e) =>
                                updateField("openingHours", {
                                    ...formData.openingHours,
                                    close: e.target.value,
                                })
                            }
                        />
                        {errors["openingHours.close"] && (
                            <p className="text-red-500 text-sm mt-1">{errors["openingHours.close"]}</p>
                        )}

                        <div className="flex justify-between mt-6">
                            <button onClick={prevStep} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Back</button>
                            <button onClick={nextStep} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Next</button>
                        </div>
                    </StepCard>
                )}

                {step === 4 && (

                    <StepCard title="Upload Images">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Upload Images</label>

                        <input
                            type="file"
                            multiple
                            id="fileUpload"
                            className="hidden"
                            onChange={(e) => updateField("images", Array.from(e.target.files))}
                        />

                        <label
                            htmlFor="fileUpload"
                            className="flex items-center justify-center gap-2 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Select Images
                        </label>

                        {formData.images.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-3">
                                {formData.images.map((file, idx) => {
                                    let url;
                                    if (file instanceof File) {
                                        url = URL.createObjectURL(file);
                                    } else if (typeof file === "string") {
                                        url = file;
                                    } else {
                                        return null;
                                    }
                                    return (
                                        <img
                                            key={idx}
                                            src={url}
                                            alt={`preview ${idx}`}
                                            className="w-24 h-24 object-cover rounded-lg border"
                                        />
                                    );
                                })}
                            </div>
                        )}

                        {errors.images && (
                            <p className="text-red-500 text-sm mt-1">{errors.images}</p>
                        )}

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={prevStep}
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                            >
                                Back
                            </button>
                            <div>{loading && (<Loader />)}</div>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                            >
                                Submit
                            </button>
                        </div>

                    </StepCard>

                )}

            </div>

            <div className="hidden lg:block w-80">
                <Preview formData={formData} />
            </div>
        </div>
    );
}
