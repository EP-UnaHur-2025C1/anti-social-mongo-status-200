const {Router} = require('express')
const commentController = require('../controllers/commentController')
const router = Router()
const commentMiddleware = require("../middleware/commentMiddleware/commentMiddleware")

router.get('/:id', commentMiddleware, commentController.obtenerUnComment)//
// router.get('/:id', commentController.obtenerUnComment)//
router.patch('/:id', commentMiddleware, commentController.modificarComment)//
// router.patch('/:id', commentController.modificarComment)//
router.delete('/:id', commentMiddleware, commentController.eliminarComment)//
// router.delete('/:id', commentController.eliminarComment)//

module.exports = router