export default function validateInfo(values) {
    let error = {} ;
    if(!values.email)
    {
      error.email='Email is required';
    }
    if (!values.password) {
      error.password = 'Password is required';
    }else if(values.password.length < 6 ){
      error.password = 'Password needs to be 6 characters or more';
    }
    return error;
  }