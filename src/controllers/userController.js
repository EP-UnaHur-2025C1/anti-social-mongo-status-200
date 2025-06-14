const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const mongoose = require('mongoose');

const crearUser = async (req, res) => {
    try {
        const nuevoUser = new User(req.body)
        await nuevoUser.save()
        res.status(201).json(nuevoUser)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor', trace: error.message})
    }
}

const obtenerUsers = async (req, res) => {
    try {
        const users = await User.find().select('nickName eMail -_id')
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const obtenerUnUser = async (req, res) => {
    try {
        const nickName = req.params.nickName
        const user = await User.findOne({nickName: nickName}).select('nickName eMail -_id')
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const modificarUser = async (req, res) => {
    try {
        const nickName = req.params.nickName
        const userModificado = await User.findOneAndUpdate({nickName: nickName}, {
            $set: {eMail: req.body.eMail}
        }, {
            new: true,
            runValidators: true
        })
        .select('nickName eMail -_id')
        if(!userModificado){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        res.status(200).json(userModificado)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const eliminarUser = async (req, res) => {
    try {
        const nickName = req.params.nickName
        const userEliminado = await User.findOneAndDelete({nickName: nickName})
        if (!userEliminado){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        await Post.deleteMany({nickName: nickName})
        await Comment.deleteMany({nickName: nickName})
        res.status(200).json({message: 'Usuario eliminado exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const obtenerPostsDeUnUser = async (req, res) => {
    try {
        const nickName = req.params.nickName
        const user = await User.findOne({nickName: nickName}).select('nickName eMail _id')
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        const posts = await Post.find({user: user._id}).select('descripcion fecha tags')
        res.status(200).json({posts: posts})
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const crearPost = async (req, res) => {
    try {
        const nickName = req.params.nickName
        const {descripcion, fecha} = req.body
        const user = await User.findOne({nickName: nickName})
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        const userId = user._id.toString()
        const nuevoPost = new Post({
            descripcion: descripcion,
            fecha: fecha,
            user: userId
        })
        await nuevoPost.save()
        res.status(201).json(nuevoPost)
    } catch (error) {
        res.status(500).json({message: 'Error interno del servidor', trace: error.message})
    }
}

const comentarPost = async (req, res) => {
    try {
        const nickName = req.params.nickName
        const postId = req.params.postId
        const {descripcion, fecha} = req.body
        const user = await User.findOne({nickName: nickName})
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        const userId = user._id.toString()
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({message: 'Publicacion no encontrada'})
        }
        const nuevoComment = new Comment({
            descripcion: descripcion,
            fecha: fecha,
            user: userId,
            post: postId
        })
        await nuevoComment.save()
        res.status(201).json(nuevoComment)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

module.exports = {
    crearUser,
    obtenerUsers,
    obtenerUnUser,
    modificarUser,
    eliminarUser,
    obtenerPostsDeUnUser,
    crearPost,
    comentarPost
}


