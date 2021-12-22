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

export default function CustomDialog({dialogueOpened, alert, setOpen, onSubmit, loading}) {
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogueOpened} onClose={handleClose} maxWidth="lg" >
        <DialogTitle >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1/5}>
        <Typography fontSize="18px" variant="button">
          CREATE USER
        </Typography>
        <Alert severity="error" sx={{ mt: 2, display: alert.display }}>{alert.errorMessage}</Alert>
        <IconButton size="large" aria-label="close" onClick={handleClose}>
        <CloseIcon fontSize="inherit" color="error" />
        </IconButton>
        </Stack>
        </DialogTitle>
        <Divider variant="middle"/>
        <DialogContent sx={{p: 0}} justifyContent="center">
          {/* contains all the feilds needed to create user */}
            <UserCreationFeilds loading={loading} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
}