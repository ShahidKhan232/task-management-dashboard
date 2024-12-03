import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskFilters from "./TaskFilters";
import { Button, Typography, Box, Grid, TextField } from "@mui/material";
import { reorderTasks } from "../redux/taskSlice";

const TaskDashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const activeFilter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();
  const [isFormVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredTasks = () => {
    const now = new Date().toISOString().split("T")[0];
    let filtered = tasks;

    switch (activeFilter) {
      case "completed":
        filtered = filtered.filter((task) => task.completed);
        break;
      case "pending":
        filtered = filtered.filter((task) => !task.completed);
        break;
      case "overdue":
        filtered = filtered.filter(
          (task) => !task.completed && task.dueDate < now
        );
        break;
      default:
        break;
    }

    if (debouncedSearchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  // Handle the drag-and-drop reordering
  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    // If the item is dropped in the same position, no change
    if (destination.index === source.index) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    // Dispatch the reordered tasks to Redux
    dispatch(reorderTasks(reorderedTasks));
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Task Management Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setFormVisible(!isFormVisible)}
        style={{ marginBottom: "20px" }}
      >
        {isFormVisible ? "Close Form" : "Add Task"}
      </Button>
      {isFormVisible && <TaskForm onCancel={() => setFormVisible(false)} />}
      <TaskFilters /> {/* Add Task Filters Component */}
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <TextField
          label="Search Tasks by Title"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          style={{ maxWidth: "500px" }}
        />
      </Box>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <Grid
              container
              spacing={2}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredTasks().map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem task={task} />
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default TaskDashboard;
