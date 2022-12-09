import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./Store/user/userSlice";
import hotelreducer from "./Store/hotel/hotelSlice";
export const store = configureStore({
  reducer: {
    user: userreducer,
    hotels: hotelreducer,
  },
});
