const { Post, Tag } = require('../../models/index');

const asociarTagMiddleware = async (req, res, next) => {
    const postId = req.params.postId
    const tagId = req.params.tagId
    try {
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Publicación no encontrada' })
        }
        const tag = await Tag.findById(tagId)
        if (!tag) {
            return res.status(404).json({ message: 'Etiqueta no encontrada' })
        }
        if (post.tags.includes(tagId)) {
            return res.status(400).json({ message: 'La etiqueta ya esta asociada a la publicación' })
        }
    } catch (error) {
        res.status(500).json({ message: `Error interno del servidor` })
    }
    next()
}

module.exports = asociarTagMiddleware 