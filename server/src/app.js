const express = require('express')
const app = express();
const port =8000;
const connectDB =require("./config/database")
const UserModel = require('./models/user')


app.use(express.json()); //for parsing the JSON OBJECTS

//API
app.post('/signup',async(req,res)=>{

    const user = new UserModel(req.body)
    try{
    await user.save()

    res.send("User Added successfully in our database")
    }
    catch(err){
        res.status(400).send("Error in adding user to the database")
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
         
        const user =await UserModel.findByIdAndUpdate({_id:userId},userData,{
            returnDocument:"before"
        });
        console.log(user)
        res.send("User updated successfully")

    }catch(err){
        res.status(400).send("Something went wrong")
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




