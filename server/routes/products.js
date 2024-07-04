const express = require('express');
const router = express.Router();

const passport = require('passport');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

require('dotenv').config();
require('../config/passport')
router.use(passport.initialize());

const ItemModel = require('../models/items');
const BidsModel = require('../models/bids');


router.get('/:id', passport.authenticate('jwt', {session: false}), async (req,res)=>{
    const user1 = req.user;
    user1['password'] = "";
    await ItemModel.findById(req.params.id).then(async item => {
        const data = {
            item : item,
            user : user1
        }
        await BidsModel.find({ productID: req.params.id }).then(bids =>{
            data['bids'] = bids;
            res.send(data);
        })
        // console.log(item);
        // res.send(data);

    })
});

router.delete('/:id', async (req,res)=>{
        // console.log();
        // 64ad01740c49e7bd9b2fc680
        ItemModel.updateOne({_id: req.params.id}, { sold: true }).then(()=>{
            const data = {
                status : "Success",
                message : "Item deleted successfully"
            }
            res.send(data);
        }).catch(err => {
            const data = {
                status : "failed",
                message : "Item not deleted"
            }
            res.send(data);
        });

    // await ItemModel.findById(req.params.id).then(item =>{
    //     console.log(req.params.id);
    //     // console.log(result);
    //     item['sold'] = true;
    //     item.overwrite({ sold: true });
    //     item['sold'] = true;
    //     item.save().then(()=> {
    //         console.log("item is saved");
    //         const data = {
    //             status : "Success",
    //             message : "Item deleted successfully"
    //         }
    //         res.send(data);
    //     }).catch(err => {
    //         console.log("not saved");
    //         const data = {
    //             status : "failed",
    //             message : "Item not deleted"
    //         }
    //         res.send(data);
    //     });
    //     console.log("Saveddd/n/n/n/nn//n/nn/n/n/n/\n\n\nn\n\n\n\n");
    //     console.log(item);
    //     // console.log(item['sold']);
    // }).catch(err => {
    //     console.log(err);
    //     const data = {
    //         status : "failed",
    //         message: "Couldn't delete Item"
    //     }
    //     res.send(data);
    // });
});

// router.get('/bids/:id', async(req,res)=>{
//     const prodID = req.params.id;
//     await BidsModel.find({productID: prodID}).then(bids => {

//     }).catch
// })

module.exports = router;