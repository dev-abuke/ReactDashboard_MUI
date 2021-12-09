import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

export default function DashboardCard(props) {

  return (
    <Card sx={{ height: "75%", minWidth: 200 }} {...props}>
      <CardContent
        sx={{
          marginBottom: "1px",
          marginRight: "25px",
          height: "150px",
        }}
      >
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
            {props.name}
            </Typography>
            <Typography color="#f53e31" fontSize="12" fontWeight="bold" variant="h4">
            {props.number}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}