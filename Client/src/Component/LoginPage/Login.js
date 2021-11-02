import React, { useState } from 'react';
import FormLogin from './formLogin';

const Login = () => {
    const [isSubmitted,setIsSubmitted]=useState(false);

    function submitFormLogin(){
        setIsSubmitted(false);
    }
    return (
        <>
            <FormLogin submitForm={submitFormLogin}/>
        </>
    );
};

export default Login;