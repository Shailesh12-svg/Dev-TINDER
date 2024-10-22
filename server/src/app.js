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


app.use("/user1",[(req,res,next)=>{
    // res.send(`Handling the route user 1`)
    next();
    // res.send("Hello")
},
    (req,res)=>{
        console.log("2nd Route handler")
        res.send('confused')
    },
    (req,res)=>{
        console.log("3rd Route handler")
        res.send('confused yr ')
    },
    (req,res)=>{
        console.log("4th Route handler")
        res.send('confused hun')
    }]
);

app.listen(port,()=>{
    console.log(`Dev-Tinder server is running on ${port}`)
})