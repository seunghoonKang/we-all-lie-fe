import { configureStore } from '@reduxjs/toolkit';
import game from './modules/gameSlice';
import room from './modules/roomSlice';

const store = configureStore({
  reducer: {
    room,
    game,
  },
});

export default store;
