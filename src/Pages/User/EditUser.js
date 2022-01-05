import React, { useState } from "react";
import BlockIcon from "@mui/icons-material/Block";
import { Grid, TextField, MenuItem } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CONSTANTS from "../../Helpers/Constants";

export default function EditUser(props) {
    
  const { handleSubmit, dialog } = props;

  const [selectedRole, setRole] = useState(dialog.selectedUser.roleId);
  const [selectedTeam, setTeam] = useState(dialog.selectedUser.teamId);
  const [eventType, setEventType] = useState("");

  const handleDeactivateButtonClick = () => {

    setEventType(CONSTANTS.DEACTIVATE_USER);
  };

  const handleUpdateUserButtonClick = () => {

    setEventType(CONSTANTS.UPDATE_USER);
  };

  return (

    <Grid
      component="form"
      onSubmit={(event) => handleSubmit(event, eventType)}
      maxWidth="md"
      align="center"
      container
      rowSpacing={3}
      spacing={2}
    >
      <Grid item xs={6}>
        <TextField
          defaultValue={dialog.selectedUser.fullName}
          fullWidth
          id="fullname"
          name="fullname"
          type="text"
          label="Fullname"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          defaultValue={dialog.selectedUser.team}
          fullWidth
          select
          id="team"
          name="team"
          label="Team"
          variant="outlined"
          value={selectedTeam}
          onChange={(event) => setTeam(event.target.value)}
        >
          {dialog.teamList.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.team}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          select
          id="role"
          name="role"
          label="Role"
          variant="outlined"
          value={selectedRole}
          onChange={(event) => setRole(event.target.value)}
        >
          {dialog.roleList.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.role}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <LoadingButton
          justifyContent="center"
          type="submit"
          fullWidth
          loading={dialog.loading}
          onClick={handleDeactivateButtonClick}
          sx={{
            "&:hover": { backgroundColor: "#E53e31" },
            backgroundColor: "#f53e31",
          }}
          size="large"
          variant="contained"
          endIcon={dialog.selectedUser.status ? <BlockIcon /> : null }
        >
          {dialog.selectedUser.status ? "DEACTIVATE" : "ACTIVATE"}
        </LoadingButton>
      </Grid>
      <Grid item lg={6} md={6} sm={6} />
      <Grid item xs={4}>
        <LoadingButton
          type="submit"
          onClick={handleUpdateUserButtonClick}
          fullWidth
          loading={dialog.loading}
          sx={{
            "&:hover": { backgroundColor: "#E53e31" },
            backgroundColor: "#f53e31",
          }}
          size="large"
          variant="contained"
        >
          UPDATE
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
