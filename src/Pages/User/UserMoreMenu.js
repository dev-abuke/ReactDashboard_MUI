import { useRef, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import { Link as RouterLink } from "react-router-dom";
import BlockIcon from "@mui/icons-material/Block";
import ActiveIcon from "@mui/icons-material/CheckCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function MoreMenu(props) {

  const ref = useRef(null);

  const [ isOpen, setOpen ] = useState(false)

  const {
    row,
    handleDeactivateMenuClick, 
    handleResetPasswordMenuClick,
    handleEditMenuClick,

  } = props

  return (
    <>
      <IconButton ref={ref} onClick={() => setOpen(true)}>
        <SettingsIcon width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem 
          onClick={() => handleDeactivateMenuClick(setOpen, row)}
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            {row.status ? <BlockIcon /> : <ActiveIcon /> }
          </ListItemIcon>
          <ListItemText
            primary={row.status ? "Deactivate User" : "Activate User" }
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => handleResetPasswordMenuClick(setOpen, row)}
          component={RouterLink}
          to="#"
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <RefreshIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Reset Password"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => handleEditMenuClick(setOpen, row)}
          component={RouterLink}
          to="#"
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <EditIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit User"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
