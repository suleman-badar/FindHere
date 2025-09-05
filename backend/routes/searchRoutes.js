import express from "express"

import { syncResturants, searchResturants } from "../controllers/searchController.js";
const router = express.Router();

router.get("/sync", syncResturants);
router.get("/", searchResturants);

export default router;