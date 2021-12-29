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
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 200;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getLink = (text) =>{
    return "/home/" + text.toLowerCase()
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
              marginBottom: "1px",
              backgroundColor: "#615f5f",
            }}
          >
            MANAGER
          </h3>
          <h4
            style={{
              marginTop: "1px",
              textAlign: "center",
              marginBottom: "1px",
              backgroundColor: "#615f5f",
              color: "#2b2a2a",
            }}
          >
            MANAGER
          </h4>
        </div>
      </Toolbar>
      <Divider />
      <List>
        {["DASHBOARD", "VEHICLES", "USERS", "TEAMS", "ROLES", "REPORT"].map(
          (text, index) => (
            <ListItem
              component={RouterLink}
              to={getLink(text)}
              button
              key={text}
              sx={{
                "&:hover": {
                  backgroundColor: "#f53e31",
                },
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
          sdfsdfsdf
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

// ResponsiveDrawer.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default ResponsiveDrawer;
