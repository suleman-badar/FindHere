import express from "express"

import { syncResturantsRoute, searchResturants } from "../controllers/searchController.js";
const router = express.Router();

router.get("/sync", syncResturantsRoute);
router.get("/", searchResturants);

export default router;