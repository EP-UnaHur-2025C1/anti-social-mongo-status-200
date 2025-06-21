const {Comment} = require('../models/index');

const obtenerUnComment = async (req, res) => {
    const id = req.params.id
    try {
        const comment = await Comment.findById(id)
        .select('descripcion fecha')
        .populate('user', 'nickName -_id')
        .populate('post', '_id')
        res.status(200).json(comment)
    } catch (error) {
        console.error(error);
        res.status(400).json({error: 'Error al obtener comentario'})
    }
}

const modificarComment = async (req, res) => {
    const id = req.params.id
    const {descripcion, fecha} = req.body
    try {
        const commentModificado = await Comment.findByIdAndUpdate(id,{
            $set: {descripcion: descripcion, fecha: fecha}
        },{
            new: true,
            runValidators: true
        })
        res.status(200).json(commentModificado)
    } catch (error) {
        console.error(error);
        res.status(400).json({error: 'Error al modificar comentario'})
    }
}
const eliminarComment = async (req, res) => {
    try {
        const id = req.params.id
        const commentEliminado = await Comment.findByIdAndDelete(id)
        res.status(200).json({message: 'Comentario eliminado exitosamente'})
    } catch (error) {
        console.error(error);
        res.status(400).json({error: 'Error al eliminar comentario'})
    }
}

module.exports = {
    obtenerUnComment,
    modificarComment,
    eliminarComment
}