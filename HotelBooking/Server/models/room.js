import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const RoomSchema = new mongoose.Schema({
  hotelname: {
    type: ObjectId,
    ref: "Hotel",
  },
  roomno: [{ number: Number }],
  roomdescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxpeople: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Room", RoomSchema);
