const mongoose = require('mongoose');
require('dotenv').config()

const commentSchema = new mongoose.Schema({
    descripcion:{
        type: String,
        required: [true, "El comentario debe tener contenido"],
        minLength: [1, "El comentario no puede estar vacío"],
        maxlength: [300, "El comentario no puede exceder los 300 caracteres"]

    },
    fecha:{
        type: Date,
        required: [true, "El comentario debe tener una fecha"]
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "El comentario debe pertenecer a un usuario"]
    },
    post:{
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: [true, "El comentario debe pertenecer a una publicación"]
    }

}, {strict: false, toJSON: { virtuals: true }, id: false})

commentSchema.virtual('visible').get(function(){
    const fechaActual = new Date()
    const diferenciaEntreFechas = (fechaActual.getFullYear() - this.fecha.getFullYear() ) * 12 + (fechaActual.getMonth() - this.fecha.getMonth() )
    return(
        diferenciaEntreFechas < process.env.ANTIGUEDAD_MAXIMA_COMENTARIOS
    )
})

module.exports = mongoose.model('Comment', commentSchema)