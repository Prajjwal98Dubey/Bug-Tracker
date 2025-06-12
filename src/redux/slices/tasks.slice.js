import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskList: [],
};

const taskList = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    addNewTask(state, action) {
      state.taskList.push({
        ...action.payload,
        status: "pending",
        isOpen: true,
      });
    },
  },
});

export const { addNewTask } = taskList.actions;
export default taskList.reducer;
