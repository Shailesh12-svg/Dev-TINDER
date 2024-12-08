const express = require('express')
const app = express();
const port =8000;
const connectDB =require("./config/database")
const UserModel = require('./models/user')
const {validateSignUp} = require('./utils/validation')
const bcrypt = require('bcrypt')
const validator = require('validator')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const {userAuth} = require("./middlewares/auth")
//Middlewares
app.use(express.json()); //for parsing the JSON OBJECTS
app.use(cookieParser());




//API
app.post('/signup',async(req,res)=>{

    try{

        //Validate your requests
        validateSignUp(req);

        //Encrypt your password 

        const {firstName,lastName,emailId,password}= req.body;

        const passwordHash = await bcrypt.hash(password,10)

        const user = new UserModel({
            firstName,
            lastName,
            emailId,
            password:passwordHash
        })


    await user.save()

    res.send("User Added successfully in our database")
    }
    catch(err){
        res.status(400).send("Error in adding user to the database"+err.message)
    }


    //Creating a dummy object
    // const userObj={
    //     firstName:"Virat",
    //     lastName:"Kohli",
    //     emailId:"mallicksailesh957@gmail.com",
    //     password:"vil12@"
    // }

    // //Creating  a new instance of that userModel
    // try{
    // const user = new UserModel(userObj)

    // await user.save();

    // res.send("User Added successfully")

    // }catch(err){
    //     res.status(400).send("Error adding data to the database"+err.message)
    //  }
    }) 

//get api :- /feed :- get all the users from the database

//Get user by email
app.get('/user',async(req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const user = await UserModel.find({emailId:userEmail})
        //Check
        if(user.length===0){
            res.send("User not found")
        }else{
            res.send(user)
        }
        

    }catch(err){
        res.status(400).send("Something went wrong"+err.message)
    }
})





app.get('/feed',async(req,res)=>{

    try{
        const users=await UserModel.find({});

        res.send(users)
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})


//API

app.get('/userId',async(req,res)=>{
    const userId = await UserModel.findById({id:'id'})

    if(userId){
        res.send(userId)
    }else{
        res.send("User not found")
    }
})


//Delete API

app.delete("/user",async(req,res)=>{
   const userId = req.body.userId;
   try{
    
    await UserModel.findByIdAndDelete(userId)

    res.send("User deleted sucessfully")


   }catch(err){
    res.status(400).send("Something went wrong")
   } 
})

//Update the Data 

app.patch("/user",async(req,res)=>{
    const userData = req.body;
    const userId = req.body.userId;

    try{

    const ALLOWED_UPDATES =["userId","photoUrl","about","gender","age","skills"];
    const isUpdateAllowed = Object.keys(userData).every(k =>ALLOWED_UPDATES.includes(k));

    if(!isUpdateAllowed){
        throw new Error("Update not allowed");
    }

    if(userData?.skills.length>5){
        throw new Error("We require only 5 skills ...")
    }
 
        const user =await UserModel.findByIdAndUpdate({_id:userId},userData,{
            returnDocument:"before",
            runValidators:true,
        });
        console.log(user)
        res.send("User updated successfully")

    }catch(err){
        res.status(400).send("Something went wrong"+err.message)
    }
})

//Login API

app.post("/login",async(req,res)=>{
    const {emailId,password}= req.body;

    //Validate the emailId
    if(!validator.isEmail(emailId)){
        throw new Error("Invalid Credentials")
    }

    const user = await UserModel.findOne({emailId:emailId});

    if(!user){
        throw new Error("Invalid Credentials")
    }
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){
            //Logic

            //Create a JWT Token
            //expiresIn for setting expiry time of that token
            const token = await user.getJWT();
            

            //Add the token to cookie & SEND THE RESPONSE BACK TO THE USER 

            //telling that cookie will expire in 8hours... expires

            res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)});
            res.send("Login Successfull")
        }
        else{
            throw new Error("Invalid credentials")
        }
    }

)

//PROFILE API
app.post('/profile',userAuth,async(req,res)=>{
    try{
    const user= req.user;
    if(!user){
        throw new Error("User not found")
    }
    res.send("The user which is logged in is : "+user)
    }
    catch(err){
        res.status(400).send("Something went wrong.."+err.message)
    }
})

//CONNECTION REQUEST API {Protected using userAuth}

app.post("/connectionRequest",userAuth,async(req,res)=>{

const user = req.user;
console.log("Sending a connection request")


res.send(user.firstName+ ": Send the connection request ")

})











connectDB().then(()=>{
    console.log("Database connection established")
    app.listen(port,()=>{
        console.log(`Dev-Tinder server is running on ${port}`)
    })
}).catch(err=>{
    console.log("Opps Something went wrong ")
})




