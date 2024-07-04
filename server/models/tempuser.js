const mongoose = require('mongoose');
require('../config/dbConfig');
const TempUserSchema = new mongoose.Schema(
    {
        username: String,
        name: String,
        password: String,
    }
);

const TempUserModel = mongoose.model("TempUser", TempUserSchema);

module.exports = TempUserModel;