const { Post, Tag } = require('../../models/index');

const asociarTagMiddleware = async (req, res, next) => {
    const id = req.params.id
    const tagId = req.params.tagId
    try {
        const post = await Post.findOne({ id })
        if (!post) {
            return res.status(404).json({ message: 'Error en el middleware: post no encontrado' })
        }
        const tag = await Tag.findById(tagId)
        if (!tag) {
            return res.status(404).json({ message: 'Error en el middleware: etiqueta no encontrada' })
        }
        if (post.tags.includes(tagId)) {
            return res.status(400).json({ message: 'Error en el middleware: la etiqueta ya esta asociada a la publicacion' })
        }
    } catch (error) {
        res.status(400).json({ message: `Error en el middleware` })
    }
    next()
}

module.exports = asociarTagMiddleware 