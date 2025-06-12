const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {strict: false, timestamps: true})

module.exports = mongoose.model('Post', postSchema)