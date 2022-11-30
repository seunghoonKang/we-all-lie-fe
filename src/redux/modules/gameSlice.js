import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  asker: '',
  answerer: '',
};

const gameSlice = createSlice({
  name: 'GameSlice',
  initialState,
  reducers: {
    choiceAsker: (state, action) => {
      state.asker = action.payload;
    },
    choiceAnswerer: (state, action) => {
      state.answerer = action.payload;
    },
  },
});

export const { choiceAsker, choiceAnswerer } = gameSlice.actions;
export default gameSlice.reducer;
