import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";


import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import listingRoutes from "./routes/listingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

import helmet from "helmet";



dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());



app.get("/", (_req, res) => res.send("API is running"));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/search", searchRoutes);
// app.use("/api/map", mapRoute);



app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

app.use((_req, res) => res.status(404).json({ message: "Route not found" }));