const mongose = require('mongoose');
const bcrypt= require('bcrypt');

const Internship = new mongose.Schema(
    {
        userName:{
            type:String,
            require:true,
            min:5,
            max:20
        },
        email:{
            type:String
        },
        password:{
            type:String,
            require:true,
        },
        name:{type:String
        },
        dob:{
            type:String
        },
        sex:{
            type:String
        },
        avatarUrl:{
            type:String
        },
        exp:{
            type:String
        },
        address:{
            type:String
        },
        major:{
            type:String
        },
        listCV:{
            type:Array
        },
        wishList:{
            type:Array
        },
        listAprove:{
            type:Array
        },
        delete:{
            type:Boolean,
            default:false
        },
        verifyEmail:{
            type:Boolean,
            default:false

        }
    }
)

Internship.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)return next(err);
        this.password=passwordHash;
        next();
    })
})

Internship.methods.comparePassword=function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)return cb(err);
            if(!isMatch)return cb(null,isMatch);
            return cb(null,this);
    });
}
module.exports=mongose.model('Internship',Internship)