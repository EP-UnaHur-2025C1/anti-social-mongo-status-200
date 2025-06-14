const Tag = require('../models/tag');
const Post = require('../models/post')
const mongoose = require('mongoose');

const crearTag = async (req, res) => {
    try {
        const nuevoTag = new Tag(req.body)
        await nuevoTag.save()
        res.status(201).json(nuevoTag)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor', e: error.message})
    }
}

const obtenerTags = async (req, res) => {
    try {
        const tags = await Tag.find().select('nombre')
        res.status(200).json(tags)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const obtenerUnTag = async (req, res) => {
    try {
        const id = req.params.id
        const tag = await Tag.findById(id).select('nombre')
        if(!tag){
            return res.status(404).json({message: 'Etiqueta no encontrada'})
        }
        res.status(200).json(tag)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const obtenerPostsConUnTag = async (req, res) => {
    try {
        const id = req.params.id
        const tag = await Tag.findById(id)
        if(!tag){
            return res.status(404).json({message: 'Etiqueta no encontrada'})
        }
        const posts = await Post.find({tags: id}).select('descripcion fecha user')
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({error: 'Error interno del serviddor', e: error.message})
    }
}

const modificarTag = async (req, res) => {
    try {
        const id = req.params.id
        const tagModificada = await Tag.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        if(!tagModificada){
            return res.status(404).json({message: 'Etiqueta no encontrada'})
        }
        res.status(200).json(tagModificada)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const eliminarTag = async (req, res) => {
    try {
        const id = req.params.id
        const tagEliminada = await Tag.findByIdAndDelete(id)
        if(!tagEliminada){
            return res.status(404).json({message: 'Etiqueta no encontrada'})
        }
        res.status(200).json({message: "Etiqueta eliminada exitosamente"})
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

module.exports = {
    crearTag,
    obtenerTags,
    obtenerUnTag,
    obtenerPostsConUnTag,
    modificarTag,
    eliminarTag
}