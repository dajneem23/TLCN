import axiosBase from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const axios =axiosBase.create({
    withCredentials :true,
    //this is devlopment host
    baseURL: 'http://ec2-52-54-144-113.compute-1.amazonaws.com:4000',  //`${process.env.APIHOST}:${process.env.APIPORT}`
})

export default axios