const express = require('express')
const app = express();
const port =8000;



app.get('/dashboard',(req,res)=>{
    res.send('<h1>Hello from the Dev-Tinder Dashboard</h1>')
})

app.get('/',(req,res)=>{
    res.end("<h1>Hello fron the Dev-Tinder Homepage</h1>")
})

app.use((req,res)=>{
    res.send('Hello from the server')
})


app.listen(port,()=>{
    console.log(`Dev-Tinder server is running on ${port}`)
})