const express = require('express')
const {userAuth} = require("../middlewares/auth");
const connectionRequestRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest')

//CONNECTION REQUEST API {Protected using userAuth}

connectionRequestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

    try{

        //first thing to get the LoggedIn user object id ..
        
        const fromUserId =req.user._id;

        //To get me the toUserId  ...
        const toUserId = req.params.toUserId;
        const status = req.params.status;
       
        const connection = new ConnectionRequest({
            fromUserId,toUserId,status
        })
        
        const final = await connection.save();

        if(final){
            res.json({
                message:"Connection request send successfully",
                final,
            })
        }


    }catch(err){
        res.status(400).send("ERROR ...."+err.message);
    }

    })

module.exports=connectionRequestRouter;