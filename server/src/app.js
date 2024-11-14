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




connectDB().then(()=>{
    console.log("Database connection established")
    app.listen(port,()=>{
        console.log(`Dev-Tinder server is running on ${port}`)
    })
}).catch(err=>{
    console.log("Opps Something went wrong ")
})




