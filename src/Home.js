import "./App.css";
import React from "react";
import ResponsiveDrawer from "./drawer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dashboard from "./Dash.js";
import CardBar from "./DashboardHeader/Card"

function Home(props) {
  return (
    <div>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} >
          <TableBody>

            <TableRow>
              <CardBar />

              <TableRow>
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
