import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});