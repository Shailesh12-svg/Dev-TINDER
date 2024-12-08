const jwt = require('jsonwebtoken');
const UserModel = require("../models/user")
//User Auth

const userAuth =async(req,res,next)=>{
    try{
   //1:- Read the token
    const cookies =  req.cookies;
    const {token} = cookies;

    if(!token){
        throw new Error("Hey token not present")
    }

   //2:- Validate it ...

    const decodedMessage = await jwt.verify(token,"DEV@TINDER$597");

    const {_id}= decodedMessage;
   //3 Find the user 

   const user = await UserModel.findById(_id);

   if(!user){
    throw new Error("User not exist")
   }
   else{
    req.user=user;
    next();
   }
 }
 catch(error){
    res.status(400).send("Something went wrong...")
 }
}

module.exports ={
    userAuth
}