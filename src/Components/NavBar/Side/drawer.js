import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CONSTANTS from '../../../Helpers/Constants'
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 200;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("dashboard");

  const userData = JSON.parse(localStorage.getItem(CONSTANTS.LOGGED_IN_USERDATA))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getBackgroundColor = (listItem) =>{

    const findItem = () => {
      return CONSTANTS.SIDE_NAVBAR_ITEMS.find(item => item === listItem)
    }

    switch(listItem){
      case findItem():
        break;
      case findItem():
        break;
      case findItem():
        break;
      case findItem():
        break;

    }
  }

  const drawer = (
    <div>
      <Toolbar
        sx={{
          margin: "auto",
          borderRadius: "5%",
          alignContent: "center",
          marginTop: "50px",
          backgroundColor: "#615f5f",
        }}
      >
        <div
          style={{
            borderRadius: "5%",
            marginTop: "30px",
            margin: "10px",
            width: "200px",
            backgroundColor: "#615f5f",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginTop: "1px",
              textTransform: "uppercase",
              marginBottom: "1px",
              backgroundColor: "#615f5f",
            }}
          >
            {userData.role.roleName}
          </h3>
          <h4
            style={{
              marginTop: "1px",
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: "1px",
              backgroundcolor: "#615f5f",
              color: "#2b2a2a",
            }}
          >
            {userData.role.accessLevel}
          </h4>
        </div>
      </Toolbar>
      <Divider />
      <List>
        {CONSTANTS.SIDE_NAVBAR_ITEMS.map(
          (text, index) => (
            <ListItem
              component={RouterLink}
              to={`/home/${text.toLowerCase()}`}
              button
              key={text}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(123, 123, 123, 0.36)"
                },
                // backgroundColor: {getBackgroundColor(text)},
                margin: "auto",
                width: "185px",
                borderRadius: "5%",
              }}
            >
              <ListItemIcon>
                {index === 0 ? (
                  <DashboardIcon
                    sx={{
                      color: "white",
                    }}
                  />
                ) : null}
                {index === 1 ? (
                  <DirectionsCarIcon
                    sx={{
                      color: "white",
                    }}
                  />
                ) : null}
                {index === 2 ? (
                  <PersonIcon
                    sx={{
                      color: "white",
                    }}
                  />
                ) : null}
                {index === 3 ? (
                  <GroupIcon
                    sx={{
                      color: "white",
                    }}
                  />
                ) : null}
                {index === 4 ? (
                  <CheckCircleIcon
                    sx={{
                      color: "white",
                    }}
                  />
                ) : null}
                {index === 5 ? (
                  <EventNoteIcon
                    sx={{
                      color: "white",
                    }}
                  />
                ) : null}
              </ListItemIcon>
              <ListItemText
                component={RouterLink}
                to="/users"
              >
                {text}
              </ListItemText>
            </ListItem>
          )
        )}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <div
          sx={{
            width: "200",
            hight: "300",
            backgroundColor: "red",
          }}
        ></div>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "black",
            },
          }}
        >
          {drawer}
        </Drawer>
        <div
          sx={{
            width: "200",
            hight: "300",
            backgroundColor: "red",
          }}
        ></div>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              color: "white",
              backgroundColor: "#2b2828",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* <Toolbar /> */}
    </Box>
  );
}

export default ResponsiveDrawer;
