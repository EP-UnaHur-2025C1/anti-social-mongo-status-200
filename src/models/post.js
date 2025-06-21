const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: [true, "La publicación debe tener una descripción"],
        minlength: [5, "La descripción de la publicación debe tener al menos 5 caracteres"],
        maxlength: [300, "La descripción de la publicación no puede exceder 300 caracteres"]
    },
    fecha:{
        type: Date,
        required: [true, "La publicación debe tener una fecha"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "La publicación debe pertenecer a un usuario"],
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Tag'
    }]
}, {strict: false})

module.exports = mongoose.model('Post', postSchema)