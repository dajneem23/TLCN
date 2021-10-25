const JWT =require('jsonwebtoken')
const express = require('express');
const passport = require('passport');
const passportConfig = require('../passport');
const dotenv=require('dotenv')
const Internship= require('../Models/Internship');

const InternshipRouter=express.Router();
const signToken=userID=>{
    return JWT.sign({
        iss:"GymLord",
        sub:userID
    },process.env.secretKey,{expiresIn:"1h"});
}

InternshipRouter.post('/signup',(req,res)=>{
    const {...content} =req.body
    console.log(content.userName)
    
    Internship.findOne({'userName':content.userName},(err,user)=>{
            if(err) {res.status(500).json({
                message:{msgBody:"Error has occured 1"},
                msgError:true })    
            throw new Error(err)
            }
            if(user)res.status(400).json({
                message:{msgBody:"Username is already taken "},
                msgError:true })
                else{
                    const internship = new Internship(content)
                    internship.save(err=>{
                        if(err){
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
InternshipRouter.post('/signin',passport.authenticate('local',{session:false}),(req,res)=>{
    if(req.isAuthenticated()){
        const{_id,userName}=req.user;
        const token=signToken(_id);
        
        res.cookie('access_token',token,{httpOnly:true})
        res.status(200).json({
            isAuthenticated:true,
            user:{userName,_id}
        })
    }
    else{
        res.status(401).json({
           "msg":"wrong login"
        })
    }
})
InternshipRouter.post('/test',(req,res)=>{
    res.status(200).json({
        "msg":"123123 123123"
     })
})

module.exports = InternshipRouter;