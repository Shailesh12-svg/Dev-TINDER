const express = require('express')
const app = express();
const port =8000;
const connectDB =require("./config/database")
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/auth');
const connectionRequestRouter = require('./routes/connectionRequest');
const profileRouter = require('./routes/profile');
//Middlewares
app.use(express.json()); //for parsing the JSON OBJECTS
app.use(cookieParser());

//How you would be using that 

app.use('/',authRouter);
app.use('/',connectionRequestRouter)
app.use('/',profileRouter)





connectDB().then(()=>{
    console.log("Database connection established")
    app.listen(port,()=>{
        console.log(`Dev-Tinder server is running on ${port}`)
    })
}).catch(err=>{
    console.log("Opps Something went wrong ")
})




