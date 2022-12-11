import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};
// 홈 화면
export const __getUser = createAsyncThunk(
  'userSlice/get',
  async (payload, thunkAPI) => {
    const token = payload;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const { data } = await axios.get(`https://minhyeongi.xyz/api/user`, {
        headers,
      });
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [__getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
