import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filter: "all", // Filter type (all, completed, pending, overdue)
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload.updatedTask,
        };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleComplete: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].completed = !state.tasks[index].completed;
      }
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  reorderTasks,
  setFilter,
  toggleComplete,
} = taskSlice.actions;

export default taskSlice.reducer;
