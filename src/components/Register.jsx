import { Box, Button, Link, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import AuthService from '../api/authAPI';
export default function Register() {

  const initialState = {
    username: "",
    password: "",
    confirm_password: "",
    first_name: "",
  };
  const [newUser, setNewUser] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
//   const [apiError, setAPIError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setNewUser(initialState);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: newUser.username,
      password: newUser.password,
      confirm_password: newUser.confirm_password,
      first_name: newUser.first_name
    };
    console.log(data);
    AuthService.register(newUser)
      .then((response) => {
        console.log("success: ", response);
        resetForm();
        // window.location.href = "/";
      })
      .catch((error) => {
        // setErrors(error.response.data.error_messages);
        console.log(errors);

        // setAPIError(error.message ? error.message : "Something went wrong!")
        // setIsLoading(false)

      });

  };
  const resetForm = () => {
    setNewUser(initialState);
    setErrors(initialState)
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First name"
            name="first_name"
            value={newUser.first_name}
            onChange={handleInputChange}
            autoFocus
            error={!!errors.first_name}
            helperText={errors.first_name && errors.first_name[0]}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            autoComplete="username"
            autoFocus
            error={!!errors.username}
            helperText={errors.username && errors.username[0]}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={newUser.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleInputChange}
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password && errors.password[0]}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={newUser.confirm_password}
            name="confirm_password"
            label="Confirm Password"
            type="password"
            id="confirm_password"
            onChange={handleInputChange}
            autoComplete="current-password"
            error={!!errors.confirm_password}
            helperText={errors.confirm_password && errors.confirm_password[0]}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}