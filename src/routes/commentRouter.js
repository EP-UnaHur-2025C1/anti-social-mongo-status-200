const {Router} = require('express')
const commentController = require('../controllers/commentController')
const router = Router()

router.get('/:id', commentController.obtenerUnComment)//
router.patch('/:id', commentController.modificarComment)//
router.delete('/:id', commentController.eliminarComment)//

module.exports = router