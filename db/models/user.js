const mongoose=require('mongoose');
const validator=require('validator');
const User=mongoose.model('User',{
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
        trim:true,
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

module.exports=User;