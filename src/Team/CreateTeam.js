import * as React from 'react';
import Button from '@mui/material/Button';
import { Stack, Typography, IconButton, Divider, Box, MenuItem, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import CONSTANTS from '../helper/Constants';

export default function CreateTeamDialog({ dialogueOpened, data, alert, setOpen, onSubmit, loading }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogueOpened.isDialogOpen} onClose={handleClose} maxWidth="xl" >
        <DialogTitle >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1 / 5}>
            <Typography fontSize="18px" variant="button">
              {dialogueOpened.openedBy === CONSTANTS.CREATE_TEAM ? "CREATE TEAM" : "TEAM SETTINGS"}
            </Typography>
            <Alert severity="error" sx={{ mt: 2, display: alert.display }}>{alert.message}</Alert>
            <IconButton size="large" aria-label="close" onClick={handleClose}>
              <CloseIcon fontSize="inherit" color="error" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent sx={{ p: 0 }}>
        <Box
            m={3}
            component="form"
            onSubmit={(event) => {onSubmit(event, CONSTANTS.CREATE_TEAM)}}
            autoComplete="off"
        >
            <Grid align="center" container rowSpacing={3} spacing={8} alignItems="center" >

                <Grid item xs={6}>
                    <TextField fullWidth id="team" name="team" label="Team Name" variant="outlined" />
                </Grid>
                <Grid item xs={6} >
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
        </DialogContent>
      </Dialog>
    </div>
  );
}