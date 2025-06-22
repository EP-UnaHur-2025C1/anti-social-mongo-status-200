const {Comment} = require('../../models/index');


const commentMiddleware = async (req, res, next) => {
    const id = req.params.id
    try {
        const comment = await Comment.findById(id)
        if( !comment ){            
            return res.status(404).json({message: 'Comentario no encontrado'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error interno del servidor` });
        
    }
    next()
}

module.exports = commentMiddleware