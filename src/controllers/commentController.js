const {Comment} = require('../models/index');
const mongoose = require('mongoose');

const obtenerUnComment = async (req, res) => {
    try {
        const id = req.params.id
        const comment = await Comment.findById(id)
        .select('descripcion fecha')
        .populate('user', 'nickName -_id')
        .populate('post', '_id')
        if(!comment){
            return res.status(404).json({message: 'Comentario no encontrado'})
        }
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const modificarComment = async (req, res) => {
    try {
        const id = req.params.id
        const {descripcion, fecha} = req.body
        const commentModificado = await Comment.findByIdAndUpdate(id,{
            $set: {descripcion: descripcion, fecha: fecha}
        },{
            new: true,
            runValidators: true
        })
        if(!commentModificado){
            return res.status(404).json({message: 'Comentario no encontrado'})
        }
        res.status(200).json(commentModificado)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}
const eliminarComment = async (req, res) => {
    try {
        const id = req.params.id
        const commentEliminado = await Comment.findByIdAndDelete(id)
        if(!commentEliminado){
            return res.status(404).json({message: 'Comentario no encontrado'})
        }
        res.status(200).json({message: 'Comentario eliminado exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

module.exports = {
    obtenerUnComment,
    modificarComment,
    eliminarComment
}