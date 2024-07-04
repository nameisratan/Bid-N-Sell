const express = require('express');
const router = express.Router();

const passport = require('passport');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

require('dotenv').config();
require('../config/passport')
router.use(passport.initialize());

const UserModel = require('../models/user');
const ItemModel = require('../models/items');

router.get('/products', passport.authenticate('jwt', {session: false}), async (req,res)=>{
    // console.log(89898989, req.user);
    await ItemModel.find({ownerID: req.user._id}).then(items => {
        // console.log("Nen Ammina Items............");
        // console.log(items);
        res.send(items);
    }).catch(err => console.log(err))
});

router.get('/:id', passport.authenticate('jwt', {session: false}), async (req,res)=>{
    await UserModel.findById(req.params.id).then(owner => {
        const data = {
            ownerName : owner.name,
            ownerEmail: owner.email
        }
        res.send(data);
    })
});


module.exports = router;