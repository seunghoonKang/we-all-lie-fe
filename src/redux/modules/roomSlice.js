import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomInfos: [],
};

const roomSlice = createSlice({
  name: 'RoomInfosSlice',
  initialState,
  reducers: {
    getRoomInfo: (state, action) => {
      state.roomInfos = action.payload;
    },
  },
});

export const { getRoomInfo } = roomSlice.actions;
export default roomSlice.reducer;
