const express = require('express');
const UserRoute = express();
const passport = require('passport');
const JWT =require('jsonwebtoken')
const passportConfig = require('../passport');
const dotenv=require('dotenv')
const User= require('../Models/User');
dotenv.config();
UserRoute.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username,_id} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,_id}});
});

const signToken=(userID,role)=>{
    return JWT.sign({
        iss:"TLCN",
        sub:userID,
        role:role
    },process.env.secretKey,{expiresIn:"1h"});
}

UserRoute.post('/signup',(req,res)=>{
    const {...content} =req.body    
    User.findOne({'userName':content.userName},(err,user)=>{
            if(err) {res.status(500).json({
                message:{msgBody:"Error has occured 1"},
                msgError:true })    
            throw new Error(err)
            }
            if(user)res.status(400).json({
                message:{msgBody:"Username is already taken "},
                msgError:true })
                else{
                    const user = new User(content)
                    user.save(err=>{
                        if(err){
                            console.log(err)
                            res.status(500).json({
                            message:{msgBody:"Error has occured 2"},
                            msgError:true })
                            return
                        }
                        else{
                            res.status(200).json({
                                message:{msgBody:"Account succesfully created"},
                                msgError:false })
                                return
                        } 
                    })
                }
    })
})
// .isAuthenticated()
UserRoute.post('/signin',(req, res,next)=>{
    passport.authenticate('local',{session:false},(err,user)=>{
        if(err) throw err;
        if(user){
            const{_id,userName,role}=user;
            const token=signToken(_id,role);
            res.cookie('access_token',token,{httpOnly:true})
            res.status(200).json({
                isAuthenticated:true,
                user:{userName,_id}
            })
        }
        else{
            res.status(401).json({
               "message":"wrong login"
            })
        }
    })(req, res, next);
})
UserRoute.get('/info',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username,_id} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,_id}});
});
 
module.exports =UserRoute;