const mongose = require('mongoose');
const bcrypt= require('bcryptjs');

const User = new mongose.Schema(
    {
        userName:{
            type:String,
            required:true,
            min:5,
            max:20,
            unique:true,
        },
        email:{
            type:String,
            validate:[validateEmail,'invalid email']
        },
        role:{
            type:String,
            default:1,
            enum :  [0,1,2],
              
        },
        password:{
            type:String,
            required:true,
            min:6,
            max:30
        },
        fullname:{
            type:String
        },
        dob:{
            type:String
        },
        sex:{
            type:String
        },
        avatar:{
            type:String
        },
        exp:{
            type:String,
            required:[()=>{
                return   this.role==1 
            },'inern only']
        },
        address:{
            type:String
        },
        major:{
            type:String,
            required:[()=>{
                return   this.role==1  
               },'inern only']
        },
        listCV:{
            type:Array,
            required:[()=>{
             return   this.role==1 
            },'inern only']
        },
        wishList:{
            type:Array
        },
        listApprove:{
            type:Array
        },
        isdelete:{
            type:Boolean,
            default:false
        },
        verifyEmail:{
            type:Boolean,
            default:false

        },
        listJobDetails:{
            type:Array
        },
        coopName:{
            type:String,
            required:[()=>{
               return this.role==2
            },'coop only']
        },
        coopdes:{
            type:String,
            required:[()=>{
               return  this.role==2
            },'coop only']
        }
    }
)

User.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)return next(err);
        this.password=passwordHash;
        next();
    })
})
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())==true;
}
User.methods.comparePassword=function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)return cb(err);
            if(!isMatch)return cb(null,isMatch,{ message: 'Incorrect password.' });
            return cb(null,this);
    });
}
module.exports=mongose.model('User',User)