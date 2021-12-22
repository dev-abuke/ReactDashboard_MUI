import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Divider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export default function ResetUser({ onSubmit, loading }) {

    return (
        <Grid maxWidth="md" sx={{ p: 1, m: 1}} align="center" container rowSpacing={3} spacing={2} >
            <Grid item xs={6}>
                <TextField fullWidth id="password" name="password" type="password" label="Password" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth id="confirmPassword" type="password" name="confirm" label="Confirm Password" variant="outlined" />
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
                    RESET
                </LoadingButton>
            </Grid>
        </Grid>
    );
}