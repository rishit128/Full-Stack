import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: JSON.parse(localStorage.getItem("profile")) || null,
  usersearchdetails: {},
};

const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.user = action.payload;
    },
    usersearch: (state, action) => {
      state.usersearchdetails = action.payload;
    },
  },
});
export const { userData, usersearch } = userslice.actions;
export default userslice.reducer;
