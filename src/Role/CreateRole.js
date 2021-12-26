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

export default function CreateRoleDialog({ dialogueOpened, data, alert, setOpen, onSubmit, loading }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogueOpened.isDialogOpen} onClose={handleClose} maxWidth="xxl" >
        <DialogTitle >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1 / 5}>
            <Typography fontSize="18px" variant="button">
              {dialogueOpened.openedBy === CONSTANTS.CREATE_ROLE ? "CREATE ROLE" : "ROLE SETTINGS"}
            </Typography>
            <Alert severity="error" sx={{ mt: 2, display: alert.display }}>{alert.message}</Alert>
            <IconButton size="large" aria-label="close" onClick={handleClose}>
              <CloseIcon fontSize="inherit" color="error" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent sx={{ p: 4 }}>
          <Box
            p={0}
            component="form"
            onSubmit={(event) => { onSubmit(event, CONSTANTS.CREATE_ROLE) }}
            autoComplete="off"
          >
            <Grid align="center" sx={{ mr: 2 }} container rowSpacing={2} spacing={3} >

              <Grid item xs={6}>
                <TextField fullWidth id="role-id" name="role" label="Role Name" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth id="access-level-id" name="accessLevel" label="Access Level" variant="outlined" />
              </Grid>
              <Grid item xs={6}/>
              <Grid item xs={6} >
                <LoadingButton
                  type="submit"
                  loading={loading}
                  fullWidth
                  sx={{ '&:hover': { backgroundColor: "#E53e31" }, backgroundColor: "#f53e31" }}
                  size="large"
                  variant="contained">
                  CREATE ROLE
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}