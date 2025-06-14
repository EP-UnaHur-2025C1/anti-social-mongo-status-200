const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    }
},{strict:true})

tagSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'tags'
})

module.exports = mongoose.model('Tag', tagSchema)