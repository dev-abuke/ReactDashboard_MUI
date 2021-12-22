import React, { useState } from 'react';
import BlockIcon from '@mui/icons-material/Block';
import { Box, Button, Grid, TextField, Typography, Divider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export default function ResetUser({ onSubmit, loading }) {

    return (
        <Grid maxWidth="md" sx={{ p: 1, m: 1 }} align="center" container rowSpacing={3} spacing={2} >
            <Grid item xs={6}>
                <TextField fullWidth id="fullname" name="fullname" type="text" label="Fullname" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth select id="team" name="team" label="Team" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth select id="role" name="role" label="Role" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
                <LoadingButton
                    justifyContent="center"
                    type="submit"
                    fullWidth
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
                    fullWidth
                    sx={{ '&:hover': { backgroundColor: "#E53e31" }, backgroundColor: "#f53e31" }}
                    size="large"
                    variant="contained">
                    UPDATE
                </LoadingButton>
            </Grid>
        </Grid>
    );
}