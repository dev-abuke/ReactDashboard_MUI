import * as React from 'react';
import { Stack, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import UserCreationFeilds from './CreateUser'
import UserSetting from './UserSetting'
import Alert from '@mui/material/Alert';

export default function CustomDialog(props) {

  const { dialogueOpened, alert, setOpen } = props
    
  console.log("THE PROPS ARE IN CustomDialog: ", props)


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogueOpened.isOpen} onClose={handleClose} maxWidth="lg" >
        <DialogTitle >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1 / 5}>
            <Typography fontSize="18px" variant="button">
              {dialogueOpened.openedBy === "CREATE_USER" ? "CREATE USER" : "USER SETTINGS"}
            </Typography>
            <Alert severity="error" sx={{ mt: 2, display: alert.display }}>{alert.message}</Alert>
            <IconButton size="large" aria-label="close" onClick={handleClose}>
              <CloseIcon fontSize="inherit" color="error" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent sx={{ p: 0 }}>
          {/* contains all the feilds needed to create user */}
          {dialogueOpened.openedBy === "CREATE_USER" ?
            <UserCreationFeilds {...props}/> :
            <UserSetting {...props}/>
          }
        </DialogContent>
      </Dialog>
    </div>
  );
}