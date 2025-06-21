const { User } = require('../../models/index');

const dejarDeSeguirUserMiddleware = async (req, res, next) => {
  
  const userNickName = req.params.nickName
  const targetNickName = req.params.targetNickName
  
  // Un usuario no puede dejar de seguirse a sí mismo
  if (userNickName === targetNickName) {
    return res.status(400).json({ message: `No podés dejar de seguirte a vos mismo.` })
  }
  try {
    
    const userTarget = await User.findOne({ nickName: targetNickName })
    const user = await User.findOne({nickName: userNickName})//.select('nickName -_id').populate('followers','nickName')
    
    if( !user || !userTarget ){
      return res.status(404).json({ msg: "Usuarios no encontrados." })
    }    
    // Un usuario no puede dejar de seguir a otro usuario que no siga
    if( !user.follows.includes(userTarget._id)){
      return res.status(400).json({ msg:`No seguías a ${targetNickName}.` })
      
    }
    
  } catch (error) {
    res.status(500).json({ message: `Error al dejar de seguir usuario en el middleware` })
  }
  next()
}

module.exports = dejarDeSeguirUserMiddleware 