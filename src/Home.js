import "./App.css";
import React from "react";
import ResponsiveDrawer from "./drawer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Dashboard from "./DashboardContainer.js";
import CardBar from "./DashboardHeader/Card";
import DashboardTopNavBar from "./DashboardNavBar/DashboardTopNavbar";
import { Helmet } from "react-helmet";
import { styled } from '@mui/material/styles';
import { Outlet, Link } from "react-router-dom";


const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: 64 + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: 34 + 24,
    paddingLeft: theme.spacing(25),
    paddingRight: theme.spacing(2)
  }
}));

function Home(props) {
  console.log("Home Props isaa : ", props)
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <body style="background-color:#f7f7f7;" />
      </Helmet>
      <DashboardTopNavBar />
      <ResponsiveDrawer />
      <MainStyle>
      <Outlet/>
      </MainStyle>
    </div>
  );
}

export default Home;
