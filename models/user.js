const mongoose=require('mongoose');

const Schema =mongoose.Schema;

const userSchema=new Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String,unique:true},
    password:{type:String,required:true},
    createdAt:{type:Number,default:Date.now().valueOf()}
})

module.exports=mongoose.model('registration',userSchema);