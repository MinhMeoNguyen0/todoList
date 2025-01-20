import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchOrCreateUser = createAsyncThunk(
  "user/fetchOrCreateUser",
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axiosInstance.post("/users", { userId });
      const { token, userId: newUserId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", newUserId);
      return { token, userId: newUserId };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    token: null,
    status: "idle", // Track the loading status
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrCreateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrCreateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = action.payload.userId;
        state.token = action.payload.token;
      })
      .addCase(fetchOrCreateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
