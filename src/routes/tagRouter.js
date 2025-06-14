const {Router} = require('express')
const tagController = require('../controllers/tagController')
const router = Router()

router.post('/', tagController.crearTag)//
router.get('/', tagController.obtenerTags)//
router.get('/:id', tagController.obtenerUnTag)//
router.get('/:id/posts', tagController.obtenerPostsConUnTag)//
router.patch('/:id', tagController.modificarTag)//
router.delete('/:id', tagController.eliminarTag)//

module.exports = router