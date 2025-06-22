const { Post, Comment, Tag, Post_Image } = require('../models/index');
const mongoose = require('mongoose');

const obtenerPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .select('descripcion fecha ')
            .populate('user', 'nickName -_id')
            .populate('tags', 'nombre')
        if (!posts) {
            return res.status(404).json({ message: 'Publicaciones no encontradas' })
        }
        res.status(200).json(posts)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}
const obtenerUnPost = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id)
            .select('descripcion fecha ')
            .populate('user', 'nickName -_id')
            .populate('tags', 'nombre')
        res.status(200).json(post)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al obtener la publicación' })
    }
}
const modificarPost = async (req, res) => {
    try {
        const id = req.params.id
        const descripcionActualizada = {};
        if (!req.body.descripcion) {
            return res.status(400).json({ message: 'Descripción no agregada' })
        }
        descripcionActualizada.descripcion = req.body.descripcion;
        const postModificado = await Post.findByIdAndUpdate(id, descripcionActualizada, {
            new: true,
            runValidators: true
        })
        res.status(200).json(postModificado)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al modificar la publicación' })
    }
}
const eliminarPost = async (req, res) => {
    try {
        const id = req.params.id
        const postEliminado = await Post.findByIdAndDelete(id)
        await Comment.deleteMany({ post: id })
        await Post_Image.deleteMany({ post: id })
        res.status(200).json({ message: 'Publicación eliminada exitosamente' })
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al eliminar la publicación' })
    }
}
const asociarTag = async (req, res) => {
    const postId = req.params.postId
    const tagId = req.params.tagId
    try {
        const post = await Post.findById(postId)
        const tag = await Tag.findById(tagId)
        post.tags.push(tagId)
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al asociar la etiqueta' })
    }
}
const obtenerComentariosDeUnPost = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id)
        const comments = await Comment.find({ post: id })
            .select('descripcion fecha visible -_id')
            .populate('user', 'nickName -_id')
        res.status(200).json(comments)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al obtener comentarios de una publicación' })
    }
}

const obtenerComentariosRecientesDeUnPost = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id)
        const comments = await Comment.find({ post: id })
            .select('descripcion fecha visible -_id')
            .populate('user', 'nickName -_id')
        const commentsRecientes = comments.filter(comment => comment.visible === true);

        res.status(200).json(commentsRecientes)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al obtener comentarios recientes de un post' })
    }
}

const obtenerTags = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id).populate('tags');
        const tags = post.tags
        res.status(200).json(tags)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al obtener las etiquetas' })
    }
}

const obtenerPostImages = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        const postImages = await Post_Image.find({ post: postId })
            .select('url');

        res.status(200).json(postImages);

    } catch (error) {
        console.error("Error al obtener las imágenes de la publicación:", error);
        res.status(400).json({ error: 'Error al obtener imágenes.', details: error.message });
    }
}

module.exports = {
    obtenerPosts,
    obtenerUnPost,
    modificarPost,
    eliminarPost,
    asociarTag,
    obtenerComentariosDeUnPost,
    obtenerComentariosRecientesDeUnPost,
    obtenerTags,
    obtenerPostImages
}