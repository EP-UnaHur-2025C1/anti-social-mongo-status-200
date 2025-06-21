const { User, Post } = require('../../models/index');


const comentarPostMiddleware = async (req, res, next) => {
    const userNickName = req.params.nickName
    const postId = req.params.postId
    try {
        const user = await User.findOne({ nickName: userNickName })
        if (!user) {
            return res.status(404).json({ message: 'Error en el middleware: usuario no encontrado' })
        }
        const post = await Post.findOne({ postId })
        if( !post ){
            return res.status(404).json({ message: 'Error en el middleware: post no encontrado' })
        } 
    } catch (error) {
        res.status(500).json({ message: `Error en el middleware` })
    }
    next()
}

module.exports = comentarPostMiddleware 