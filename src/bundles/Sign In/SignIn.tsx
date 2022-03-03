import {Grid} from "@mui/material";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "../../Theme";
import SignInForm, { SignInProps } from "./forms/SignInForm";
import OpplyLogo from "../../Images/opply.png";
import { Box } from "@material-ui/core";

function SignIn({ hasJustSignedUp, hasJustLoggedOut }: SignInProps) {
  const classes = useStyles();

  return (
    <Box>
      <Grid
        container
        direction="row"
        alignContent="center"
        justifyContent="center"
        className={classes.container}
      >
        <Grid item xs={12} md={4} spacing={2}>
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
                {!hasJustLoggedOut && !hasJustSignedUp && (
                  <Typography variant="h3">
                    Sign in to Osato's Opply coding test
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <SignInForm
                  hasJustSignedUp={hasJustSignedUp}
                  hasJustLoggedOut={hasJustLoggedOut}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignIn;
