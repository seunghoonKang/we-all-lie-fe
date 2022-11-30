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
  },
});

export const { choiceAsker } = gameSlice.actions;
export default gameSlice.reducer;
