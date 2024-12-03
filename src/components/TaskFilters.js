import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/taskSlice";
import { ButtonGroup, Button, Box } from "@mui/material";

const TaskFilters = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.tasks.filter);

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <Box display="flex" justifyContent="center" marginBottom={2}>
      <ButtonGroup variant="outlined" color="primary">
        <Button
          onClick={() => handleFilterChange("all")}
          variant={activeFilter === "all" ? "contained" : "outlined"}
        >
          All Tasks
        </Button>
        <Button
          onClick={() => handleFilterChange("completed")}
          variant={activeFilter === "completed" ? "contained" : "outlined"}
        >
          Completed
        </Button>
        <Button
          onClick={() => handleFilterChange("pending")}
          variant={activeFilter === "pending" ? "contained" : "outlined"}
        >
          Pending
        </Button>
        <Button
          onClick={() => handleFilterChange("overdue")}
          variant={activeFilter === "overdue" ? "contained" : "outlined"}
        >
          Overdue
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default TaskFilters;
