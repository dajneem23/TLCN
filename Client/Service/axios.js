import axiosBase from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const axios =axiosBase.create({
    withCredentials :true,
    //this is devlopment host
    baseURL: 'http://localhost:5500',  //`${process.env.APIHOST}:${process.env.APIPORT}`
})

export default axios