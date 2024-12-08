const express = require('express')
const {userAuth} = require("../middlewares/auth")
const profileRouter = express.Router();


//PROFILE API
profileRouter.post('/profile',userAuth,async(req,res)=>{
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


module.exports =profileRouter;