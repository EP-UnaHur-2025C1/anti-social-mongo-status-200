const mongoose = require('mongoose');

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

}, {strict: false})

commentSchema.virtual('visible').get(()=>{
    const fechaActual = new Date()
    return(
        (this.fecha.getFullYear() - fechaActual.getFullYear()) * 12 + ( this.fecha.getMonth() - fechaActual.getMonth()) 
        > process.env.ANTIGUEDAD_MAXIMA_COMENTARIOS
    )
})

module.exports = mongoose.model('Comment', commentSchema)