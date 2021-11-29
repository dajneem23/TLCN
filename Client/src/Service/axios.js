import axiosBase from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const AWS_URL = 'http://18.211.249.250:4000';
const HOST = 'http://localhost:4000';
const axios =axiosBase.create({
    withCredentials :true,
    //this is devlopment host
    baseURL: 'http://localhost:4000',  //`${process.env.APIHOST}:${process.env.APIPORT}`
})

export default axios