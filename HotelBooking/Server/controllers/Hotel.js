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
    res.status(200).json(hotels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ hoteltype: "hotel" });
    const apartmentCount = await Hotel.countDocuments({
      hoteltype: "apartment",
    });
    const resortCount = await Hotel.countDocuments({ hoteltype: "resort" });
    const villaCount = await Hotel.countDocuments({ hoteltype: "villa" });
    const cabinCount = await Hotel.countDocuments({ hoteltype: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};
export const getHotelByid = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate("rooms");
    res.status(200).json(hotel);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getHotelsbyDestination = async (req, res) => {
  const { destination, min, max } = req.body;
  try {
    const hotels = await Hotel.find({
      city: destination,
      cheapestPrice: { $gte: min, $lte: max },
    }).populate("rooms");
    console.log("hotels", hotels);
    res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
