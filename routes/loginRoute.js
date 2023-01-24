const { application } = require('express');
const express=require('express');
require('../db/mongoose');
const User=require('../db/models/user');
const router=new express.Router();

router.post('/login', async (req, res) => {
    if(!req.body) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    try {
        const email=req.body.email;
        const password=req.body.password;
    //   const user = await User.findOne(u=>u.email===email && u.password===password);
    const user = await User.findOne({email, password});

    console.log('user..',user);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    //   const isMatch = await bcrypt.compare(password, user.password);
    //   if (!isMatch) {
    //     return res.status(401).json({ message: "Invalid credentials" });
    //   }
      res.status(200).json({ message: "Logged in successfully", data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;
