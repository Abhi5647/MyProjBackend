const bodyParser= require('body-parser');
const express=require('express');
const app= express();
const mongoose=require('mongoose');
const authRoute=require('./routes/auth-route');
const cors=require('cors')
var localconnection='mongodb://localhost:27017/MyProjectDb';
  
//parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended:false}));

//parse application/json
app.use(bodyParser.json());

app.use(cors());

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use('',authRoute);


app.listen(3000,async()=>{
    await mongoose.connect('mongodb+srv://myselfabhi56:123@cluster0.yowfxha.mongodb.net/MyProjectDb?retryWrites=true&w=majority')
    .then((res)=>console.log("connected"))
    .catch((err)=>console.log("error connecting mongodb"))
})