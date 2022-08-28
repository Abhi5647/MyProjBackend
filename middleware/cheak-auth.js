const jwt = require('jsonwebtoken');

async function checkAuth(req,res,next){
   try{
   const token= await req.headers.authorization//.split(".")[1];
   console.log(token);
   jwt.verify(token,"webBatch")
   next();
   
   }catch(error){
    res.json({success:false,message:"Authentication Failed in CheakAuth"})
   }
}

module.exports= checkAuth; 