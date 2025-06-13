const {Router} = require('express')
const router = Router()
const userController = require('../controllers/userController')


router.post('/', userController.crearUser)
router.post('/:nickName/crearPost', userController.crearPost)
router.post('/:nickName/comentarPost/:postId', userController.comentarPost)
router.get('/', userController.obtenerUsers)
router.get('/:nickName', userController.obtenerUnUser)
router.get('/:nickName/posts', userController.obtenerPostsDeUnUser)
router.patch('/:nickName', userController.modificarUser)
router.delete('/:nickName', userController.eliminarUser)

module.exports = router