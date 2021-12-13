import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../../Service/User.service";
import { AuthContext } from "../../Service/Auth.context";

const useFormLogin = (callback, validate) => {
  const { user, setUser, isAuthenticated, setisAuthenticated, info, setinfo } =
    useContext(AuthContext);
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  let history = useHistory();
  console.log(history)
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  //   const authContext   = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   setErrors(validate(values));
  //   setIsSubmitting(true);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setErrors(validate(errors));
    console.log(values)
    setIsSubmitting(true);
    await User.Login({ userName: values.userName, password: values.password })
      .then((res) => {
        console.log(res.userName, res.password); // K duoc xoa log nay loi do hihi!
        toast.configure();
        toast.success("Dang nhap thanh cong!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setUser(res.data.user);
          console.log(res.data.user)
        setisAuthenticated(res.data.isAuthenticated);
        setinfo(res.data.info);
        console.log(info);
        // history.push(history.location);
        
        history.goBack();
        
        setTimeout(function () {
          return 0;
        }, 3000);
      })
      .catch((err) => {
        toast.configure();
        toast.error("Dang nhap that bai!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsSubmitting(false);
      });
  };
  return { handleChange, handleSubmit, values, errors };
};

export default useFormLogin;
