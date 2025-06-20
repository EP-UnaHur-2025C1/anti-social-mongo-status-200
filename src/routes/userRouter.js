const {Router} = require('express')
const router = Router()
const userController = require('../controllers/userController')


router.post('/', userController.crearUser) //testeado
router.post('/:nickName/crearPost', userController.crearPost) //
router.post('/:nickName/comentarPost/:postId', userController.comentarPost) //
router.get('/', userController.obtenerUsers) //
router.get('/:nickName', userController.obtenerUnUser) //
router.get('/:nickName/posts', userController.obtenerPostsDeUnUser) //
router.get('/:nickName/followers',userController.obtenerSeguidores)//
router.get('/:nickName/follows',userController.obtenerSeguidos)//
router.patch('/:nickName/follow/:targetNickName', userController.seguirUser) //
router.patch('/:nickName/unfollow/:targetNickName', userController.dejarDeSeguirUser) //
router.patch('/:nickName', userController.modificarUser) //
router.delete('/:nickName', userController.eliminarUser) //

module.exports = router