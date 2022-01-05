import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import jwt from "jsonwebtoken";
import CONSTANTS from "../../Helpers/Constants";
import ValidationRules from "../../Helpers/DataValidators";
import DataRequester from "../../Helpers/DataRequester";

const { getDataFromForm } = ValidationRules();
const { postDataTo } = DataRequester();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://hurricane.support/">
        Hurricane Support IT P.L.C
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const checkEmptyAndUndefined = (field) => {
  if (field === "" || field === undefined) return true;
  return false;
};


const getUserDataFromToken = (token) => {
  var tokenValue = token.split(" ")[1];
  if (!tokenValue) {
    throw new Error("Invalid token");
  }
  var userData = jwt.decode(tokenValue);

  if (userData == null) {
    throw new Error("Unauthorized");
  }
  return userData.data;
};

export default function SignIn({ setToken }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    display: "none",
    message: "",
  });
  const theme = createTheme();

  const onResponseToLoginUser = (response) => {

    setLoading(false);

    const status = response.data.status;
    const token = response.data.result;

    if (status) {

      setToken(token);

      localStorage.setItem(
        CONSTANTS.LOGGED_IN_USERDATA,
        JSON.stringify(getUserDataFromToken(token))
      );

      navigate("/home/dashboard");
    } else {

      console.log("The error in login ", response.data.error);
      updateError("show", response.data.error);
    }
  };

  const onErrorResponseToLoginUser = (errorLogin) => {

    setLoading(false);
    console.log("The error in login catch : ", errorLogin.response);
    updateError("show", errorLogin);
  }

  let navigate = useNavigate();

  async function loginUser(userData) {

    postDataTo("/user/signIn", userData)
      .then(response => {

        onResponseToLoginUser(response);
      })
      .catch(errorLogin => {

        onErrorResponseToLoginUser(errorLogin)
        console.log("The error in login catch : ", errorLogin);
    });
  }

  const updateError = (display, message) => {
    setError((previousState) => {
      return {
        ...previousState,
        display: display,
        message: message,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Shows the loading view in the button
    setLoading(true);

    // @getDataFromForm() a methode from helper which sends and object of datas field by the user
    const { userName, password } = getDataFromForm(event.currentTarget);

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
      password: password,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Container component="main" maxWidth="xs">
        <Card sx={{ mt: 5, boxShadow: 5, pb: 5, pt: 3 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              marginRight: 5,
              marginLeft: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AccountCircleIcon
              sx={{ width: "120px", height: "120px" }}
              fontSize="large"
            />
            <Typography
              sx={{ fontWeight: "bold", fontSize: 21 }}
              component="h1"
              variant="h5"
            >
              Sign in
            </Typography>
            <Alert severity="error" sx={{ mt: 2, display: error.display }}>
              {" "}
              {error.message}
            </Alert>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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

          <Typography
            sx={{ fontSize: 12 }}
            color="text.secondary"
            align="center"
          >
            Version 0.3.0 Prototype Build
          </Typography>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
