const {Router} = require('express')
const post_imageController = require('../controllers/post_imageController')
const router = Router()

router.post('/:postId', post_imageController.crearPost_image)//
router.get('/:id', post_imageController.obtenerUnPost_image)//
router.get('/:postId/post', post_imageController.obtenerPost_imagesDeUnPost)//
router.patch('/:id', post_imageController.modificarPost_image)//
router.delete('/:id', post_imageController.eliminarPost_image)//

module.exports = router