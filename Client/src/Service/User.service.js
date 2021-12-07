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
    return await axios.get(`${userPath}/info`);
  },
  Logout: async () => {
    return await axios.get(`${userPath}/logout`);
  },
  AddWishList: async (id) => {
    try {
      return await axios.post(`${userPath}/addWishList`, {
        jobId: id
      });
    } catch (e) {
      console.log(e);
    }
  },
  GetDetails: async () => {
    return await axios.get(`${userPath}/details`);
  }
};
