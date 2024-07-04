const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

require('dotenv').config();

router.post('/', async (req,res)=>{
    // console.log("Login function");
    await UserModel.findOne({username : req.body.username}).then(async (user) => {
        // console.log(1, user);
        if(!user)
        {
            return res.status(200).json({
                success: false,
                message: "No user"
            })
        }
        if(!bcrypt.compareSync(req.body.password, user.password))
        {
            return res.status(200).json({
                success: false,
                message: "Incorrect Password"
            })
        }
        const payload = {
            username: user.username,
            id: user._id
        }
        // console.log(2, payload);
        const token = await jwt.sign(payload, process.env.PASSPORT_SECRET,{expiresIn : "1d"})
        return res.status(200).json({
            success: true,
            message: "Logged IN",
            token: "Bearer "+token
        });
    })
    .catch((err) => {
        res.status(401).json({
            success: false,
            message : "Something Error Occured! User Not Logged In",
        })
    })
});

module.exports = router;