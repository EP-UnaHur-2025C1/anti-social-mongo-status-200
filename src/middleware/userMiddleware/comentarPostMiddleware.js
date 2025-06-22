const { User, Post } = require('../../models/index');


const comentarPostMiddleware = async (req, res, next) => {
    const userNickName = req.params.nickName
    const postId = req.params.postId
    try {
        const user = await User.findOne({ nickName: userNickName })
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
        const post = await Post.findById(postId)
        if( !post ){
            return res.status(404).json({ message: 'Publicación no encontrada' })
        } 
    } catch (error) {
        res.status(500).json({ message: `Error interno del servidor` })
    }
    next()
}

module.exports = comentarPostMiddleware 