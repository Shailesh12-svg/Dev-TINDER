const express = require('express')
const app = express();
const port =8000;
const {adminAuth, userAuth} = require('./middlewares/auth')

// app.use('/',(req,res)=>{
//     res.send("It would handle all the requests")
// })

app.use('/admin',adminAuth)




//User
app.get('/user',userAuth,(req,res)=>{
    // res.send("Fetched user data successfully")
    throw new Error("sdsdshdbsbdsaj");
})

app.post('/user/login',(req,res)=>{
    res.send("User login successfully")
})



app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent...")  
})

app.get("/admin/deleteUser",(req,res)=>{
    //Logic of fetching all data
    res.send("Deleted a User...")
})








//this will match all get method to /user
app.get("/user",(req,res)=>{
    res.send({
        firstName:"Shailesh",
        lastName:"Mallick",
        city:"Bangalore",
        phone:39393030
    })
})

//POST REQUESTS
app.post("/user",(req,res)=>{
    console.log("Saved Data to the database");
    res.send("Data successfully saved to the database")
})

//DELETE REQUESTS
app.delete("/user",(req,res)=>{
    res.send("Data got deleted...")
})


app.get("/user1",(req,res,next)=>{
    // res.send(`Handling the route user 1`)
    next();
    // res.send("Hello")
},
app.get("/user1",(req,res)=>{
    res.send("Hello1234")
})
);


//Error handling

app.use('/',(err,req,res,next)=>{
    if(err){
        //Log the errors for ourselves..
        res.status(500).send("Something went wrong Please try again later....")
    }
})

app.listen(port,()=>{
    console.log(`Dev-Tinder server is running on ${port}`)
})