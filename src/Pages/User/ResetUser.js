import React from "react";
import { Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CONSTANTS from "../../Helpers/Constants";

export default function ResetUser({ handleSubmit, dialog }) {

  return (
    <Grid
      component="form"
      onSubmit={(event) => handleSubmit(event, CONSTANTS.RESET_USER_PASSWORD)}
      maxWidth="md"
      align="center"
      container
      rowSpacing={3}
      spacing={2}
    >
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="password"
          name="password"
          type="password"
          label="Password"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="confirmPassword"
          type="password"
          name="confirm"
          label="Confirm Password"
          variant="outlined"
        />
      </Grid>
      <Grid item lg={6} md={6} sm={6} />
      <Grid item xs={6}>
        <LoadingButton
          type="submit"
          loading={dialog.loading}
          fullWidth
          sx={{
            "&:hover": { backgroundColor: "#E53e31" },
            backgroundColor: "#f53e31",
          }}
          size="large"
          variant="contained"
        >
          RESET
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
