import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "../../Theme";
import SignUpForm from "./forms/SignUpForm";
import OpplyLogo from "../../Images/opply.png";

const SignUp: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      alignContent="center"
      justifyContent="center"
      className={classes.container}
    >
      <Grid item xs={12} md={4}>
        <Paper className={classes.paper} elevation={7} square>
          <Grid container direction="column" justifyContent="space-between">
            <Grid
              item
              style={{
                paddingBottom: 15,
              }}
            >
              <img src={OpplyLogo} alt="" height={60} />
            </Grid>
            <Grid item>
              <Typography variant="h4">
                Create an account for Osato's Opply coding test
              </Typography>
            </Grid>
            <Grid item>
              <SignUpForm />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUp;
