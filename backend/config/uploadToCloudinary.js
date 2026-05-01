// utils/uploadToCloudinary.js
import cloudinary from "./cloudinary.js";

export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "restaurants" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};