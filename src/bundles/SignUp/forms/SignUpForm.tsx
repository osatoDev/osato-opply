import {
  Button,
  capitalize,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikValues, yupToFormErrors } from "formik";
import { ReactNode, useEffect, useState } from "react";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "../../../Theme";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

const formInitialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
};

const SignupValidationSchema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name"),
  lastName: yup.string().required("Please enter your last name"),
  email: yup.string().email().required("Please enter your e-mail address"),
  username: yup
    .string()
    .required("Please enter a username")
    .max(150, "Please enter 150 characters or fewer"),
  password: yup.string().required("Please enter a password"),
});

function SignUpForm() {
  const styles = useStyles();
  const [passwordMask, setPasswordMask] = useState(false);
  const [errorState, setErrorState] = useState({ errors: { message: "" } });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Opply Coding Test - Sign Up";
    return () => {
      document.title = "Opply Coding Test";
    };
  }, []);

  const onSubmit = async (values: FormikValues) => {
    setLoading(true);
    const requestBody = JSON.stringify({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      username: values.username,
      password: values.password,
    });

    const url = `${process.env.REACT_APP_TARGET_BACKEND}/api/v1/users/`;
   await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody, 
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.username && !result.password) {
          setErrorState({
            errors: { message: "Account creation failed" },
          });
          setLoading(false);
          return;
        }
        navigate("/signinFromSignUp");
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
      validationSchema={SignupValidationSchema}
      initialValues={formInitialValues}
      validateOnChange={false}
      validateOnBlur={true}
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
            <Grid container direction="column" spacing={1.5}>        

              <Grid item>
                <TextField
                  inputProps={{ className: styles.input }}
                  fullWidth
                  error={touched?.firstName && errors?.firstName ? true : false}
                  placeholder={"First Name"}
                  name="firstName"
                  variant="filled"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                {errors?.firstName && touched?.firstName ? (
                  <Typography className={styles.error}>
                    {capitalize(errors?.firstName || "")}{" "}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item>
                <TextField
                  inputProps={{ className: styles.input }}
                  fullWidth
                  error={touched?.lastName && errors?.lastName ? true : false}
                  placeholder={"Last Name"}
                  name="lastName"
                  variant="filled"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                {errors?.lastName && touched?.lastName ? (
                  <Typography className={styles.error}>
                    {capitalize(errors?.lastName || "")}{" "}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item>
                <TextField
                  inputProps={{ className: styles.input }}
                  fullWidth
                  error={touched?.email && errors?.email ? true : false}
                  placeholder={"Email"}
                  name="email"
                  variant="filled"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors?.email && touched?.email ? (
                  <Typography className={styles.error}>
                    {capitalize(errors?.email || "")}{" "}
                  </Typography>
                ) : null}
              </Grid>

              <Grid item>
                <TextField
                  inputProps={{ className: styles.input }}
                  fullWidth
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

              <Grid item className={styles.padder}>
                <Button
                  style={{ color: "#fff" }}
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
                  fullWidth
                  variant="contained"
                >
                  Create Account
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
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  alignContent="center"
                  direction="row"
                  className={styles.smallPadder}
                >
                  <Grid item>
                    <Typography variant="caption"> </Typography>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Link to="/signin">
                  <Typography className={styles.purple} variant="caption">
                    {" "}
                    Already have an account? Login here
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

export default SignUpForm;
