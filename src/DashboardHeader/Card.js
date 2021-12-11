import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function CardBar(props) {

    return (
        <Box sx={{ ml: 25, flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Pepo Speed Limit
            </Typography>
            <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <NotificationsIcon />
              </IconButton>
              
            <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MoreVertIcon />
              </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    );
}