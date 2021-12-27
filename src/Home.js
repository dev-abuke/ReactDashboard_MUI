import "./App.css";
import React from "react";
import ResponsiveDrawer from "./drawer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Dashboard from "./DashboardContainer.js";
import CardBar from "./DashboardHeader/Card"
    import { Helmet } from 'react-helmet';

function Home(props) {
  return (
    <div>

      <TableContainer>
    <Helmet>
        <title>Dashboard</title>
        <body style="background-color:#f7f7f7;" />
      </Helmet>
        <Table sx={{ minWidth: 650 }} >
          <TableBody>

            <TableRow>
              <CardBar />
              
              <TableRow sx={{display: "flex"}}>
                <ResponsiveDrawer />
                <Dashboard />
              </TableRow>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;
