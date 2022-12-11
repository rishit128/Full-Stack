import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./Store/user/userSlice";
import hotelreducer from "./Store/hotel/hotelSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  user: userreducer,
  hotels: hotelreducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
