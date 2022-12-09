import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Allhotels: [],
};
const hotelslice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    hotelsdata: (state, action) => {
      state.Allhotels = action.payload;
    },
  },
});
export const { hotelsdata } = hotelslice.actions;
export default hotelslice.reducer;
