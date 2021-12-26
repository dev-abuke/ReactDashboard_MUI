import * as React from 'react';
import Button from '@mui/material/Button';
import { Stack, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserCreationFeilds from './UserCreationFeilds'
import UserSetting from './UserSetting'
import Alert from '@mui/material/Alert';

export default function CustomDialog({ dialogueOpened, data, alert, setOpen, onSubmit, loading }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogueOpened.isDialogOpen} onClose={handleClose} maxWidth="lg" >
        <DialogTitle >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1 / 5}>
            <Typography fontSize="18px" variant="button">
              {dialogueOpened.openedBy === "CREATE_USER" ? "CREATE USER" : "USER SETTINGS"}
            </Typography>
            <Alert severity="error" sx={{ mt: 2, display: alert.displayError }}>{alert.errorMessage}</Alert>
            <IconButton size="large" aria-label="close" onClick={handleClose}>
              <CloseIcon fontSize="inherit" color="error" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent sx={{ p: 0 }}>
          {/* contains all the feilds needed to create user */}
          {dialogueOpened.openedBy === "CREATE_USER" ?
            <UserCreationFeilds data={data} loading={loading} onSubmit={onSubmit} /> :
            <UserSetting data={data} loading={loading} onSubmit={onSubmit} />
          }
        </DialogContent>
      </Dialog>
    </div>
  );
}