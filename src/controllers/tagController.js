const { Tag, Post } = require('../models/index');

const crearTag = async (req, res) => {
    try {
        const nuevoTag = new Tag(req.body)
        await nuevoTag.save()
        res.status(201).json(nuevoTag)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear tag.' })
    }
}

const obtenerTags = async (req, res) => {
    try {
        const tags = await Tag.find().select('nombre')
        res.status(200).json(tags)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

const obtenerUnTag = async (req, res) => {
    try {
        const id = req.params.id
        const tag = await Tag.findById(id).select('nombre')
        res.status(200).json(tag)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al obtener el tag.' })
    }
}

const obtenerPostsConUnTag = async (req, res) => {
    try {
        const id = req.params.id
        const tag = await Tag.findById(id)
        const posts = await Post.find({ tags: id }).select('descripcion fecha user')
        res.status(200).json(posts)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al obtener posts con el tag dado' })
    }
}

const modificarTag = async (req, res) => {
    try {
        const id = req.params.id
        const tagModificada = await Tag.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        res.status(200).json(tagModificada)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al modificar tag.' })
    }
}

const eliminarTag = async (req, res) => {
    try {
        const id = req.params.id
        const tagEliminada = await Tag.findByIdAndDelete(id)
        res.status(200).json({ message: "Etiqueta eliminada exitosamente" })
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al eliminar tag.' })
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