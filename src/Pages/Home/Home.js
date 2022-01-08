// import "./App.css";
import React, {useState} from "react";
import ResponsiveDrawer from "./SideNavbar";
import DashboardTopNavBar from "../../Components/NavBar/Top/TopNavbar";
import { Helmet } from "react-helmet";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import CONSTANTS from '../../Helpers/Constants'

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: 64 + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: 34 + 24,
    paddingLeft: CONSTANTS.DRAWER_WIDTH,
    paddingRight: theme.spacing(2),
  },
}));

function Home(props) {
  
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <DashboardTopNavBar onOpenSidebar={() => setOpen(true)} />
      <ResponsiveDrawer isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </div>
  );
}

export default Home;
