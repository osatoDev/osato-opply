import {
  Button,
  capitalize,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikValues } from "formik";
import { ReactNode, useEffect, useState } from "react";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "../../../Theme";

type FormValues = {
  username: string;
  password: string;
};

const formInitialValues: FormValues = {
  username: "",
  password: "",
};

const SigninValidationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export type SignInProps = {
  hasJustSignedUp?: boolean;
  hasJustLoggedOut?: boolean;
};

function SignInForm({ hasJustSignedUp, hasJustLoggedOut }: SignInProps) {
  const styles = useStyles();
  const [passwordMask, setPasswordMask] = useState(false);
  const [errorState, setErrorState] = useState({ errors: { message: "" } });
  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Opply Coding Test - Sign In";
    return () => {
      document.title = "Opply Coding Test";
    };
  }, []);

  const onSubmit = async (values: FormikValues) => {
    const requestBody = JSON.stringify({
      username: values.username,
      password: values.password,
    });

    const url = `${process.env.REACT_APP_TARGET_BACKEND}/api-token-auth/`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.token) {
          setErrorState({
            errors: { message: "Invalid username or password" },
          });
          return;
        }
        sessionStorage.setItem("auth-token", result.token);
        navigate("/Suppliers");
      })
      .catch((err) => {
        setErrorState({
          errors: { message: err.message },
        });
      });
  };
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={SigninValidationSchema}
      initialValues={formInitialValues}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }): ReactNode => {
        return (
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                {hasJustSignedUp === true ? (
                  <Typography variant="h5">
                    Your account has been successfully created. Login to start
                    enjoying our services!
                  </Typography>
                ) : null}

                {hasJustLoggedOut === true ? (
                  <Typography variant="h5">
                    You have successfully logged out. Log back in at your
                    convenience!
                  </Typography>
                ) : null}
              </Grid>
              <Grid item></Grid>

              <Grid item>
                <TextField
                  fullWidth
                  inputProps={{ className: styles.input }}
                  error={touched?.username && errors?.username ? true : false}
                  placeholder={"Enter Your Username"}
                  name="username"
                  variant="filled"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {errors?.username && touched?.username ? (
                  <Typography className={styles.error}>
                    {capitalize(errors?.username || "")}{" "}
                  </Typography>
                ) : null}
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  placeholder={"Enter Your Password"}
                  error={touched?.password && errors?.password ? true : false}
                  inputProps={{ className: styles.input }}
                  name="password"
                  variant="filled"
                  type={!passwordMask ? "password" : "text"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        disableRipple={true}
                        disableFocusRipple
                        disableTouchRipple
                        aria-label="toggle password visibility"
                        onClick={(e) => setPasswordMask(!passwordMask)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {passwordMask ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
                {errors?.password && touched?.password ? (
                  <Typography className={styles.error}>
                    {capitalize(errors?.password || "")}{" "}
                  </Typography>
                ) : null}
              </Grid>

              <Grid item>
                <Button
                  fullWidth
                  disabled={errors?.password || errors?.username ? true : false}
                  endIcon={
                    isSubmitting ? (
                      <CircularProgress
                        size={15}
                        style={{ color: "#fff" }}
                        disableShrink
                      />
                    ) : null
                  }
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
                {errorState?.errors?.message && (
                  <Typography
                    style={{ paddingTop: 10 }}
                    className={styles.error}
                  >
                    {" "}
                    {capitalize(errorState?.errors?.message || "")}{" "}
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Link to="/SignUp">
                  <Typography className={styles.purple} variant="caption">
                    {" "}
                    Don't have an account? Create one.
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
}

export default SignInForm;
