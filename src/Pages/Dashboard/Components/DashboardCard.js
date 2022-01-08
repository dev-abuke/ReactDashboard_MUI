import { Card, CardContent, Typography } from "@mui/material";

export default function DashboardCard(props) {
  return (
    <Card {...props}>
      <CardContent >
        <Typography
          color="textSecondary"
          gutterBottom
          sx={{
            mt: 1,
            fontFamily: "Roboto",
            fontSize: 14,
            textTransform: "none",
          }}
        >
          {props.lable}
        </Typography>
        <Typography
          color="#f53e31"
          fontSize="12"
          fontWeight="Bold"
          variant="h4"
        >
          {props.amount}
        </Typography>
      </CardContent>
    </Card>
  );
}
