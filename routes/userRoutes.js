require('../db/mongoose');
const User=require('../db/models/user');
const express=require('express');
const router=new express.Router();

//User SignUp
router.post('/user/signUp',async(req,res)=>{
    const user=new User(req.body);
    try{
        await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
})

//User Login
router.post('/user/login', async (req, res) => {
    if(!req.body) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    try {
        const email=req.body.email;
        const password=req.body.password;
        const user = await User.findOne({email, password});
        const token = await user.generateAuthToken();

        console.log('user..',user);

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.status(200).send({user,token});
        // res.status(200).json({ message: "Logged in successfully", data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
  });

//Get a user by their id
router.get('/user/:id',async(req,res)=>{
    const user=await User.findById(req.params.id);
    try{
        res.status(200).send(user);
    }catch(err){
        res.status(500).send(err);
    }
})

//Get a user by their name
router.get('/user/:name', (req, res) => {
    User.findOne({first_name:req.params.name})
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Error fetching user' });
      });
  });


//Get list of users
router.get('/users/list',async(req,res)=>{
    const users=await User.find({});
    try{
        res.status(200).send(users);
    }catch(err){
        res.status(500).send(err);
    }
})

//Delete a user
router.delete('/user/delete/:id',async(req,res)=>{
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

//Update a User
router.patch('/user/update/:id',async(req,res)=>{
    const updates=Object.keys(req.body);
    const allowedUpdates=['first_name','last_name','email','password','mobile_number'];
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update));
    if(!isValidOperation){
        res.status(404).send("error:invalid operation");
    }
    try{
        const user=await User.findById(req.params.id);
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save();
        // const user=await User.findByIdAndUpdate(req.params.id,req.body,{runValidators:true,new:true});
        if(!user){
            res.status(404).send();
        }
        res.status(200).send(user);
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports=router;
