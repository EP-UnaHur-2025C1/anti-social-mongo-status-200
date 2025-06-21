const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nickName:{
        type: String,
        unique: true,
        required: [true, "El nombre de usuario es obligatorio"],
        minlength: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
        maxlength: [20, "El nombre de usuario no puede exceder los 20 caracteres"]
    },
    eMail:{
        type: String,
        required: [true, "La dirección de correo electrónico es obligatoria"],
        match: [/.+\@.+\..+/, "La dirección de correo electrónico no es valida"]
    },
    followers:[{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    follows:[{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }]
}, {strict: false})

module.exports = mongoose.model('User', userSchema)