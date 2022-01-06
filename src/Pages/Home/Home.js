// import "./App.css";
import React from "react";
import ResponsiveDrawer from "../../Components/NavBar/Side/drawer";
import DashboardTopNavBar from "../../Components/NavBar/Top/TopNavbar";
import { Helmet } from "react-helmet";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: 64 + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: 34 + 24,
    paddingLeft: theme.spacing(25),
    paddingRight: theme.spacing(2),
  },
}));

function Home(props) {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <DashboardTopNavBar />
      <ResponsiveDrawer />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </div>
  );
}

export default Home;
