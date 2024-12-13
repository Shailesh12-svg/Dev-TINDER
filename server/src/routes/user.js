const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

const userRouter = express.Router();

userRouter.get('/user/requests/received',userAuth,async (req,res)=>{
    try{
    const loggedInUser = req.user;

    //LOGIC

    const connectionRequest = await ConnectionRequest.find({
        toUserId:loggedInUser,
        status :"interested",
    
    }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about"])

    if(!connectionRequest){
        res.status(400).json({message:"No conncetion request there..."})
    }else{
        res.status(200).json({message:"Pending connection requests: ",connectionRequest})
    }
 }catch(err){
    res.status(400).json({
        message:"Connection request not found.."+err.message
    })
 }
})

module.exports = userRouter;