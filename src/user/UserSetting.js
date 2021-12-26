import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Divider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ResetUser from "./ResetUser"
import EditUser from "./EditUser"

export default function UserSetting({ data, onSubmit, loading }) {

    const [selected, setSelected] = useState({
        selected: "RESET",
        resetColor: "BLUE",
        editColor: "GREY",
        resetBorderSize: 3,
        editBorderSize: 1
    });

    const handleResetClick = () => {
        setSelected(previousState => {

            if (previousState.selected === "EDIT") {
                return {
                    ...previousState,
                    selected: "RESET",
                    resetColor: "BLUE",
                    editColor: "GREY",
                    resetBorderSize: 3,
                    editBorderSize: 1,
                }
            }

            return {
                ...previousState,
            }
        });
    }

    const handleEditClick = () => {
        setSelected(previousState => {

            if (previousState.selected === "RESET") {
                return {
                    ...previousState,
                    selected: "EDIT",
                    resetColor: "GREY",
                    editColor: "BLUE",
                    resetBorderSize: 1,
                    editBorderSize: 3,
                }
            }

            return {
                ...previousState,
            }
        });
    }

    return (
        <Grid maxWidth="md" sx={{ p: 2, m: 3, boxShadow: 4, borderRadius: 1 }} align="center" container rowSpacing={3} spacing={2} >
            <Grid item xs={6}>
                <Typography sx={{ '&:hover': { cursor: "pointer" } }} color={selected.resetColor} onClick={handleResetClick} variant="text">
                    RESET PASSWORD
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography sx={{ '&:hover': { cursor: "pointer" } }} color={selected.editColor} onClick={handleEditClick} variant="text" >
                    EDIT USER
                </Typography>
            </Grid>
            <Grid sx={{ borderBottom: selected.resetBorderSize, borderColor: selected.resetColor }} item xs={6} />
            <Grid sx={{ borderBottom: selected.editBorderSize, borderColor: selected.editColor }} item xs={6} />
            {selected.selected === "RESET" ? 
            <ResetUser loading={loading} onSubmit={onSubmit} /> : 
            <EditUser data={data} loading={loading} onSubmit={onSubmit} />}
        </Grid>
    );
}