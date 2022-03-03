import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import NotFoundImage from "../Images/404.webp";

function NotFoundPage() {
  return (
    <>
      <Grid
        container
        direction="column"
        alignContent="center"
        justifyContent="center"
        spacing={2}      
      >
        <Grid item>
          <Typography>Oops... Something went wrong. </Typography>
        </Grid>
        <Grid item>
          <img width="40%" src={NotFoundImage} alt="" />
        </Grid>
        <Grid item>
          <Typography>
            {" "}
            Let's try going <Link to="/">back</Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default NotFoundPage;
