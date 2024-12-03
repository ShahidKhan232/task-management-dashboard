import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import TaskDashboard from "./components/TaskDashboard";

const App = () => (
  <Provider store={store}>
    <TaskDashboard />
  </Provider>
);

export default App;
