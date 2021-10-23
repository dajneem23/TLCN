import React, { useState } from 'react';
import FormSignUp from './formSignUp';

const SignUp = () => {
    const [isSubmitted,setIsSubmitted]=useState(false);

    function submitForm(){
        setIsSubmitted(true);
    }
    return (
        <>
            <FormSignUp submitForm={submitForm}/>
        </>
    );
};

export default SignUp;