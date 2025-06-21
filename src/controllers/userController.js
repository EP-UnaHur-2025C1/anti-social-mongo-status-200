const { User, Post, Comment } = require('../models/index');

const crearUser = async (req, res) => {
  try {
    const nuevoUser = new User(req.body)
    await nuevoUser.save()
    res.status(201).json(nuevoUser)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear user' })
  }
}

const obtenerUsers = async (req, res) => {
  try {
    const users = await User.find().select('nickName eMail -_id')
    res.status(200).json(users)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const obtenerUnUser = async (req, res) => {
  try {
    const nickName = req.params.nickName
    const user = await User.findOne({ nickName: nickName }).select('nickName eMail -_id')
    res.status(200).json(user)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al obtener user' })
  }
}

const modificarUser = async (req, res) => {
  try {
    const nickName = req.params.nickName
    const userModificado = await User.findOneAndUpdate({ nickName: nickName }, {
      $set: { eMail: req.body.eMail }
    }, {
      new: true,
      runValidators: true
    })
      .select('nickName eMail -_id')
    res.status(200).json(userModificado)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al modificar user.' })
  }
}

const eliminarUser = async (req, res) => {
  try {
    const nickName = req.params.nickName
    const userEliminado = await User.findOneAndDelete({ nickName: nickName })
    await Post.deleteMany({ nickName: nickName })
    await Comment.deleteMany({ nickName: nickName })
    res.status(200).json({ message: 'Usuario eliminado exitosamente' })
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al eliminar user.' })
  }
}

const obtenerPostsDeUnUser = async (req, res) => {
  try {
    const nickName = req.params.nickName
    const user = await User.findOne({ nickName: nickName }).select('nickName eMail _id')
    const posts = await Post.find({ user: user._id }).select('descripcion fecha tags')
    res.status(200).json({ posts: posts })
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al obtener posts' })
  }
}

const crearPost = async (req, res) => {
  try {
    const nickName = req.params.nickName
    const { descripcion, fecha } = req.body
    const user = await User.findOne({ nickName: nickName })
    const userId = user._id.toString()
    const nuevoPost = new Post({
      descripcion: descripcion,
      fecha: fecha,
      user: userId
    })
    await nuevoPost.save()
    res.status(201).json(nuevoPost)
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error al crear post.' })
  }
}

const comentarPost = async (req, res) => {
  try {
    const nickName = req.params.nickName
    const postId = req.params.postId
    const { descripcion, fecha } = req.body
    const user = await User.findOne({ nickName: nickName })
    const userId = user._id.toString()
    const post = await Post.findById(postId)
    const nuevoComment = new Comment({
      descripcion: descripcion,
      fecha: fecha,
      user: userId,
      post: postId
    })
    await nuevoComment.save()
    res.status(201).json(nuevoComment)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al comentar el post' })
  }
}

const obtenerSeguidores = async (req, res) => {
  try {
    const nickName = req.params.nickName
    const user = await User.findOne({ nickName: nickName }).select('nickName -_id').populate('followers', 'nickName')
    res.status(200).json(user)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al obtener seguidores' })
  }
}

const obtenerSeguidos = async (req, res) => {
  try {
    const nickName = req.params.nickName
    const user = await User.findOne({ nickName: nickName }).select('nickName -_id').populate('follows', 'nickName')
    res.status(200).json(user)
  } catch (error) {
    console.error(error);

    res.status(400).json({ error: 'Error al obtener seguidos.' })
  }
}

const seguirUser = async (req, res) => {
  const userNickName = req.params.nickName
  const targetNickName = req.params.targetNickName
  try {

    const userTarget = await User.findOne({ nickName: targetNickName })
    const targetId = userTarget._id.toString()
    const user = await User.findOne({ nickName: userNickName })
    const userId = user._id.toString()

    const nuevoUser = await User.findOneAndUpdate({ nickName: userNickName },
      { $addToSet: { follows: targetId } },
      {
        new: true,
        runValidators: true
      })
    const nuevoTarget = await User.findOneAndUpdate({ nickName: targetNickName },
      { $addToSet: { followers: userId } },
      {
        new: true,
        runValidators: true
      })

    res.status(200).json({ message: `Ahora sigues a ${targetNickName}` })
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: `Error al seguir usuario` })
  }
}

const dejarDeSeguirUser = async (req, res) => {
  const userNickName = req.params.nickName
  const targetNickName = req.params.targetNickName


  try {
    const user = await User.findOne({ nickName: userNickName })
    const userId = user._id.toString()
    const target = await User.findOne({ nickName: targetNickName })
    const targetId = target._id.toString()

    await User.findOneAndUpdate({ nickName: userNickName }, {
      $pull: { follows: targetId }
    }, {
      new: true,
      runValidators: true
    })
    await User.findOneAndUpdate({ nickName: targetNickName }, {
      $pull: { followers: userId }
    }, {
      new: true,
      runValidators: true
    })
    res.status(200).json({ message: `Ya no sigues a ${targetNickName}` })
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al dejar de seguir usuario" })
  }
}

module.exports = {
  crearUser,
  obtenerUsers,
  obtenerUnUser,
  modificarUser,
  eliminarUser,
  obtenerPostsDeUnUser,
  crearPost,
  comentarPost,
  obtenerSeguidores,
  obtenerSeguidos,
  seguirUser,
  dejarDeSeguirUser
}


