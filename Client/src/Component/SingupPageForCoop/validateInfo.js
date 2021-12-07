export default function validateInfo(values) {
  let errors = {};
  if (!values.userName) {
    errors.userName = "Email required";
  }
  // else if (!/\S+@\S+\.\S+/.test(values.userName)) {
  //   errors.userName = 'Email address is invalid';
  // }
  if (!/^[a-zA-Z0-9]*$/.test(values.password) || !values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }

  if (!values.password2) {
    errors.password2 = "Password is required";
  } else if (values.password2 !== values.password) {
    errors.password2 = "Passwords do not match";
  }
  return errors;
}
