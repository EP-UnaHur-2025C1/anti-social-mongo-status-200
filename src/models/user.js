const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nickName:{
        type: String,
        unique: true,
        required: [true, "El nombre de usuario es obligatorio"]
    },
    eMail:{
        type: String,
        required: [true, "La direccion de correo electronico es obligatoria"],
        match: [/.+\@.+\..+/, "La direccion de correo electronico no es valida"]
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