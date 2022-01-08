import { useRef, useState } from "react";

// material
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreMenuIcon from "@mui/icons-material/MoreVert";

export default function MoreMenu(props) {

  const ref = useRef(null);

  const [isOpen, setOpen] = useState(false);

  const { row, handleMenuClick, menu } = props;

  return (
    <>
      <IconButton ref={ref} onClick={() => setOpen(true)}>
        <MoreMenuIcon width={20} height={20} />
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
        {menu.options.map((menuItem, index) => {
          return (
            <MenuItem
              onClick={() => handleMenuClick(setOpen, row, menuItem.id)}
              sx={{ color: "text.secondary" }}
            >
              <menu.ui {...props} menuItem={menuItem} index={index} />

            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
