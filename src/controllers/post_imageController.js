const { Post_Image, Post } = require('../models/index');

const crearPost_image = async (req, res) => {
    try {
        const postId = req.params.postId
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: "Publicacion no encontrada" })
        }
        const { path } = req.file
        const nuevoPost_image = new Post_Image({
            url: path,
            post: postId
        })
        await nuevoPost_image.save()
        res.status(200).json(nuevoPost_image)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear Post_Image' })
    }
}

const obtenerUnPost_image = async (req, res) => {
    try {
        const id = req.params.id
        const post_image = await Post_Image.findById(id).select('url').populate('post', '_id')
        if (!post_image) {
            return res.status(404).json({ message: "Imagen no encontrada" })
        }
        res.status(200).json(post_image)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al obtener Post_Image' })
    }
}

const modificarPost_image = async (req, res) => {
    const id = req.params.id
    const { url } = req.body
    try {
        const post_imageModificada = await Post_Image.findByIdAndUpdate(id, { $set: { url: url } }, { new: true, runValidators: true })
        if (!post_imageModificada) {
            return res.status(404).json({ message: 'Imagen no encontrada' })
        }
        res.status(200).json(post_imageModificada)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al modificar Post_Image' })
    }
}

const eliminarPost_image = async (req, res) => {
    const id = req.params.id
    try {
        const post_imageEliminada = await Post_Image.findByIdAndDelete(id)
        if (!post_imageEliminada) {
            return res.status(404).json({ message: 'Imagen no encontrada' })
        }
        res.status(200).json({ message: "Imagen eliminada exitosamente" })
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al eliminar Post_Image' })
    }
}

module.exports = {
    crearPost_image,
    obtenerUnPost_image,
    modificarPost_image,
    eliminarPost_image
}