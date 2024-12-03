import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import App from "./App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ea",
    },
    secondary: {
      main: "#03dac6",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    error: {
      main: "#d32f2f",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
      color: "#333",
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
