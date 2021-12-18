import React, { useState } from 'react';
import { Box, MenuItem, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

const roles = [
    {
        value: 'manager',
        label: 'Manager',
    },
    {
        label: 'Reception',
        value: 'reception',
    },
    {
        label: 'Installer',
        value: 'installer',
    },
    {
        label: 'Administrator',
        value: 'admin',
    },
];

const teams = [
    {
        value: 'ux-ui',
        label: 'UX/UI',
    },
    {
        label: 'Frontend',
        value: 'frontend',
    },
    {
        label: 'Backend',
        value: 'backend',
    },
    {
        label: 'Installation',
        value: 'install',
    },
];

export default function UserCreationFeilds({ onSubmit, loading }) {

    const [role, setRole] = React.useState('');
    const [team, setTeam] = React.useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleTeamChange = (event) => {
        setTeam(event.target.value);
    };

    return (
        <Box
            component="form"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <Grid align="center" container rowSpacing={3} spacing={8} alignItems="center" >

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
                        value={role}
                        onChange={handleRoleChange}
                    >
                        {roles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
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
                        value={team}
                        onChange={handleTeamChange}
                    >
                        {teams.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item lg={6} md={6} sm={6} />
                <Grid item xs={4} >
                    <LoadingButton
                        type="submit"
                        loading={loading}
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