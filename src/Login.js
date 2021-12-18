import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ValidationRules from './helper/DataValidators';
import DataRequester from './helper/DataRequester';
import {Navigate, useNavigate  } from "react-router-dom";

const { getDataFromForm } = ValidationRules()
const { sendSignInReq } = DataRequester()

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://hurricane.support/">
        Hurricane Support IT P.L.C
      </Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );

}

const checkEmptyAndUndefined = (field) => {
  if (field === "" || field === undefined) return true;
  return false;
};

const theme = createTheme();

export default function SignIn({setToken}) {

  console.log("Login rendered")
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function loginUser(data) {

    sendSignInReq('/user/signIn', data).then(response => {

      setLoading(false)
      if (response.data.status) {

        setToken(response.data.result)
      } else {

        updateError("show", response.data.error)
      }
    }).catch(function (err) {

      setLoading(false)
      updateError("show", err.response)
    })
  }

  const [error, setError] = useState({
    display: "none",
    errorType: ""
  });

  const updateError = (disp, type) => {
    setError(previousState => {
      return {
        ...previousState,
        display: disp,
        errorType: type
      }
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Shows the loading view in the button
    setLoading(true);

    // @getDataFromForm() a methode from helper which sends and object of datas field by the user
    const { userName, password } = getDataFromForm(event.currentTarget)

    // @checkEmptyAndUndefined() a methode from helper to check empty and undefined fields
    if (checkEmptyAndUndefined(userName)) {
      updateError("show", "Username Can not be Empty!");
      setLoading(false);
      return;
    }
    if (checkEmptyAndUndefined(password)) {
      updateError("show", "Password Can not be Empty!");
      setLoading(false);
      return;
    }

    // @updateError() a method so we do not type @param display and @param errorMessage everytime
    updateError("none", "");

    // @loginUser a method to authenticate user
    loginUser({
      userName: userName,
      password: password
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Card sx={{ mt: 8, boxShadow: 5, pb: 5, pt: 3 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              marginRight: 5,
              marginLeft: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <AccountCircleIcon sx={{ width: '120px', height: '120px' }} fontSize='large' />
            <Typography sx={{ fontWeight: 'bold', fontSize: 21 }} component="h1" variant="h5">
              Sign in
            </Typography>
            <Alert severity="error" sx={{ mt: 2, display: error.display }} > {error.errorType}</Alert>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="usernames"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <LoadingButton
                type="submit"
                loading={loading}
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Sign In
              </LoadingButton>
            </Box>
          </Box>
          <Copyright sx={{ mt: 3, mb: 4 }} />

          <Typography sx={{ fontSize: 12 }} color="text.secondary" align="center" >
            Version 0.3.0 Prototype Build
          </Typography>
        </Card>
      </Container>
    </ThemeProvider>
  );
}