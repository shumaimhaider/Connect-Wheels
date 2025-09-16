import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

// Generic thunk to call any GET endpoint
export const callApi = createAsyncThunk(
  "api/callApi",
  async ({ url, method = "get", data = null }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance({
        url,
        method,
        data,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    response: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(callApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(callApi.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(callApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default apiSlice.reducer;
