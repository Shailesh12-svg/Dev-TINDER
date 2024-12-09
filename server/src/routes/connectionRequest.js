const express = require('express')
const {userAuth} = require("../middlewares/auth");
const connectionRequestRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest')
const UserModel = require('../models/user')
//CONNECTION REQUEST API {Protected using userAuth}

connectionRequestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

    try{

        //first thing to get the LoggedIn user object id ..
        
        const fromUserId =req.user._id;

        //To get me the toUserId  ...
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        //3rd Problem validate the toUserId
        // Ky kro ki joh toUserId ky woh database exist krta hai ye dekh lo simple

        const isToUserIdValid = await UserModel.findById(toUserId)

        if(!isToUserIdValid){
           return res.status(400).json({
                message:"The toUser does not exist in the database"
            })
        }



        const allowedStatus = ['ignored','interested'];
        //1st problem
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"Invalid status type"
            })
        }
       
        const connection = new ConnectionRequest({
            fromUserId,toUserId,status
        })

        //2nd problem existing connection request

        const existingConnectionRequest = await ConnectionRequest.findOne({
            //USE DIMAG 

            $or:[
                 //{fromUserId,fromUserId}, // a-> a same connection bug
                {fromUserId,toUserId}, //a->b again
                {fromUserId:toUserId,toUserId:fromUserId} //b->a reverse
            ],
        });

        if(existingConnectionRequest){
            return res.status(400).json({message:"Connection request already exist.."})
        }

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