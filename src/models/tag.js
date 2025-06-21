const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "El nombre de la etiqueta es obligatorio"],
        minlength: [3, "El nombre de la etiqueta debe tener al menos 3 caracteres"],
        maxlength: [20, "El nombre de la etiqueta no puede exceder los 20 caracteres"]
    }
},{strict:true})

tagSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'tags'
})

module.exports = mongoose.model('Tag', tagSchema)