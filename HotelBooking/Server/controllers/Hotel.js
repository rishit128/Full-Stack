import Hotel from "../models/hotel.js";
export const createHotel = async (req, res) => {
  console.log(req.body);
  const addHotel = new Hotel(req.body);

  try {
    const savedHotel = await addHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
