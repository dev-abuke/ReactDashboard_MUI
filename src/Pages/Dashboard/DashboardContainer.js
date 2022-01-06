import { Box, Container, Grid } from "@mui/material";
import DashboardCard from "./DashboardCard";
import Typography from "@mui/material/Typography";
import PieChart from "./PieChart";
import LineGraph from "./LineGraph";
import Installed from './Components/Installed';
import CONSTANTS from '../../Helpers/Constants';

export default function Dashboard() {
  return (
    <div>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", fontSize: 21, mb: 2, ml: 2 }}
          component="h1"
          variant="h5"
        >
          DASHBOARD
        </Typography>
        <Container>
          <Grid container mb={4} spacing={2}>
          {CONSTANTS.DASHBOARD_CARD_DATA.map(data => {
            return (
              <Grid item xs={12} sm={6} md={3}>
                <DashboardCard lable={data.lable} icon={data.icon} amount={data.amount} />
              </Grid>
            );
          })}
            
            </Grid>
        </Container>
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={7.7}>
              <LineGraph />
            </Grid>
            <Grid item lg={4}>
              <PieChart />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
