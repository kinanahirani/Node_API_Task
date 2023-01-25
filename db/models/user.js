const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw err;
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        validate(value){
            if(value==="password")
                throw err;
        }  
    },
    mobile_number:{
        type:String,
        minlength:10,
        maxlength:10,
        unique:true
    }
})

userSchema.methods.generateAuthToken=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},'keytoaccessuser')
    return token;
}
userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8);
    }
    next();
})
const User=mongoose.model('User',userSchema)

module.exports=User;