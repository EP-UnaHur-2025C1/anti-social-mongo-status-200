const { Post_Image } = require('../../models/index');

const verificarQueElPost_ImageExisteMiddleware = async (req, res, next) => {
    const id = req.params.id
    try {
        const post_Image = await Post_Image.findOne({ id })
        if (!post_Image) {
            return res.status(404).json({ message: 'Error en el middleware: Post_Image no encontrado' })
        }
    } catch (error) {
        res.status(400).json({ message: `Error en el middleware` })
    }
    next()
}

module.exports = verificarQueElPost_ImageExisteMiddleware 