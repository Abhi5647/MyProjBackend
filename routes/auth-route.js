const bcrypt = require('bcrypt');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { application } = require('express');
const cheakAuth =require('./../middleware/cheak-auth');
const registration = require('../models/user');

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.json({ status: false, message: "Hashing issue" })
    } else {
      const user = new registration({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        password: hash,
      })

      user.save()
        .then((_) => {
          res.json({ success: true, message: "Account  created" })
        })
        .catch((err) => {
          if (err.code === 11000) {
            return res.json({ success: false, message: "Email already Exist" });
          }
          res.json({ success: false, message: "Problem creating Account" })
        })
    }
  })
})

//for login routing   
router.post('/login', (req, res) => {
  registration.find({ email: req.body.email })
    .exec()
    .then((result) => {
      if (result < 1) {
        return res.json({ success: false, message: "user not found" })
      }
      const user = result[0];
      
      bcrypt.compare(req.body.password, user.password, (err, rest) => {
        const payload = {
          userId: user._id  
        }
        const token = jwt.sign(payload, "webBatch")
        if (rest) {
          return res.json({ success: true, token: token, message: "Login Successful" })
        } else {
          return res.json({ success: false, message: "Password do not Matched" })
        }
      })
    }).catch(err => {
      res.json({ success: false, message: "Auth Failed" })
    })
})
///verifying the token 

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'webBatch');
    req.userData=decoded;
    next();
  }
  catch(ex){
    console.log("Failed to verify in VerifyToken");
    res.json({sucess:false,data:"Authentication Failed in verifytoken"})
  }
}



//main content routing 
router.get('/main',verifyToken,(req, res) => {
  console.log("main");
 const userId=req.userData.userId;
 console.log(userId);
 registration.findById(userId)
 .exec()
 .then((result)=>{
  
   res.json({success:true,data:result})
   console.log(result)
 })
 .catch(err=>{
  res.json({sucess:false,data:"Server Error"})
 })
})

module.exports = router;