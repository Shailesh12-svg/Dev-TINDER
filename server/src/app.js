//Server

const express = require('express')
const app = express();

const port =8000;

app.get('/',(req,res)=>{
    res.status(200).json({message:'Hello From Dev Tinder !'})
})

app.listen(port,()=>{
    console.log(`App running on ${port}`)
})