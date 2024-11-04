const express = require('express')
const app = express();
const port =8000;
const connectDB =require("./config/database")

connectDB().then(()=>{
    console.log("Database connection established")
    app.listen(port,()=>{
        console.log(`Dev-Tinder server is running on ${port}`)
    })
}).catch(err=>{
    console.log("Opps Something went wrong ")
})




