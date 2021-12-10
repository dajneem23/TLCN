import axiosBase from 'axios'
const AWS_URL = 'http://52.7.3.87:4000';
const HOST = 'http://localhost:4000';
const axios =axiosBase.create({
    withCredentials :true,
    //this is devlopment host
    baseURL: AWS_URL,  //`${process.env.APIHOST}:${process.env.APIPORT}`
})

export default axios
