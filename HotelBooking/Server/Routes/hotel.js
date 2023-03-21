import express from "express";
import {
  createHotel,
  getHotels,
  countByType,
  getHotelByid,
  getHotelsbyDestination,
} from "../controllers/Hotel.js";
const router = express.Router();
router.post("/addhotel", createHotel);
router.get("/hotelList", getHotels);
router.get("/countByType", countByType);
router.get("/hotelfind/:id", getHotelByid);
router.post("/hotelfindBydestination", getHotelsbyDestination);
export default router;
