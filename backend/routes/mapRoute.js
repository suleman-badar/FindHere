import express from "express";
import { searchOnMap } from "../controllers/searchOnMap.js";

const router = express.Router();


router.get("/search", searchOnMap);


export default router;