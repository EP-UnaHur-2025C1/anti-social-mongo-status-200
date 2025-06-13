const {Router} = require('express')
const router = Router()
const postController = require('../controllers/postController')

router.get('/', postController.obtenerPosts)
router.get('/:id', postController.obtenerUnPost)
router.get('/:id', postController.obtenerComentariosDeUnPost)
router.put('/:id', postController.modificarPost)
router.delete('/:id', postController.eliminarPost)
router.post('/:postId/asociar/:tagId', postController.asociarTag)

module.exports = router