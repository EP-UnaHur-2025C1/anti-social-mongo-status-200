const Post_image = require('../models/post_image');
const Post = require('../models/post');

const crearPost_image = async (req, res) => {
    try {
        const postId = req.params.postId
        //const {url} = req.body
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({message: "Publicacion no encontrada"})
        }
        const {path} = req.file
        const nuevoPost_image = new Post_image({
          url: path,
          post: postId
        })
        await nuevoPost_image.save()
        res.status(200).json(nuevoPost_image)
      } catch (error) {
        res.status(500).json({error: 'Error interno del servidor', e: error.message})
      }
    }
    /*const nuevoPost_image = new Post_image({
        url: url,
        post: postId
    })*/
    
const obtenerUnPost_image = async (req, res) => {
    try {
        const id = req.params.id
        const post_image = await Post_image.findById(id).select('url').populate('post', '_id')
        if(!post_image){
            return res.status(404).json({message: "Imagen no encontrada"})
        }
        res.status(200).json(post_image)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor', e: error.message})
    }
}

const modificarPost_image = async (req, res) => {
    try {
        const id = req.params.id
        const {url} = req.body
        const post_imageModificada = await Post_image.findByIdAndUpdate(id, {$set: {url: url}}, {new: true, runValidators: true})
        if(!post_imageModificada){
            return res.status(404).json({message: 'Imagen no encontrada'})
        }
        res.status(200).json(post_imageModificada)
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor', e: error.message})
    }
}

const eliminarPost_image = async (req, res) => {
    try {
        const id = req.params.id
        const post_imageEliminada = await Post_image.findByIdAndDelete(id)
        if(!post_imageEliminada){
            return res.status(404).json({message: 'Imagen no encontrada'})
        }
        res.status(200).json({message: "Imagen eliminada exitosamente"})
    } catch (error) {
        res.status(500).json({error: 'Error interno del servidor', e: error.message})
    }
}

module.exports = {
    crearPost_image,
    obtenerUnPost_image,
    modificarPost_image,
    eliminarPost_image
}