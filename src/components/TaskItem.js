import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Checkbox,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toggleComplete, deleteTask } from "../redux/taskSlice";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  // Handle toggling the completion status
  const handleToggleComplete = () => {
    dispatch(toggleComplete(task.id)); // Dispatch the toggleComplete action with the task's id
  };

  // Open the delete confirmation modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Close the delete confirmation modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Handle task deletion
  const handleDelete = () => {
    dispatch(deleteTask(task.id)); // Dispatch the deleteTask action with the task's id
    handleCloseModal(); // Close the modal after deletion
  };

  // Task completion status-based background color
  const taskBackgroundColor = task.completed ? "#c8e6c9" : "#F8C4B4"; // Green for completed, light gray for pending

  return (
    <>
      <Card
        variant="outlined"
        style={{ backgroundColor: taskBackgroundColor, marginBottom: "10px" }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </Typography>
            <IconButton onClick={handleOpenModal}>
              <Delete />
            </IconButton>
          </div>

          <Typography variant="body2" color="textSecondary">
            {task.description}
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">Due Date: {task.dueDate}</Typography>
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
              color="primary"
              inputProps={{ "aria-label": "task-completed-checkbox" }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={openModal}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      />
    </>
  );
};

export default TaskItem;
