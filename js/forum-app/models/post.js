const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true
    },
    content: {
        type: String,
        minLength: 20,
        maxLength: 100,
        required: true
    },
    anonymousViewCount: {
        type: Number,
        default: 0,
        required: true
    },
    viewsCount: {
        type: Number,
        default: 0,
        required: true
    },
    commentsCount: {
        type: Number,
        default: 0,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    likesCount: {
        type: Number,
        default: 0,
        required: true
    },
    dislikesCount: {
        type: Number,
        default: 0,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true
    },
    tags: {
        type: Array,
        default: [],
        required: true
    },
    images: {
        type: Array,
        default: [],
        required: true
    }
})

const model = mongoose.model( 'post', schema );
module.exports = model;



















