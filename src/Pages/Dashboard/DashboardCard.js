import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

export default function DashboardCard(props) {

  return (
    <Card sx={{ height: "75%" }} {...props}>
      <CardContent
        sx={{
          marginBottom: "1px",
          marginRight: "50px",
          height: "140px",
        }}
      >
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom sx={{ mt: 1, fontFamily: "Roboto", fontSize: 11, textTransform: "none" }}>
            {props.name}
            </Typography>
            <Typography color="#f53e31" fontSize="12" fontWeight="Bold" variant="h4">
            {props.number}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}