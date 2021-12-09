import { Box, Container, Grid } from "@mui/material";
import DashboardCard from "./DashboardCard";
import Typography from '@mui/material/Typography';

const Dashboard = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Typography sx={{ fontWeight: 'bold', fontSize: 21, mb: 4, ml: 2 }} component="h1" variant="h5">
        DASHBOARD
      </Typography>
      <Container maxWidth={false}>
        <Grid container spacing={3} sx={{ display: "flex" }}>
          <Grid item lg={2}>
            <DashboardCard name="Total" number="257"/>
          </Grid>
          <Grid item xl={3}>
            <DashboardCard  name="Paid_installed_reciept Issued" number="257"/>
          </Grid>
          <Grid item xl={3}>
            <DashboardCard name="Total" number="257" />
          </Grid>
          <Grid item xl={4}>
            <DashboardCard name="Total" number="257" />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth={false}>
        <Grid container spacing={3} sx={{ display: "flex" }}>
          <Grid item lg={3}>
            <DashboardCard name="Total" number="257" />
          </Grid>
          <Grid item xl={3}>
            <DashboardCard  name="Total" number="257"/>
          </Grid>
          <Grid item xl={3}>
            <DashboardCard name="Paid_install_noreciept" number="257" />
          </Grid>
          <Grid item xl={3}>
            <DashboardCard name="Paid_install_noreciept" number="257" />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth={false}>
        <Grid container spacing={3} sx={{ display: "flex" }}>
          <Grid item lg={6}>
            {/* <GraphChart /> */}
          </Grid>
          <Grid item lg={6}>
            {/* <BarChart /> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
