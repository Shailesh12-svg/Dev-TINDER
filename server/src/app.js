const express = require('express')
const app = express();
const port =8000;

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

app.listen(port,()=>{
    console.log(`Dev-Tinder server is running on ${port}`)
})