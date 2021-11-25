const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport')

const cookieParser = require('cookie-parser');
 
var bodyParser = require('body-parser');
// app.use(express.bodyParser());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.json());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");// update to match the domain you will make the request from
   
   res.header('Access-Control-Allow-Credentials', true);
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
  next();
});
dotenv.config();
app.use(cors({ credentials: true ,origin: [
  "http://localhost:3000",
  "http://127.0.0.1",
  "http://104.142.122.231",
],}))

const uri=process.env.DB_URI;

const  connection =async()=>{
  await  mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    console.log("mongoose connect");
} 
connection()

const ComplierRouter=require('./Routers/Complier.route')
app.use('/complier',ComplierRouter )
const UserRoute=require('./Routers/User.route')
app.use('/user',UserRoute )
const JobRouter = require('./Routers/Job.router');
app.use('/job', JobRouter);
const ProblemRouter = require('./Routers/Problem.router');
app.use('/problem', ProblemRouter);
app.get('/test',(req, res)=>{
  return  res.status(200).json({
      ok:'true'
  })
})
const port=process.env.PORT
app.listen(port,'0.0.0.0',
  ()=>{console.log("server is running!! " +port)});
