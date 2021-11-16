const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.read);
router.get('/:id', productController.findById);
router.post('/', productController.create);
// router.put('/:id', productController.put );
// router.delete('/:id', productController.delete );

module.exports = router;