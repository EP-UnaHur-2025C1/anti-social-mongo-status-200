const {Router} = require('express')
const router = Router()
const userController = require('../controllers/userController')
const seguirUserMiddleware = require("../middleware/userMiddleware/seguirUserMiddleware")
const dejarDeSeguirUserMiddleware = require("../middleware/userMiddleware/dejarDeSeguirUserMiddleware")

router.post('/', userController.crearUser) //testeado
router.post('/:nickName/crearPost', userController.crearPost) //
router.post('/:nickName/comentarPost/:postId', userController.comentarPost) //
router.get('/', userController.obtenerUsers) //
router.get('/:nickName', userController.obtenerUnUser) //
router.get('/:nickName/posts', userController.obtenerPostsDeUnUser) //
router.get('/:nickName/followers',userController.obtenerSeguidores)//
router.get('/:nickName/follows',userController.obtenerSeguidos)//
router.post('/:nickName/follow/:targetNickName', seguirUserMiddleware, userController.seguirUser) //
router.delete('/:nickName/unfollow/:targetNickName', dejarDeSeguirUserMiddleware, userController.dejarDeSeguirUser) //
router.patch('/:nickName', userController.modificarUser) //
router.delete('/:nickName', userController.eliminarUser) //

module.exports = router