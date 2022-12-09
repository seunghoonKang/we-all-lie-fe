import { configureStore } from '@reduxjs/toolkit';
import game from './modules/gameSlice';
import room from './modules/roomSlice';
import user from './modules/userSlice';

const store = configureStore({
  reducer: {
    room,
    game,
    user,
  },
});

export default store;
