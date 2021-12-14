import React , {useState} from 'react';
import { Box, MenuItem, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

const currencies = [
    {
        value: 'USD',
        label: 'Installer',
    },
    {
        value: 'EUR',
        label: 'Manager',
    },
    {
        value: 'BTC',
        label: 'Reception',
    },
    {
        value: 'JPY',
        label: 'Staff',
    },
];

export default function UserCreationFeilds({onSubmit}) {

    const [loading, setLoading] = useState(false);

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
                    <TextField fullWidth id="username" name="username"label="User Name" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth id="password" name="password" type="password" label="Password" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth id="confirmPassword" type="password" name="confirm" label="Comfirm Password" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth id="role" name="role" label="Role" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth id="team" name="team" label="Team" variant="outlined" />
                </Grid>
                <Grid item lg={6} md={6} sm={6}/>
                <Grid item xs={4} >
                    <LoadingButton
                        type="submit"
                        loading={loading}
                        fullWidth
                        sx={{ '&:hover': { backgroundColor: "#E53e31" }, backgroundColor: "#f53e31" }}
                        size="large"
                        variant="contained">
                        Submit
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
}