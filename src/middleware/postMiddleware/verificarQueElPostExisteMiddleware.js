const { Post } = require('../../models/index');

const verificarQueElPostExisteMiddleware = async (req, res, next) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ message: 'Publicación no encontrada' })
        }
    } catch (error) {
        res.status(500).json({ message: `Error interno del servidor` })
    }
    next()
}

module.exports = verificarQueElPostExisteMiddleware 