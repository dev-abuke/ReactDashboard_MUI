import React, { useState } from 'react';
import { Box, MenuItem, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import CONSTANTS from '../helper/Constants';

export default function UserCreationFeilds(props) {

    const { data, onSubmit, loading } = props
    
    console.log("THE PROPS ARE IN UserCreationFeilds: ", props)

    const [role, setRole] = useState('');
    const [team, setTeam] = useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleTeamChange = (event) => {
        setTeam(event.target.value);
    };

    return (
        <Box
            m={3}
            component="form"
            onSubmit={(event) => {onSubmit(event, CONSTANTS.CREATE_USER)}}
            autoComplete="off"
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
                        {data.ROLELIST.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.role}
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
                        {data.TEAMLIST.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.team}
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