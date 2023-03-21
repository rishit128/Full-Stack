import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URI });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
export const signIn = (formData) => API.post("/user/signin", formData);
export const addhotel = (hotelData) => API.post("/hotel/addhotel", hotelData);
export const hotelList = () => API.get("/hotel/hotelList");
export const createroom = (roomdata) => API.post("/rooms/addroom", roomdata);
export const roomlist = () => API.get("/rooms/getrooms");
export const countByType = () => API.get("/hotel/countByType");
export const HotelByid = (id) => API.get(`/hotel/hotelfind/${id}`);
export const HotelBydestination = (destinationdata) =>
  API.post("/hotel/hotelfindBydestination", destinationdata);
export const RoomAvailability = (roomid, dates) =>
  API.put(`/rooms/availability/${roomid}`, dates);
