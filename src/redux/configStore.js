import { configureStore } from '@reduxjs/toolkit';
import roomSlice from './modules/roomSlice';

const store = configureStore({
  reducer: {
    roomSlice,
  },
});

export default store;
