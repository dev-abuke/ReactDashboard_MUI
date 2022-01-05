import * as React from "react";
import { Stack, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

export default function ManagementDialog(props) {
  
  const { dialog, handleDialogClose } = props;

  return (
    <div>
      <Dialog open={dialog.isOpen} onClose={handleDialogClose} maxWidth="xxl">
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={1 / 5}
          >
            <Typography fontSize="18px" variant="button">
              {dialog.title}
            </Typography>
            <Alert
              severity="error"
              sx={{ mt: 2, display: dialog.errorDisplay }}
            >
              {dialog.errorMessage}
            </Alert>
            <IconButton size="large" aria-label="close" onClick={handleDialogClose}>
              <CloseIcon fontSize="inherit" color="error" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent sx={{ p: 3 }}>

          <dialog.Content {...props} />

        </DialogContent>
      </Dialog>
    </div>
  );
}
