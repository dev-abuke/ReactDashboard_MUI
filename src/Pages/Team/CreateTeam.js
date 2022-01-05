import * as React from 'react';
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import CONSTANTS from '../../Helpers/Constants';

export default function CreateTeamDialog({ handleSubmit, loading }) {

  return (
    <div>
        <Box
            m={3}
            component="form"
            onSubmit={(event) => {handleSubmit(event, CONSTANTS.CREATE_TEAM)}}
            autoComplete="off"
        >
            <Grid align="center" container rowSpacing={3} spacing={8} alignItems="center" >

                <Grid item xs={12}>
                    <TextField fullWidth id="team" name="team" label="Team Name" variant="outlined" /> 
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={8} >
                    <LoadingButton
                        type="submit"
                        loading={loading}
                        fullWidth
                        sx={{ '&:hover': { backgroundColor: "#E53e31" }, backgroundColor: "#f53e31" }}
                        size="large"
                        variant="contained">
                       CREATE TEAM
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    </div>
  );
}