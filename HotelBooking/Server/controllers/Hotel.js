import Hotel from "../models/hotel.js";
export const createHotel = async (req, res) => {
  const addHotel = new Hotel(req.body);

  try {
    const savedHotel = await addHotel.save();
    res.status(200).json({
      savedHotel,
      Success: "Success",
      message: "Hotel Created ! Data inserted Successfully.",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("rooms");
    console.log(hotels);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
