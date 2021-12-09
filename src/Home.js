import "./App.css";
import React, { Component } from "react";
import ResponsiveDrawer from "./drawer";

import { Box } from "@mui/system";
import Dashboard from "./Dash.js";

function Home(props) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <ResponsiveDrawer />
        <Dashboard />

        {/* <DashCardList /> */}
      </Box>
      {/* <BarChart /> */}
    </div>
  );
}

export default Home;
