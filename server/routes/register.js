const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const TempUserModel = require('../models/tempuser');
const nodemailer = require('nodemailer');
const axios = require('axios');
const jwt = require('jsonwebtoken');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

require('dotenv').config();

const transporter= nodemailer.createTransport({
   service:"gmail",
   auth:{
        user: process.env.EMAIL_ID,
      //  user:"buynow276@gmail.com",
       pass:process.env.EMAIL_PASS
   }
  //  console.log(auth);
});

const generateConfirmationToken = (userId) => {
  const payload = {
    userId: userId,
  };

  const expiration = '1h';

  const token = jwt.sign(payload, "tokensecret", { expiresIn: expiration });

  return token;
};

router.post('/', async (req,res)=>{
    // console.log("Register function");
    await UserModel.findOne({username: req.body.username}).then(async (user)=>{
        if(user){
            return res.status(200).json(
            {
                success: false,
                message: "User Already exists" 
            })
        }
        const newUser = new TempUserModel({
          username : req.body.username,
          name: req.body.name,
          password : await bcrypt.hash(req.body.password, 10)
        })
        newUser.save().then(user => {
          const info={
            from:"buynow276@gmail.com",
            subject:"BuyNow - Email Confirmation"
          }
          const token = generateConfirmationToken(user._id);
          info['to'] = user.username;
          info['text'] = `Hello ${user.name}. \nYour Email was provided for registration on BuyNow and you were successfully registered.\n
          To confirm your email please follow the link. \ ${process.env.FRONTEND_URL}/confirm/${token}.`
          // console.log(transporter);
          transporter.sendMail(info,(err,result)=>{
            if(err){
                console.log("Error in sending Mail",err);
            }
            else{
              return res.status(200).json({
                    success: true,
                    message : "Email Sent Sucessfully"
                })
            }
          })
            
          
        })
        .catch(err => {
            return res.status(401).json({
                success: false,
                message : "Something Error Occured! User Not registered" ,
            })
        })
    })
});

router.post('/:jwt', async(req,res)=>{
    const jwtt = req.params.jwt;
    // var objID = jwt.verify(jwt, "tokensecret");
    const objID = jwt.decode(jwtt);
    await TempUserModel.findById(objID.userId).then(tempUser => {
      const user = new UserModel({
        username: tempUser.username,
        name: tempUser.name,
        password: tempUser.password
      });
      user.save().then(()=>{
        res.send({status: "success", data: "Saved"});
      }).catch(err=> {
        console.log(err);
      })
    })
});

module.exports = router;