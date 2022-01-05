import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import Copyright from "./Copyright";

export default function LoginUI({ loading, error, handleSubmit }) {
  
  const theme = createTheme();

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
