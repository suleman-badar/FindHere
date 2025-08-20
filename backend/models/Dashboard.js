import mongoose, { Schema } from "mongoose";

const dashBoardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: [Number], // [latitude, longitude] (gpt ne btaya agar apnay map se configure karna toh esse best hei like you did in frontend)
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
    phone: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    openingHours: {
      open: { type: String, required: true },  // e.g. "09:00"
      close: { type: String, required: true }, // e.g. "22:00"
    },
    images: {
      type: [String], // will store URLs or file paths
      default: [],
    },
  },
  { timestamps: true }
);

const DashBoard = mongoose.model("dashboard", dashBoardSchema);
export default DashBoard;
