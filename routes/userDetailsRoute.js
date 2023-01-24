const { application } = require('express');
const express=require('express');
require('../db/mongoose');
const User=require('../db/models/user');
const router=new express.Router();

router.get('/users',async(req,res)=>{
    const users=await User.find({});
    try{
        res.status(200).send(users);
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;