const mongoose = require('mongoose');

const post_imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: true
    }
},{strict: false})

module.exports = mongoose.model('Post_image', post_imageSchema)