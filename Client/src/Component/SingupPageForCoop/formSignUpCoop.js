import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UseFormRegiter from "./useFormRegisterCoop";
import validate from "./validateInfo";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme();
const formSignUp = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = UseFormRegiter(
    submitForm,
    validate
  );
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   if(data.get('password')!==data.get('password2')){
  //       console.error('Passwords do not match')
  //   }
  //   else if(!data.get('password')||!data.get('password2')){
  //     console.error('Password is required');
  //   }
  //   else{
  //       console.log({
  //           firstname: data.get('firstName'),
  //           lastName: data.get('lastName'),
  //         email: data.get('email'),
  //         password: data.get('password'),
  //       });
  //   }

  // };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            paddingBottom: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up for Co-op
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
             <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="fullname"
                  label="Co-op Name"
                  name="fullname"
                  autoComplete="fullname"
                  variant="standard"
                  value={values.fullname}
                  onChange={handleChange}
                />             
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id=""
                  label="UserName"
                  name="userName"
                  autoComplete="userName"
                  variant="standard"
                  value={values.userName}
                  onChange={handleChange}
                />
                {errors.userName && <p className="error">{errors.userName}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  fullWidth
                  id="email"
                  label=" Email"
                  variant="standard"
                  value={values.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="standard"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  variant="standard"
                  value={values.password2}
                  onChange={handleChange}
                />
                {errors.password2 && (
                  <p className="error">{errors.password2}</p>
                )}
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
};

export default formSignUp;
