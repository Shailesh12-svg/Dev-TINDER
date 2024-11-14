const express = require('express')
const app = express();
const port =8000;
const connectDB =require("./config/database")
const UserModel = require('./models/user')

//API
app.post('/signup',async(req,res)=>{
    //Logic to add data into the database
    const userObj ={
        firstName:"Shailesh Sundar",
        lastName:"Mallick",
        emailId:"mallicksailesh957@gmail.com",
        password:"123@sd"
    }
    //creating  a new instance of the userModel
    const user = new UserModel(userObj);

    try{
    await user.save(); //Data is saved in to the database

    res.send("User Added successfully")

    } catch(err){
        res.status(400).send("Error saving it to the database:"+err.message);
    }
})




connectDB().then(()=>{
    console.log("Database connection established")
    app.listen(port,()=>{
        console.log(`Dev-Tinder server is running on ${port}`)
    })
}).catch(err=>{
    console.log("Opps Something went wrong ")
})




