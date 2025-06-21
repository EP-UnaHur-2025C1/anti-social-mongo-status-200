const {Router} = require('express')
const router = Router()
const postController = require('../controllers/postController')
const verificarQueElPostExisteMiddleware = require("../middleware/postMiddleware/verificarQueElPostExisteMiddleware")
const asociarTagMiddleware = require("../middleware/postMiddleware/asociarTagMiddleware")

router.get('/', postController.obtenerPosts)//
router.get('/:id', verificarQueElPostExisteMiddleware, postController.obtenerUnPost)//
router.get('/:id/todosLosComments', verificarQueElPostExisteMiddleware, postController.obtenerComentariosDeUnPost)//
router.get('/:id/commentsRecientes', verificarQueElPostExisteMiddleware, postController.obtenerComentariosRecientesDeUnPost)//
router.patch('/:id', verificarQueElPostExisteMiddleware, postController.modificarPost)//
router.delete('/:id', verificarQueElPostExisteMiddleware, postController.eliminarPost)//
router.post('/:postId/asociar/:tagId', asociarTagMiddleware, postController.asociarTag)//
router.get('/:id/tags', verificarQueElPostExisteMiddleware, postController.obtenerTags)
router.get("/:id/post_images", verificarQueElPostExisteMiddleware, postController.obtenerPostImages)

module.exports = router