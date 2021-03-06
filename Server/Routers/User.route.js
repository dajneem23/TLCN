const express = require('express');
const UserRoute = express();
const passport = require('passport');
const JWT =require('jsonwebtoken')
const passportConfig = require('../passport');
const dotenv=require('dotenv')
const User= require('../Models/User');
const Job = require('../Models/Job');
const ROLE_ADMIN = 0;
const ROLE_COOP = 1;
const ROLE_INTER = 2;
dotenv.config();
UserRoute.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {useNname,_id} = req.user;
    res.status(200).json({isAuthenticated : true, user : {useNname,_id}});
});

const signToken=(userID,role,userName,fullname)=>{
    return JWT.sign({
        iss:"TLCN",
        sub:userID,
        role:role,
        userName: userName,
        fullname:fullname
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
            const{_id,userName,role,fullname}=user;
            const token=signToken(_id,role,userName,fullname);
            res.cookie('access_token',token,{httpOnly:true})
            res.status(200).json({
                isAuthenticated:true,
                user:{_id,userName,role,fullname}
            })
        }
        else{
            res.status(401).json({
               "message":"wrong login"
            })
        }
    })(req, res, next);
})
// ,passport.authenticate('jwt',{session : false})
UserRoute.post('/update',async (req,res)=>{
    // const {username,_id,role} = req.user;
    const {...content} = req.body
    if(!content._id){
        return res.status(500).json({"message":"missing required value"})
    }
    // if(role != admin || _id != content._id){
    //     return res.status(403).json({'message' :' Forbidden You dont have permission to access on one page'});
    // }
    try{
        User.findOneAndUpdate({_id: content._id},{...content,'_id':content._id},{new: true},(err, user)=>{
            if(err) return res.status(500).send(err.message )
            if(!user)  return res.status(404).json({'message':"_id not found"})
            return res.status(200).json(user)
        })
    }
    catch(e){
        return res.status(500).json({'message' :e.message});
    }

});
UserRoute.get('/info',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {userName,_id,role,fullname} = req.user;
    const token=signToken(_id,role,userName,fullname);
    res.cookie('access_token',token,{httpOnly:true})
   return res.status(200).json({isAuthenticated : true, user : {userName,_id,role,fullname}});
});
UserRoute.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    const{_id,userName,role,fullname}=req.user;
    res.json({
        message:"you are logout",
        user:{ userName,_id,role,fullname},
        success : true});
});
UserRoute.get('/details',passport.authenticate('jwt',{session : false}), async (req,res)=>{
    const {username,_id,role} = req.user;
    const currentUser = await User.findById(_id).lean();
    delete currentUser.password;
    return res.status(200).json({
        message: "Get succesfully",
        user: currentUser,
        msgError:false });
});

UserRoute.post('/addWishList', passport.authenticate('jwt',{session : false}), async (req, res) => {
    const {username,_id,role} = req.user;
    const {jobId} = req.body;
    const currentUser = await User.findById(_id);
    if (currentUser == null || currentUser == undefined) {
        return res.status(403).json({ 'message': 'Can not find user', msgError: true });
    }
    if (currentUser.wishList.some(element => element == jobId)) {
        let newList = currentUser.wishList.filter(element => element != jobId);
        currentUser.wishList = newList;
    } else {
        currentUser.wishList.push(jobId);
    }
    // console.log(currentUser.wishList);
    currentUser.save(err => {
        if(err){
            console.log(err)
            res.status(500).json({
            message:{msgBody:"Error has occured 2"},
            msgError:true })
            return
        }
        else{
            res.status(200).json({
                message:{msgBody:"Edit succesfully"},
                msgError:false })
                return
        } 
    })
    
})

UserRoute.post('/approve', passport.authenticate('jwt',{session : false}), async (req, res) => {
    const {username,_id,role} = req.user;
    const {jobId, fullname, phoneNumber, email, cv} = req.body;

    const currentUser = await User.findById(_id);
    const currentJob = await Job.findById(jobId);

    if (currentUser == null || currentUser == undefined) {
        return res.status(403).json({ 'message': 'Can not find user', msgError: true });
    }

    if (currentJob == null || currentJob == undefined) {
        return res.status(403).json({ 'message': 'Can not find job', msgError: true });
    }

    if (!fullname || !phoneNumber || !email || !cv) {
        return res.status(403).json({ 'message': 'Bad request, field required!', msgError: true });
    }

    const approve = {
        userId: _id,
        fullname,
        phoneNumber,
        email,
        cv
    }

    if (!currentJob.listApprove.some(e => e.userId == _id)) {
        currentJob.listApprove.push(approve);
    }

    if (!currentUser.listApprove.some(e => e == jobId)) {
        currentUser.listApprove.push({jobId:currentJob._id, title: currentJob.title, cv:cv});
    }

    currentUser.save(err => {
        if(err){
            console.log(err)
            res.status(500).json({
            message:{msgBody:"Error has occured 2"},
            msgError:true })
            return
        }
        else{
            currentJob.save(err => {
                if(err){
                    console.log(err)
                    res.status(500).json({
                    message:{msgBody:"Error has occured 2"},
                    msgError:true })
                    return
                } else {
                    res.status(200).json({
                        message:{msgBody:"Edit succesfully"},
                        msgError:false })
                        return
                }
            })
        } 
    })
    
})

UserRoute.get('/getAllUsers',passport.authenticate('jwt',{session : false}), async (req,res)=>{
    const {username,_id,role} = req.user;
    if (role != ROLE_ADMIN) {
        return res.status(401).json({
            message:{msgBody:"Unauthenticated"},
            msgError:true 
        })
    }

    const allUsers = await User.find();
    return res.status(200).json({
        message: "Get succesfully",
        users: allUsers,
        msgError:false
    })
});

UserRoute.delete("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const userId = req.params.id;
    const {username,_id,role} = req.user;
    if(!userId){
        return res.status(500).json({"message":"missing required value"})
    }
    if (role != ROLE_ADMIN) {
        return res.status(401).json({
            message:{msgBody:"Unauthenticated"},
            msgError:true 
        })
    }

    const currentUser = await User.findById(userId);
    if(!currentUser)  return res.status(404).json({'message':"_id not found"})
    const status = currentUser.isdelete || false;

    User.findOneAndUpdate({_id: userId},{isdelete: !status},(err, user)=>{
      if(err) return res.status(500).json({'message': err.message});
      if(!user)  return res.status(404).json({'message':"_id not found"})
      
      return res.status(200).json({message: "delete successfully", user: user, msgError: false})
  })
  });

 
module.exports =UserRoute;