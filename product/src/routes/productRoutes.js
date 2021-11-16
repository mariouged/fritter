import express from 'express';
const router = express.Router();
import productController from '../controllers/productController';

router.get('/', productController.read);
router.get('/:id', productController.findById);
router.post('/', productController.create);
// router.put('/:id', productController.put );
// router.delete('/:id', productController.delete );

module.exports = router;