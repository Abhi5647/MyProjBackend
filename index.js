const bodyParser= require('body-parser');
const express=require('express');
const app= express();
const mongoose=require('mongoose');
const authRoute=require('./routes/auth-route');
const cors=require('cors')
mongoose.connect('mongodb://localhost:27017/MyProjectDb',
  (err)=>{
    if(err){
        console.log("Problem connecting Mongoose")
    }else{
        console.log(" connected to Mongoose")

    }
  }
);
//parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended:false}));

//parse application/json
app.use(bodyParser.json());

app.use(cors());

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use('',authRoute);


app.listen(3000,()=>{
    console.log('server is connected at 3000');
})