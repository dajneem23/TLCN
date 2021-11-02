import { useState, useEffect ,useContext} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const useFormLogin = (callback, validate) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    
  });
 
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
//   const authContext   = useContext(AuthContext);
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   setErrors(validate(values));
  //   setIsSubmitting(true);
  // };
  const handleSubmit = e=>{
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  }

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        console.log(values)
        toast.configure();
        toast.success('🦄 Wow so easy!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
    }
    },[errors])
 

  return { handleChange, handleSubmit, values, errors };
};

export default useFormLogin;