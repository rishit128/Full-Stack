import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/user.js";
import hotelroutes from "./Routes/hotel.js";
import roomroutes from "./Routes/room.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/hotel", hotelroutes);
app.use("/rooms", roomroutes);
const uri = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
