const mongoose = require('mongoose');
require('../config/dbConfig');
const UserSchema = new mongoose.Schema(
    {
        username: String,
        name: String,
        password: String
    }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;