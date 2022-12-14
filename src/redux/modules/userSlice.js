import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};
// 유저 정보 받아옴
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

//유저 정보 수정
export const __putUser = createAsyncThunk(
  'userSlice/put',
  async (payload, thunkAPI) => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const { data } = await axios.put(
        `https://minhyeongi.xyz/api/user`,
        payload,
        { headers }
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errorMessage);
        return thunkAPI.rejectWithValue(error);
      }
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
    [__putUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__putUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data.nickname = action.payload.nickname;
    },
    [__putUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      console.log(state.error);
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
