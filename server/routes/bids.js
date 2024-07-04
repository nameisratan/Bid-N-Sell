const express = require('express');
const router = express.Router();

const BidsModel = require('../models/bids');
const itemsModel = require('../models/items');

const passport = require('passport');
require('../config/passport');


router.post('/upload', async (req,res)=>{
    // const data = {
    //     username: req.user.username,
    //     name: req.user.name,
    //     id: req.user._id,
    //     email: req.user.email
    // }
    // res.send(data);
    const bid = new BidsModel(req.body);
    bid.save().then(()=>{
        res.status(200).json(
            {
                message: "success",
                data: "Bid Placed"
            }
    )}).catch(err => {
        res.status(200).json(
        {
            message: "failed",
            data: "Bid not placed, something wrong from our side"
        }
    )})
});

router.get('/user', passport.authenticate('jwt', {session: false}), async (req,res)=>{
    const bidDetails = [];
        // product photo in item
        // product name in item
        // seller details in item
        // offered price in item
        // your bid in bid
        // placed on in bid
    await BidsModel.find({bidderID: req.user._id}).then(bids=> {
        var x = 0;
        bids.forEach(async (bid) => {
            // console.log(bid.productID);
            await itemsModel.findById(bid.productID).then(item => {
                // if(item)
                // else
                // {}
                const biddetail = {
                    itemID : bid.productID,
                    photoURL : item.imageURL[0],
                    productName: item.name,
                    sellerDetails: {
                        sellername: item.ownerName,
                        sellerEmail: item.ownerEmail
                    },
                    offeredPrice: item.cost,
                    bidPrice: bid.price,
                    placedOn: bid.biddedOn,
                    message: bid.message
                }
                if(item.sold)
                {
                    biddetail['status'] = "sold";
                }
                else
                {
                    biddetail['status'] = "Unsold";
                }
                bidDetails.push(biddetail);
                x++;
                if(x === bids.length)
                {
                    res.send(bidDetails)
                }
                // console.log(bidDetails);
            }).catch(err => {
                console.log(err);
            });
            // console.log(143, bid);
        })
    }).catch(err => console.log(err))
    // console.log(bidDetails);
});

// router.get('/:id', async(req,res) => {
//     const prodID = req.params.id;
//     await BidsModel.find({productID: prodID}).then(res => {
        // console.log(res);
//     })
// });


module.exports = router;