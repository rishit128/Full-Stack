import express from "express";
import { createHotel, getHotels } from "../controllers/Hotel.js";
const router = express.Router();
router.post("/addhotel", createHotel);
router.get("/hotelList", getHotels);
export default router;
