const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    descripcion:{
        type: String,
        required: true,
        minLenght: 1
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    post:{
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: true
    }

}, {strict: false, timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)