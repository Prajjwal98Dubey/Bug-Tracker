import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/tasks.slice.js";
const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
