const mongoose = require('mongoose');

const post_imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "Es necesario especificar la URL de la imagen"]
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: [true, "Es necesario indicar la publicación a la que pertenece la imagen"]
    }
},{strict: false})

module.exports = mongoose.model('Post_image', post_imageSchema)