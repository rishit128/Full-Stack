import express from "express";
import {
  createroom,
  getrooms,
  updateRoomAvailability,
} from "../controllers/Room.js";
const router = express.Router();
router.post("/addroom", createroom);
router.get("/getrooms", getrooms);
router.put("/availability/:roomid", updateRoomAvailability);
export default router;
