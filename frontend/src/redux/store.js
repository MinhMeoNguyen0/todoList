import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import listReducer from "./slices/listSlice";
import taskReducer from "./slices/taskSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    lists: listReducer,
    tasks: taskReducer,
  },
});

export default store;
