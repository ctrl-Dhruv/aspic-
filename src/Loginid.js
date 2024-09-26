import {
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Password } from "@mui/icons-material";
import Home from "./Home";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("username");
    if (loggedInUser) {
      navigate("/home");
    }
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    if (username === "Dhruvuser" && password === "cmsviewer") {
      sessionStorage.setItem("username", username);
      navigate("/home");
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setError(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <Typography variant="h2" align="center">
        Enter Login details
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <div>
          <TextField
            id="username-required"
            label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <TextField
            id="users-password"
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </Box>
      <div style={{ paddingTop: "20px" }}>
        <Button
          type="submit"
          color="primary"
          variant="outlined"
          size="large"
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
      <Dialog
        open={error}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login error"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Incorrect login details. Please enter the correct username or
            password
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ok</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
