import { ListItemIcon, ListItemText } from "@mui/material";

export default function UserMenuList(props) {

  const { menuItem, } = props;

  var Icon = <menuItem.icon />
  var Label = menuItem.label

  return (
    <>
      <ListItemIcon>
        { Icon }
      </ListItemIcon>
      <ListItemText
        primary={ Label }
        primaryTypographyProps={{ variant: "body2" }}
      />
    </>
  );
}
