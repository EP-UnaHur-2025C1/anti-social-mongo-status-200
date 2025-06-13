const Post = require('../models/post');
const Comment = require('../models/comment');
const Tag = require('../models/tag')
const mongoose = require('mongoose');

const obtenerPosts = async (req, res) => {
    try {
        const users = await Post.find()
        .select('descripcion fecha -_id')
        .populate('user','nickName eMail -_id')
        .populate('tags', 'nombre -_id')
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}
const obtenerUnPost = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id)
        .select('descripcion fecha -_id')
        .populate('user','nickName eMail -_id')
        .populate('tags', 'nombre -_id')
        if(!post){
            return res.status(404).json({message: 'Publicacion no encontrada'})
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}
const modificarPost = async (req, res) => {
    try {
        const id = req.params.id
        const postModificado = await Post.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        if(!userModificado){
            return res.status(404).json({message: 'Publicacion no encontrada'})
        }
        res.status(200).json(userModificado)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}
const eliminarPost = async (req, res) => {
    try {
        const id = req.params.id
        const postEliminado = await Post.findByIdAndDelete()
        if (!postEliminado){
            return res.status(404).json({message: 'Publicacion no encontrada'})
        }
        await Comment.deleteMany({post: id })
        res.status(200).json({message: 'Publicacion eliminada exitosamente'})        
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}
const asociarTag = async (req, res) => {
    try {
        const postId = req.params.postId
        const post = await Post.findById(postId)
        if (!post){
            return res.status(404).json({message: 'Publicacion no encontrada'})
        }
        const tagId = req.params.tagId
        const tag = await Tag.findById(tagId)
        if(!tag){
            return res.status(404).json({message: 'Etiqueta no encontrada'})
        }
        if(post.tags.includes(idTag)){
            return res.status(400).json({message: 'La etiqueta ya esta asociada a la publicacion'})
        }
        post.tags.push(idTag)
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}
const obtenerComentariosDeUnPost = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id)
        .select('descripcion fecha -_id')
        .populate('user','nickName eMail -_id')
        .populate('tags', 'nombre -_id')
        if(!post){
            return res.status(404).json({message: 'Publicacion no encontrada'})
        }
        const comments = await Comment.find({post: id})
        .select('descripcion fecha visible -_id')
        .populate('user','nickName eMail -_id')
        res.status(200).json({post: post, comments: comments})
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

module.exports = {
    obtenerPosts,
    obtenerUnPost,
    modificarPost,
    eliminarPost,
    asociarTag,
    obtenerComentariosDeUnPost
}