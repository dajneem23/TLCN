export default function validateInfo(values) {
  let error = {} ;
  if(!values.userName)
  {
    error.userName='Username is required';
  }
  if (!values.password) {
    error.password = 'Password is required';
  }else if(values.password.length < 6 ){
    error.password = 'Password needs to be 6 characters or more';
  }
  return error;
}