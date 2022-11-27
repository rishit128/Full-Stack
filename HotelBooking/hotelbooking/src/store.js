import { configureStore } from '@reduxjs/toolkit';
import userreducer from './Store/user/userSlice'

export const store = configureStore({
    reducer: {
      user: userreducer,
      
    },
  });