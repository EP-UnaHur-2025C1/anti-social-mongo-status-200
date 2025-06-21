const {Router} = require('express')
const post_imageController = require('../controllers/post_imageController')
const router = Router()
const upload = require('../config/storage')
const verificarQueElPost_ImageExisteMiddleware  = require("../middleware/post_imageMiddleware/verificarQueElPost_ImageExisteMiddleware")
const verificarQueElPostExisteMiddleware        = require("../middleware/post_imageMiddleware/verificarQueElPostExisteMiddleware")

router.post('/:postId', verificarQueElPostExisteMiddleware,upload.single('imagen'), post_imageController.crearPost_image)//
router.get('/:id', verificarQueElPost_ImageExisteMiddleware, post_imageController.obtenerUnPost_image)//
router.patch('/:id', verificarQueElPost_ImageExisteMiddleware, post_imageController.modificarPost_image)//
router.delete('/:id', verificarQueElPost_ImageExisteMiddleware, post_imageController.eliminarPost_image)//

module.exports = router