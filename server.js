const express=require('express');
const signUpRouter=require('./routes/signUpRoute');
const loginRouter = require('./routes/loginRoute');
const userRouter = require('./routes/userDetailsRoute');
const userUpdateRouter = require('./routes/userUpdateRoute');
const userDeleteRouter = require('./routes/userDeleteRoute');
const bodyParser = require('body-parser');



const app=express();
require('./db/mongoose')
app.use(express.json());
app.use(signUpRouter);
app.use(loginRouter);
app.use(userRouter);
app.use(userUpdateRouter);
app.use(userDeleteRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000,()=>{
    console.log("Server is running on port 3000!");
})