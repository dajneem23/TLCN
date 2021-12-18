import axios from "./axios";
const userPath = "/user";
export const User = {
  Login: async ({ userName, password }) => {
    try {
      return await axios.post(`${userPath}/signin`, {
        userName: userName,
        password: password,
      });
    } catch (e) {
      console.log(e);
    }
  },
  SignUp: async (args) => {
    try {
      return await axios.post(`${userPath}/signup`, args);
    } catch (e) {
      console.log(e);
    }
  },
  Info: async () => {
    try {
      return await axios.get(`${userPath}/info`).catch((error) => error);
    } catch (e) {
      console.log(e);
    }
  },
  Logout: async () => {
    return await axios.get(`${userPath}/logout`).catch((error) => error);
  },
  AddWishList: async (id) => {
    try {
      return await axios.post(`${userPath}/addWishList`, {
        jobId: id,
      });
    } catch (e) {
      console.log(e);
    }
  },
  ApproveJob: async (id,values) => {
    try {
      return await axios.post(`${userPath}/approve`, {
        jobId: id,
        fullname: values.fullname,
        phoneNumber:values.phoneNumber,
        email:values.email,
        cv:values.cv,
      });
    } catch (e) {
      console.log(e);
    }
  },
  GetDetails: async () => {
    return await axios.get(`${userPath}/details`).catch((error) => error);
  },
  UpdateUser: async (body) => {
    try {
      const result = await axios.post(`${userPath}/update`, body);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
