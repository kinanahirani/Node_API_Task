require('../db/mongoose');
const User=require('../db/models/user');
const express=require('express');
const router=new express.Router();

router.delete('/delete-user/:id',async(req,res)=>{
    const user=await User.findByIdAndDelete(req.params.id);
    try{
        if(!user){
            return res.status(404).send();
        }
        res.status(200).send(user);
    }catch(err){
        res.status(500).send();
    }
})
module.exports=router;
