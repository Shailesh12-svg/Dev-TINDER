const express = require('express')
const {userAuth} = require("../middlewares/auth");
const connectionRequestRouter = express.Router();


//CONNECTION REQUEST API {Protected using userAuth}

connectionRequestRouter.post("/connectionRequest",userAuth,async(req,res)=>{

    const user = req.user;
    console.log("Sending a connection request")
    
    
    res.send(user.firstName+ ": Send the connection request ")
    
    })

module.exports=connectionRequestRouter;