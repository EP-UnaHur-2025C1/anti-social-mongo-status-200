const { Post } = require('../../models/index');

const verificarQueElPostExisteMiddleware = async (req, res, next) => {
    const id = req.params.postId
    try {
        const post = await Post.findOne({ id })
        if (!post) {
            return res.status(404).json({ message: 'Error en el middleware: Post no encontrado' })
        }
    } catch (error) {
        res.status(400).json({ message: `Error en el middleware` })
    }
    next()
}

module.exports = verificarQueElPostExisteMiddleware 