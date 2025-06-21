const { User } = require('../models/index');

const seguirUserMiddleware = async (req, res) => {
    const userNickName = req.params.nickName
    const targetNickName = req.params.targetNickName

    // Un usuario no puede seguirse a sí mismo
    if (userNickName === targetNickName) {
        return res.status(400).json({ message: `No podés seguirte a vos mismo.` })
    }
    try {
    
        const userTarget = await User.findOne({nickName: targetNickName})
        const targetId = userTarget._id.toString()
        const user = await User.findOne({nickName: userNickName})
        const userId = user._id.toString()
    
        const nuevoUser = await User.findOneAndUpdate({nickName: userNickName},
          {$addToSet: {follows: targetId}},
          {
            new: true,
            runValidators: true
          })
        const nuevoTarget = await User.findOneAndUpdate({nickName: targetNickName},
          {$addToSet: {followers: userId}},
          {
            new: true,
            runValidators: true
          })
        if (!nuevoUser || !nuevoTarget) {
          return res.status(404).json({ message: "Usuario no encontrado" })
        }
        next()
      } catch (error) {
        res.status(500).json({ message: `Error al seguir usuario`})
      }
}

module.exports = { seguirUserMiddleware }