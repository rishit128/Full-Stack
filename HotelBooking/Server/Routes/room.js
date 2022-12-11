import express from "express";
import { createroom, getrooms } from "../controllers/Room.js";
const router = express.Router();
router.post("/addroom", createroom);
router.get("/getrooms", getrooms);
export default router;
