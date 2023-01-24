const { application } = require('express');
const express=require('express');
require('../db/mongoose');
const User=require('../db/models/user');
const router=new express.Router();

router.patch('/update-user/:id',async(req,res)=>{
    const updates=Object.keys(req.body);
    const allowedUpdates=['first_name','last_name','email','password','mobile_number'];
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update));
    if(!isValidOperation){
        res.status(404).send("error:invalid operation");
    }
    try{
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{runValidators:true,new:true});
        if(!user){
            res.status(404).send();
        }
        res.status(200).send(user);
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;