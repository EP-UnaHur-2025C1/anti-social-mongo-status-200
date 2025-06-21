const { Tag } = require('../../models/index');

const verificarQueElTagExisteMiddleware = async (req, res, next) => {
    const id = req.params.id
    try {
        const post = await Tag.findOne({ id })
        if (!post) {
            return res.status(404).json({ message: 'Error en el middleware: tag no encontrado' })
        }
    } catch (error) {
        res.status(400).json({ message: `Error en el middleware` })
    }
    next()
}

module.exports = verificarQueElTagExisteMiddleware 