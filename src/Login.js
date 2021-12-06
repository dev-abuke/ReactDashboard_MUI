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

  async function loginUser(data, setLoading, updateError) {

    return fetch('http://localhost:3000/api/user/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
   }

const theme = createTheme();

export default function SignIn({setToken}) {

  const [error, setError] = useState({
    display: "none",
    errorType: ""
  });

  const [loading, setLoading] = useState(false);

  const updateError = (disp, type) => {
    setError(previousState => {
      return { ...previousState, 
        display: disp,
        errorType: type}
    });
  }

  const handleSubmit = (event) => {

    setLoading(true);

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //Todo send the data(username and password) to vehicle api

    const username = data.get("username");
    const password = data.get("password");

    console.log(username + " " + password)

    if(checkEmptyAndUndefined(username)){
      updateError("show", "Username Incorrect");
      setLoading(false);
      return;
    }
    if(checkEmptyAndUndefined(password)){
      updateError("show", "Password Incorrect");
      setLoading(false);
      return;
    }

    updateError("none", "");

   loginUser({
      userName: username,
      password: password
    })
    .then(response => {
      setLoading(false)
      if (response.ok) {
        response.json().then(res => {
        if(res.status){
          console.log(res.result)
          setToken(res.result)
        }
        })
      } else {
        updateError("show", "User Does Not Exist!")
      }
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <Card sx={{mt: 5, boxShadow: 5 }}>
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
          <AccountCircleIcon sx={{ width: '120px', height: '120px' }} fontSize='large'/>
          <Typography sx={{ fontWeight: 'bold', fontSize: 21 }} component="h1" variant="h5">
            Sign in
          </Typography>
          <Alert severity="error" sx={{ mt: 2, display: error.display}} > {error.errorType}</Alert>
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
        
        <Typography sx={{fontSize: 12, mb: 5 }} color="text.secondary" align="center" >
        Version 0.3.0 Prototype Build
        </Typography>
      </Card>
      </Container>
    </ThemeProvider>
  );
}