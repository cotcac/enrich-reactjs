import { Box, Button, Link, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import AuthService from '../api/authAPI';
export default function Login() {

  const initialState = {
    username: "",
    password: "",
  };
  const [newLogin, setNewLogin] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
//   const [apiError, setAPIError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setNewLogin(initialState);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLogin({ ...newLogin, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: newLogin.username,
      password: newLogin.password
    };
    console.log(data);
    AuthService.login(data)
      .then((response) => {
        console.log("success: ", response);
        resetForm();
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        window.location.href = "/";
      })
      .catch((error) => {
        // setErrors(error.response.data.error_messages);
        console.log(errors);

        // setAPIError(error.message ? error.message : "Something went wrong!")
        // setIsLoading(false)

      });

  };
  const resetForm = () => {
    setNewLogin(initialState);
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
            id="username"
            label="Username"
            name="username"
            value={newLogin.username}
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
            value={newLogin.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleInputChange}
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password && errors.password[0]}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}