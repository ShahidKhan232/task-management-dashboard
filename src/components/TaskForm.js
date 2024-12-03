import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/taskSlice";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

const TaskForm = ({ taskToEdit, onCancel }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [description, setDescription] = useState(
    taskToEdit ? taskToEdit.description : ""
  );
  const [dueDate, setDueDate] = useState(taskToEdit ? taskToEdit.dueDate : "");
  const [priority, setPriority] = useState(
    taskToEdit ? taskToEdit.priority : "medium"
  );
  const [completed, setCompleted] = useState(
    taskToEdit ? taskToEdit.completed : false
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      title,
      description,
      dueDate,
      priority,
      completed,
    };

    if (taskToEdit) {
      dispatch(editTask({ id: taskToEdit.id, updatedTask: task }));
    } else {
      dispatch(addTask(task));
    }

    onCancel();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, margin: "0 auto" }}
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        type="date"
        label="Due Date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Priority</InputLabel>
        <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        }
        label="Completed"
      />

      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button
          onClick={onCancel}
          variant="outlined"
          color="secondary"
          sx={{ ml: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
