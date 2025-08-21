import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import listingRoutes from "./routes/listingRoute.js";
import mapRoute from "./routes/mapRoute.js";


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (_req, res) => res.send("API is running"));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/map", mapRoute);



app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});