/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { User } from "../../Service/User.service";

const axios = require("../../Service/axios");
const useFormRegister = (callback, validate) => {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    userName: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    console.log("fff");
  };
  const onSubmit = (e) => {
    setIsSubmitting(true);
  };
  useEffect(async () => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log(values);
      toast.configure();
      await User.SignUp({ ...values })
        .then((res) => {
          toast.success("Đăng ký thành công", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          console.log(res);
          window.location = "/signin";
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    }
  }, [errors, values]);

  return { handleChange, handleSubmit, values, errors };
};

export default useFormRegister;
