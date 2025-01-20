import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// GET /api/lists/:id - Fetch tasks for a specific list
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (listId) => {
  const response = await axiosInstance.get(`/lists/${listId}`);
  return { listId, tasks: response.data.tasks, name: response.data.name }; // Extract tasks from the response
});

// POST /api/tasks - Create a new task
export const addTask = createAsyncThunk("tasks/addTask", async ({ listId, title }) => {
  const response = await axiosInstance.post("/tasks", { listId, title });
  return response.data;
});

// PUT /api/tasks/complete/:id - Mark a task as complete/incomplete
export const toggleTask = createAsyncThunk("tasks/toggleTask", async ({ listId, taskId, completed }) => {
  const response = await axiosInstance.put(`/tasks/complete/${taskId}`, { completed , listId});
  return response.data; // Return the updated task
});

// PUT /api/tasks/:id - Update a task name
export const editTask = createAsyncThunk("tasks/editTask", async ({ listId, taskId, title }) => {
  const response = await axiosInstance.put(`/tasks/${taskId}`, { title, listId });
  return response.data;
});

// DELETE /api/tasks/delete/:id - Delete a task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async ({ listId, taskId }) => {
  const response = await axiosInstance.put(`/tasks/delete/${taskId}`, {  listId  });
  return response.data; // Return the deleted task ID
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: { items: [], listId: null , listName: null},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload.tasks; // Update tasks for the selected list
        state.listId = action.payload.listId; // Track the list ID
        state.listName = action.payload.name
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload; // Update the task's completed status
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add a new task
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload; // Update the task
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task._id !== action.payload.task._id); // Remove the task

      });
  },
});

export default taskSlice.reducer;
