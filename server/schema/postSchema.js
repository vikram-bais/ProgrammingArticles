const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    article: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: false
    },
    createdDate: {
        type: Date,
    },
})

// 
module.exports = mongoose.model('post', postSchema);