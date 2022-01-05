import React, { useState } from 'react';
import { Box, MenuItem, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import CONSTANTS from '../../Helpers/Constants';

export default function UserCreationFeilds(props) {

    const { handleSubmit, dialog } = props

    const [selectedRole, setRole] = useState("");
    const [selectedTeam, setTeam] = useState("");

    return (
        <Box
            component="form"
            onSubmit={(event) => {handleSubmit(event, CONSTANTS.CREATE_USER)}}
            autoComplete="off"
        >
            <Grid maxWidth="md" align="center" container rowSpacing={3} spacing={2} alignItems="center" >

                <Grid item xs={6}>
                    <TextField fullWidth id="fullname" name="fullname" label="Full Name" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth id="username" name="username" label="User Name" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth id="password" name="password" type="password" label="Password" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth id="confirmPassword" type="password" name="confirm" label="Confirm Password" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="outlined-select-role"
                        name="role"
                        select
                        label="Role"
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
                    <TextField
                        fullWidth
                        id="outlined-select-role"
                        select
                        name="team"
                        label="Team"
                        value={selectedTeam}
                        onChange={(event) => setTeam(event.target.value)}
                    >
                        {dialog.teamList.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.team}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item lg={6} md={6} sm={6} />
                <Grid item xs={6} >
                    <LoadingButton
                        type="submit"
                        loading={dialog.loading}
                        fullWidth
                        sx={{ '&:hover': { backgroundColor: "#E53e31" }, backgroundColor: "#f53e31" }}
                        size="large"
                        variant="contained">
                        SUBMIT
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
}