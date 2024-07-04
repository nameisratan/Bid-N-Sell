const mongoose = require('mongoose');
require('../config/dbConfig');

const bidsSchema = new mongoose.Schema({
    productID : String,
    bidderID: String,
    bidderName: String,
    price: Number,
    message: String,
    biddedOn: String,
    bidderMobileNumber: Number
});

const BidsModel = mongoose.model('Bid', bidsSchema);

module.exports = BidsModel;