import { useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';
import BlockIcon from '@mui/icons-material/Block';
import SettingsIcon from '@mui/icons-material/Settings';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

// ----------------------------------------------------------------------

export default function UserMoreMenu({onSettingIconClick, id}) {
  const ref = useRef(null);

  const handleSettingClick = () => {
    onSettingIconClick(id)
  }

  return (
    <>
      <IconButton ref={ref} onClick={handleSettingClick}>
        <SettingsIcon width={20} height={20} />
      </IconButton>

      {/* <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <BlockIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Deactivate" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <EditIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu> */}
    </>
  );
}
