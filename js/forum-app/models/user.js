const mongoose = require('mongoose');
// const { Mongoose } = require("mongoose");
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 70
    },
    email: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 120
    }
})

const model = mongoose.model('user', schema);
module.exports = model;


