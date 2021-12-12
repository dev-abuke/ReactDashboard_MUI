import "./App.css";
import React from "react";
import ResponsiveDrawer from "./drawer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Dashboard from "./DashboardContainer.js";
import CardBar from "./DashboardHeader/Card"

function Home(props) {
  return (
    <div>

      <TableContainer>
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
