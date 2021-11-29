/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import FormSignUp from './formSignUpCoop';

const SignUp = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <FormSignUp submitForm={submitForm} />
    </>
  );
};

export default SignUp;
