import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: [Number],
        required: true,
        validate: {
            validator: (arr) => arr.length === 2,
            message: "Location must be [latitude, longitude]",
        },
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000,
    },
    number: {
        type: String,
        trim: true,
        maxlength: 11,

    },
    weblink: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,

    },
    country: {
        type: String,
        trim: true,
        default: "Pakistan",

    },
    about: {
        type: String,
        trim: true,
        default: "",
    },
    openingHours: {
        open: {
            type: String,
            required: true
        },
        close: {
            type: String,
            required: true
        },
    },
    images: {
        type: [String],
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Listing = mongoose.model("listing", listingSchema);
export default Listing;