// listingValidations.js
import * as Yup from "yup";

// 1️⃣ Intro Step (no required fields)
const introValidation = Yup.object().shape({});

// 2️⃣ Basic Info
const basicInfoValidation = Yup.object().shape({
    name: Yup.string().required("Restaurant name is required").min(2, "Too short"),
    description: Yup.string().required("Description is required").min(10, "Too short"),
    cuisine: Yup.array().min(1, "Select at least one cuisine type"),
    establishedYear: Yup.number()
        .typeError("Enter a valid year")
        .min(1800, "Too early")
        .max(new Date().getFullYear(), "Cannot be in the future")
        .required("Established year is required"),
});

// 3️⃣ Contact Info
const contactValidation = Yup.object().shape({
    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9+() -]+$/, "Invalid phone number"),
    email: Yup.string().email("Invalid email").nullable(),
    website: Yup.string().url("Invalid URL").nullable(),
});

// 4️⃣ Location
const locationValidation = Yup.object().shape({
    location: Yup.array()
        .of(Yup.number().required("Required"))
        .length(2, "Invalid coordinates"),
    address: Yup.string().required("Address is required"),
});

// 5️⃣ Opening Hours
const daySchema = Yup.object().shape({
    open: Yup.string().required("Open time required"),
    close: Yup.string().required("Close time required"),
});

const openingHoursValidation = Yup.object().shape({
    openingHours: Yup.object().shape({
        Monday: daySchema,
        Tuesday: daySchema,
        Wednesday: daySchema,
        Thursday: daySchema,
        Friday: daySchema,
        Saturday: daySchema,
        Sunday: daySchema,
    }),
});

// 6️⃣ Pricing & Services
const pricingServicesValidation = Yup.object().shape({
    avgPrice: Yup.number().typeError("Must be a number").required("Average price required"),
    paymentMethods: Yup.array().min(1, "Select at least one payment method"),
    services: Yup.array().min(1, "Select at least one service"),
});

// 7️⃣ Tags & Amenities
const tagsAmenitiesValidation = Yup.object().shape({
    tags: Yup.array().min(1, "Select at least one tag"),
    amenities: Yup.array().min(1, "Select at least one amenity"),
});

// 8️⃣ Images
const imagesValidation = Yup.object().shape({
    images: Yup.array().min(1, "At least one image is required"),
});

// Export all validations in one object
export default {
    0: introValidation,
    1: basicInfoValidation,
    2: contactValidation,
    3: locationValidation,
    4: openingHoursValidation,
    5: pricingServicesValidation,
    6: tagsAmenitiesValidation,
    7: imagesValidation,
};