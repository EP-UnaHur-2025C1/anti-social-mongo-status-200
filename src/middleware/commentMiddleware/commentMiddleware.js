const {Comment} = require('../../models/index');


const commentMiddleware = async (req, res, next) => {
    const id = req.params.id
    try {
        const comment = await Comment.findById(id)
        if( !comment ){            
            return res.status(404).json({message: 'Error en el middleware: comentario no encontrado'})
        }
    } catch (error) {
        console.error(error);
        console.log("Error en el middleware.");
        
    }
    next()
}

module.exports = commentMiddleware