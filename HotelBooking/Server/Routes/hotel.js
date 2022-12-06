import express from "express";
import { createHotel } from "../controllers/Hotel.js";
const router = express.Router();
router.post("/addhotel", createHotel);
export default router;
