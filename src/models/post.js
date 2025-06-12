const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Tag'
    }]
}, {strict: false})

module.exports = mongoose.model('Post', postSchema)