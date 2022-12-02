import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomInfos: [],
  userNickname: [],
};

const roomSlice = createSlice({
  name: 'RoomInfosSlice',
  initialState,
  reducers: {
    getRoomInfo: (state, action) => {
      state.roomInfos = action.payload;
    },
    getUserNickname: (state, action) => {
      state.userNickname.push(action.payload);
    },
  },
});

export const { getRoomInfo, getUserNickname } = roomSlice.actions;
export default roomSlice.reducer;
