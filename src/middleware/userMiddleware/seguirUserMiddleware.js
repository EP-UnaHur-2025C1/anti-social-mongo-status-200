const { User } = require('../../models/index');

const seguirUserMiddleware = async (req, res, next) => {
  
  const userNickName = req.params.nickName
  const targetNickName = req.params.targetNickName
  
  // Un usuario no puede seguirse a sí mismo
  if (userNickName === targetNickName) {
    return res.status(400).json({ message: `No podés seguirte a vos mismo.` })
  }
  try {
    
    const userTarget = await User.findOne({ nickName: targetNickName })
    const user = await User.findOne({nickName: userNickName})//.select('nickName -_id').populate('followers','nickName')
    
    if( !user || !userTarget ){
      return res.status(404).json({ msg: "Usuario o usuario a seguir no encontrado" })
    }    
    // Un usuario no puede seguir a otro usuario que ya sigue
    if( user.follows.includes(userTarget._id)){
      return res.status(400).json({ msg:"No podés seguir un usuario que ya seguís." })
      
    }
    
  } catch (error) {
    res.status(500).json({ message: `Error interno del servidor` })
  }
  next()
}

module.exports = seguirUserMiddleware 