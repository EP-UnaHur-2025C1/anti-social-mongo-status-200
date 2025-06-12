const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nickName:{
        type: String,
        unique: true,
        required: true
    },
    eMail:{
        type: String,
        required: true
    }
}, {strict: false})

module.exports = mongoose.model('User', userSchema)