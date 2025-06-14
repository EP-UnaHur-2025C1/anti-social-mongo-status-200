const mongoose = require('mongoose');
require('dotenv').config()

const commentSchema = new mongoose.Schema({
    descripcion:{
        type: String,
        required: true,
        minLenght: 1
    },
    fecha:{
        type: Date,
        required: true
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

}, {strict: false, toJSON: { virtuals: true }, id: false})

commentSchema.virtual('visible').get(function(){
    const fechaActual = new Date()
    const diferenciaEntreFechas = (fechaActual.getFullYear() - this.fecha.getFullYear() ) * 12 + (fechaActual.getMonth() - this.fecha.getMonth() )
    return(
        diferenciaEntreFechas < process.env.ANTIGUEDAD_MAXIMA_COMENTARIOS
    )
})

module.exports = mongoose.model('Comment', commentSchema)