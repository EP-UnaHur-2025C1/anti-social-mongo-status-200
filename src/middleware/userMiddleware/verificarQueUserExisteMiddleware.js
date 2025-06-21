const { User } = require('../../models/index');

const verificarQueUserExisteMiddleware = async (req, res, next) => {
    const userNickName = req.params.nickName
    try {
        const user = await User.findOne({ nickName: userNickName })
        if (!user) {
            return res.status(404).json({ message: 'Error en el middleware: usuario no encontrado' })
        }
    } catch (error) {
        res.status(500).json({ message: `Error en el middleware` })
    }
    next()
}

module.exports = verificarQueUserExisteMiddleware 