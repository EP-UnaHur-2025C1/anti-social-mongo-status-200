const {Router} = require('express')
const tagController = require('../controllers/tagController')
const router = Router()
const verificarQueElTagExisteMiddleware = require("../middleware/tagMiddleware/verificarQueElTagExisteMiddleware")


router.post('/', tagController.crearTag)//
router.get('/', tagController.obtenerTags)//
router.get('/:id', verificarQueElTagExisteMiddleware, tagController.obtenerUnTag)//
router.get('/:id/posts', verificarQueElTagExisteMiddleware, tagController.obtenerPostsConUnTag)//
router.patch('/:id', verificarQueElTagExisteMiddleware, tagController.modificarTag)//
router.delete('/:id', verificarQueElTagExisteMiddleware, tagController.eliminarTag)//

module.exports = router