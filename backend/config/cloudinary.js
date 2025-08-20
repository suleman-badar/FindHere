import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "restaurants", 
    allowed_formats: ["jpg", "jpeg", "png"], 
    public_id: (req, file) => Date.now(), 
  },
});

const upload = multer({ storage });

export { cloudinary, upload };
