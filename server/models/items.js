const mongoose = require('mongoose');
require('../config/dbConfig');

const itemsSchema = new mongoose.Schema({
    name : String,
    description: String,
    category: String,
    cost: Number,
    ownerID: String,
    ownerName: String,
    ownerEmail: String,
    buyYear: Number,
    warranty: Boolean,
    age: String,
    placedOn: String,
    sold: Boolean,
    // bids: [{
    //     bidCost: Number,
    //     message: String,
    //     buyerID: String
    // }],
    showBids :Boolean,
    imageURL: [String]
});

const ItemModel = mongoose.model('Item', itemsSchema);

module.exports = ItemModel;