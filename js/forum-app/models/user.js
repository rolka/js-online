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
    },
    password: {
        type: String,
        required: true
    },
    salt: String,
    DOB: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    postsCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }

})

const model = mongoose.model('user', schema);
module.exports = model;


