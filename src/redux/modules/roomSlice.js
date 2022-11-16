import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomList: [],
};

const roomSlice = createSlice({
  name: 'RoomListSlice',
  initialState,
  reducers: {
    addRoomLists: (state, action) => {
      state.roomList = [...state.roomList, action];
    },
  },
});

export const { addRoomLists } = roomSlice.actions;
export default roomSlice.reducer;
