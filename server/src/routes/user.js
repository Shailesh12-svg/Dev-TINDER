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

userRouter.get('/user/connections',userAuth,async(req,res)=>{
    try{
    const loggedInUser =req.user;

    const connectionRequest = await ConnectionRequest.find({
        $or:[
            {fromUserId:loggedInUser,status:"accepted"},
            {toUserId:loggedInUser,status:"accepted"}
        ]
    }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about"])

    const data =connectionRequest.map((row)=>{
        if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
            return row.toUserId;
        }else{
            return row.fromUserId;
        }
    })

    res.json({data})
}catch(err){
    res.status(400).json({message:"Oops no connections found"})
}
    
})

module.exports = userRouter;