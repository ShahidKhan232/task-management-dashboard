import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import taskReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
