const {User, Post, Comment} = require('../models/index');
const mongoose = require('mongoose');

const crearUser = async (req, res) => {
    try {
        const nuevoUser = new User(req.body)
        await nuevoUser.save()
        res.status(201).json(nuevoUser)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor', trace: error.message})
    }
}

const obtenerUsers = async (req, res) => {
    try {
        const users = await User.find().select('nickName eMail -_id')
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const obtenerUnUser = async (req, res) => {
    try {
        const nickName = req.params.nickName
        const user = await User.findOne({nickName: nickName}).select('nickName eMail -_id')
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const modificarUser = async (req, res) => {
    try {
        const nickName = req.params.nickName
        const userModificado = await User.findOneAndUpdate({nickName: nickName}, {
            $set: {eMail: req.body.eMail}
        }, {
            new: true,
            runValidators: true
        })
        .select('nickName eMail -_id')
        if(!userModificado){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        res.status(200).json(userModificado)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const eliminarUser = async (req, res) => {
    try {
        const nickName = req.params.nickName
        const userEliminado = await User.findOneAndDelete({nickName: nickName})
        if (!userEliminado){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        await Post.deleteMany({nickName: nickName})
        await Comment.deleteMany({nickName: nickName})
        res.status(200).json({message: 'Usuario eliminado exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const obtenerPostsDeUnUser = async (req, res) => {
    try {
        const nickName = req.params.nickName
        const user = await User.findOne({nickName: nickName}).select('nickName eMail _id')
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        const posts = await Post.find({user: user._id}).select('descripcion fecha tags')
        res.status(200).json({posts: posts})
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const crearPost = async (req, res) => {
    try {
        const nickName = req.params.nickName
        const {descripcion, fecha} = req.body
        const user = await User.findOne({nickName: nickName})
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        const userId = user._id.toString()
        const nuevoPost = new Post({
            descripcion: descripcion,
            fecha: fecha,
            user: userId
        })
        await nuevoPost.save()
        res.status(201).json(nuevoPost)
    } catch (error) {
        res.status(500).json({message: 'Error interno del servidor', trace: error.message})
    }
}

const comentarPost = async (req, res) => {
    try {
        const nickName = req.params.nickName
        const postId = req.params.postId
        const {descripcion, fecha} = req.body
        const user = await User.findOne({nickName: nickName})
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        const userId = user._id.toString()
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({message: 'Publicacion no encontrada'})
        }
        const nuevoComment = new Comment({
            descripcion: descripcion,
            fecha: fecha,
            user: userId,
            post: postId
        })
        await nuevoComment.save()
        res.status(201).json(nuevoComment)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const obtenerSeguidores = async (req,res) => {
  try {
    const nickName = req.params.nickName
    const user = await User.findOne({nickName: nickName}).select('nickName -_id').populate('followers','nickName')
    if(!user){
      return res.status(404).json({message: 'Usuario no encontrado'})
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({error: 'Error interno del servidor', e: error.message})
  }
}

const obtenerSeguidos = async (req,res) => {
  try {
    const nickName = req.params.nickName
    const user = await User.findOne({nickName: nickName}).select('nickName -_id').populate('follows','nickName')
    if(!user){
      return res.status(404).json({message: 'Usuario no encontrado'})
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({error: 'Error interno del servidor', e: error.message})
  }
}

const seguirUser = async (req,res) => {
  try {
    const userNickName = req.params.nickName
    const targetNickName = req.params.targetNickName

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
    res.status(200).json({ message: `Ahora sigues a ${targetNickName}`})
  } catch (error) {
    res.status(500).json({ message: `Error al seguir usuario`})
  }
}

const dejarDeSeguirUser = async (req,res) => {
  try {
    const userNickName = req.params.nickName
    const targetNickName = req.params.targetNickName

    const user = await User.findOne({nickName:userNickName})
    const userId = user._id.toString()
    const target = await User.findOne({nickName:targetNickName})
    const targetId = target._id.toString()

    if (!user || !target) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }
    await User.findOneAndUpdate({nickName: userNickName},{
      $pull: { follows: targetId }
    },{
      new: true,
      runValidators: true
      })
    await User.findOneAndUpdate({nickName: targetNickName},{
      $pull: { followers: userId }
    },{
      new: true,
      runValidators: true
      })
    res.status(200).json({ message: `Ya no sigues a ${targetNickName}`})
  } catch (error) {
    res.status(500).json({ message: "Error al seguir usuario"})
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


