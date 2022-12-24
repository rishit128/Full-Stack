import Room from "../models/room.js";
import Hotel from "../models/hotel.js";
export const createroom = async (req, res) => {
  const hotelId = req.body.hotelname;
  const addroom = new Room(req.body);
  try {
    const addhotelroom = await addroom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: addhotelroom._id },
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

    res.status(200).json({
      addhotelroom,
      Success: "Success",
      message: "Room Created ! Data inserted Successfully.",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getrooms = async (req, res) => {
  try {
    console.log("hotels");
    const hotels = await Room.find().populate("hotelname");
    res.status(200).json(hotels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateRoomAvailability = async (req, res) => {
  console.log(req.params);
  console.log(req.body.dates);
  try {
    const update = await Room.updateOne(
      { "roomno._id": req.params.roomid },
      {
        $push: {
          "roomno.$.unavailableDates": req.body.dates,
        },
      }
    );
    console.log(update);
    res.status(200).json("Room status has been updated.");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
