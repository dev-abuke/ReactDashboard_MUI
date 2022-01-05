import * as React from "react";
import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import CONSTANTS from "../../Helpers/Constants";

export default function CreateRoleDialog({ handleSubmit, loading }) {
  
  return (
    <div>
      <Box
        p={0}
        component="form"
        onSubmit={(event) => {
          handleSubmit(event, CONSTANTS.CREATE_ROLE);
        }}
        autoComplete="off"
      >
        <Grid
          align="center"
          sx={{ mr: 2 }}
          container
          rowSpacing={2}
          spacing={3}
        >
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="role-id"
              name="role"
              label="Role Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="access-level-id"
              name="accessLevel"
              label="Access Level"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <LoadingButton
              type="submit"
              loading={loading}
              fullWidth
              sx={{
                "&:hover": { backgroundColor: "#E53e31" },
                backgroundColor: "#f53e31",
              }}
              size="large"
              variant="contained"
            >
              CREATE ROLE
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
