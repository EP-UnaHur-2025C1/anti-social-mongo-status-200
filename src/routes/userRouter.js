const {Router} = require('express')
const router = Router()
const userController = require('../controllers/userController')
const seguirUserMiddleware = require("../middleware/userMiddleware/seguirUserMiddleware")
const dejarDeSeguirUserMiddleware = require("../middleware/userMiddleware/dejarDeSeguirUserMiddleware")
const verificarQueUserExisteMiddleware = require("../middleware/userMiddleware/verificarQueUserExisteMiddleware")
const comentarPostMiddleware = require("../middleware/userMiddleware/comentarPostMiddleware")

router.post('/', userController.crearUser) //testeado
router.post('/:nickName/crearPost', verificarQueUserExisteMiddleware, userController.crearPost) //
router.post('/:nickName/comentarPost/:postId', comentarPostMiddleware, userController.comentarPost) //
router.get('/', userController.obtenerUsers) //
router.get('/:nickName', verificarQueUserExisteMiddleware, userController.obtenerUnUser) //
router.get('/:nickName/posts', verificarQueUserExisteMiddleware, userController.obtenerPostsDeUnUser) //
router.get('/:nickName/followers', verificarQueUserExisteMiddleware, userController.obtenerSeguidores)//
router.get('/:nickName/follows', verificarQueUserExisteMiddleware, userController.obtenerSeguidos)//
router.post('/:nickName/follow/:targetNickName', seguirUserMiddleware, userController.seguirUser) //
router.delete('/:nickName/unfollow/:targetNickName', dejarDeSeguirUserMiddleware, userController.dejarDeSeguirUser) //
router.patch('/:nickName', verificarQueUserExisteMiddleware, userController.modificarUser) //
router.delete('/:nickName', verificarQueUserExisteMiddleware, userController.eliminarUser) //

module.exports = router