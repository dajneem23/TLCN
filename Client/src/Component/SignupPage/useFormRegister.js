import { useState, useEffect } from 'react';
import {toast} from 'react-toastify';
const axios = require('axios');

const useFormRegister = (callback, validate) => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleChange = e => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value
      });
    };
    
    const handleSubmit = e => {
      e.preventDefault();
      setErrors(validate(values));
      setIsSubmitting(true);
    };
    const onsubmit = e=>{
      setIsSubmitting(true);
    }
    useEffect(
      () => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            console.log(values)
            toast.configure();
            toast.success('Đăng ký thành công' ,{position:toast.POSITION.BOTTOM_LEFT});
        }
      },
      [errors,values]
     );
  
    return { handleChange, handleSubmit, values, errors };
  };
  
  export default useFormRegister;