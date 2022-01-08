import { ListItemIcon, ListItemText } from "@mui/material";
import ActivateIcon from "@mui/icons-material/CheckCircleOutline";

export default function UserMenuList(props) {

  const { row, menuItem, index, } = props;

  var Icon = <menuItem.icon />
  var Label = menuItem.label

  if(index === 0){
    Icon = row.status ? Icon :<ActivateIcon />
    Label = row.status ?  Label : "Activate User" 
  }

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
