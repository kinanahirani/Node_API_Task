const { application } = require('express');
const express=require('express');
require('../db/mongoose');
const User=require('../db/models/user');
const router=new express.Router();

router.post('/signUp',async(req,res)=>{
    const user=new User(req.body);

    try{
        await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;