import mongoose from "mongoose";

const openingHoursSchema = new mongoose.Schema({
    open: { type: String, default: "" }, // you can store as "HH:mm" string
    close: { type: String, default: "" },
}, { _id: false });

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    tagline: {
        type: String,
        trim: true,
        maxlength: 150,
    },
    images: {
        type: [String], // URL or path
        default: "",
    },
    location: {
        type: [Number],
        required: true,
    },
    address: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    website: {
        type: String,
        trim: true,
    },
    hours: {
        Monday: { type: openingHoursSchema, default: () => ({}) },
        Tuesday: { type: openingHoursSchema, default: () => ({}) },
        Wednesday: { type: openingHoursSchema, default: () => ({}) },
        Thursday: { type: openingHoursSchema, default: () => ({}) },
        Friday: { type: openingHoursSchema, default: () => ({}) },
        Saturday: { type: openingHoursSchema, default: () => ({}) },
        Sunday: { type: openingHoursSchema, default: () => ({}) },
    },
    paymentMethods: {
        type: [String],
        default: [],
        enum: ["Cash", "Card", "Digital Wallet"],
    },
    services: {
        type: [String],
        default: [],
        enum: ["Dine-in", "Takeaway", "Delivery", "Outdoor Seating", "Reservation"],
    },
    tags: {
        type: [String],
        default: [],
        enum: ["Family Friendly", "Romantic", "Vegan Options", "Pet Friendly", "Casual"],
    },
    amenities: {
        type: [String],
        default: [],
        enum: ["Wifi", "Parking", "Live Music", "Outdoor Seating", "Air Conditioning"],
    },
    price: {
        type: Number, //avg price
        min: 0,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Listing = mongoose.model("listing", listingSchema);
export default Listing;