const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const ItemModel = require('../models/items');
require('dotenv').config();
require('../config/passport')
router.use(passport.initialize());

router.get('/', passport.authenticate('jwt', {session: false}), async (req,res) =>{
    var items_useful = [];
    await ItemModel.find().then(async (items_info)=>{
        // items_useful = item;
        // console.log(items_info);

        items_info.forEach((item_info)=>{
            if(item_info["sold"]) return;
            var item_useful = {};
            item_useful["name"] = item_info["name"];
            item_useful["cost"] = item_info["cost"];
            item_useful["description"] = item_info["description"].substring(1,20);
            if (item_info["description"].length > 20) {
                item_useful["description"] += "...";
            }
            item_useful["link"] = item_info["imageURL"];
            
            item_useful["category"] = item_info["category"];
            item_useful["age"] = item_info["age"];
            
            item_useful["id"] = item_info._id;
            items_useful.push(item_useful);
        })
        // console.log(items_useful);
    });

    // console.log(req.user.username);
    res.status(200).json({
        success: true,
        username: req.user.name,
        items: items_useful,
    })
});

module.exports = router;