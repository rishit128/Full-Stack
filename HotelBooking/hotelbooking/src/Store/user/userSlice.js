import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: JSON.parse(localStorage.getItem("profile")) || null,
};

const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { userData } = userslice.actions;
export default userslice.reducer;
