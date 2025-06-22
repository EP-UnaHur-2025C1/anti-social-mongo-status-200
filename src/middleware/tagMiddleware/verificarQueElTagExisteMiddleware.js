const { Tag } = require('../../models/index');

const verificarQueElTagExisteMiddleware = async (req, res, next) => {
    const id = req.params.id
    try {
        const post = await Tag.findById(id)
        if (!post) {
            return res.status(404).json({ message: 'Etiqueta no encontrada' })
        }
    } catch (error) {
        res.status(500).json({ message: `Error interno del servidor` })
    }
    next()
}

module.exports = verificarQueElTagExisteMiddleware 