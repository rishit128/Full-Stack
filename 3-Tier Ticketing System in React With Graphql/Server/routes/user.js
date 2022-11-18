import express from "express";
const router = express.Router();


import { validateUser } from "../middleware/auth.js";
import {validateUserSignUp} from "../middleware/auth.js"
import { signin, signup } from "../controllers/user.js";

router.post("/signin",validateUser,signin);


router.post("/signup",validateUserSignUp, signup);

export default router;