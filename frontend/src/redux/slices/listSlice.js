import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// GET /api/lists - Fetch all lists
export const fetchLists = createAsyncThunk("lists/fetchLists", async () => {
  const response = await axiosInstance.get("/lists");
  return response.data;
});

// POST /api/lists - Create a new list
export const addList = createAsyncThunk("lists/addList", async (name) => {
  const response = await axiosInstance.post("/lists", { name });
  return response.data;
});

// PUT /api/lists/:id - Update a list name
export const updateListName = createAsyncThunk("lists/updateListName", async ({ id, name }) => {
  const response = await axiosInstance.put(`/lists/${id}`, { name });
  return response.data;
});

// DELETE /api/lists/:id - Delete a list
export const deleteList = createAsyncThunk("lists/deleteList", async (id) => {
  await axiosInstance.delete(`/lists/${id}`);
  return id;
});

const listSlice = createSlice({
  name: "lists",
  initialState: { items: [], selectedListId: null },
  reducers: {
    setSelectedListId: (state, action) => {
      state.selectedListId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateListName.fulfilled, (state, action) => {
        const index = state.items.findIndex((list) => list._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.items = state.items.filter((list) => list._id !== action.payload);
        // Reset the selected list if it was deleted
        if (state.selectedListId === action.payload) {
          state.selectedListId = null;
        }
      });
  },
});

export const { setSelectedListId } = listSlice.actions;
export default listSlice.reducer;
