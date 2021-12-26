import React, { useState } from 'react';
import BlockIcon from '@mui/icons-material/Block';
import { Grid, TextField, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CONSTANTS from '../helper/Constants'

export default function EditUser({ data, onSubmit, loading }) {

    const [eventType, setEventType] = useState("")
    const [role, setRole] = useState("")
    const [team, setTeam] = useState("")

    const handleSubmit = (event) => {

        onSubmit(event, eventType)
    }

    const handleRoleChange = (event) => {

        setRole(event.target.value)
    }

    const handleTeamChange = (event) => {
        setTeam(event.target.value)
    }

    const handleDeactivateButtonClick = () => {

        setEventType(CONSTANTS.DEACTIVATE_USER)
    }

    const handleUpdateButtonClick = () => {

        setEventType(CONSTANTS.UPDATE_USER)
    }

    return (
        <Grid component="form" onSubmit={(event) => handleSubmit(event)} maxWidth="md" sx={{ p: 1, m: 1 }} align="center" container rowSpacing={3} spacing={2} >
            <Grid item xs={6}>
                <TextField fullWidth id="fullname" name="fullname" type="text" label="Fullname" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    select
                    id="team"
                    name="team"
                    label="Team"
                    variant="outlined"
                    value={role}
                    onChange={handleRoleChange}
                    >

                    {data.TEAMLIST.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.team}
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
                    value={team}
                    onChange={handleTeamChange}
                >

                    {data.ROLELIST.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.role}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={6}>
                <LoadingButton
                    justifyContent="center"
                    type="submit"
                    fullWidth
                    loading={loading}
                    onClick={handleDeactivateButtonClick}
                    sx={{ '&:hover': { backgroundColor: "#E53e31" }, backgroundColor: "#f53e31" }}
                    size="large"
                    variant="contained" endIcon={<BlockIcon />}>
                    DEACTIVATE
                </LoadingButton>
            </Grid>
            <Grid item lg={6} md={6} sm={6} />
            <Grid item xs={4} >
                <LoadingButton
                    type="submit"
                    onClick={handleUpdateButtonClick}
                    fullWidth
                    loading={loading}
                    sx={{ '&:hover': { backgroundColor: "#E53e31" }, backgroundColor: "#f53e31" }}
                    size="large"
                    variant="contained">
                    UPDATE
                </LoadingButton>
            </Grid>
        </Grid>
    );
}