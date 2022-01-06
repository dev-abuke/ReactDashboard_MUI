import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CONSTANTS from "../../Helpers/Constants";

export default function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://hurricane.support/">
        {CONSTANTS.COMPANY_NAME}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  