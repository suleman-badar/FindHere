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
    number: {
      type: String,
      trim: true,
    },
    weblink: {
      type: String,
      trim: true,
    },
    openingHours: {
        opentime: { 
            type: String, required: true 
        },  
        closingtime: { 
            type: String, required: true 
        }, 
    },
    images: {
      type: [String], 
      required: false
    },
  },
  { timestamps: true }
);

const DashBoard = mongoose.model("dashboard", dashBoardSchema);
export default DashBoard;
