const { Post_Image } = require('../../models/index');

const verificarQueElPost_ImageExisteMiddleware = async (req, res, next) => {
    const id = req.params.id
    try {
        const post_Image = await Post_Image.findById(id)
        if (!post_Image) {
            return res.status(404).json({ message: 'Post_Image no encontrado' })
        }
    } catch (error) {
        res.status(500).json({ message: `Error interno del servidor` })
    }
    next()
}

module.exports = verificarQueElPost_ImageExisteMiddleware 