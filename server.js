const express=require('express');
const userRoutes=require('./routes/userRoutes')
const bodyParser = require('body-parser');
const app=express();
require('./db/mongoose')

app.use(express.json());
app.use(userRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000,()=>{
    console.log("Server is running on port 3000!");
})