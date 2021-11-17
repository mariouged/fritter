import express from 'express';
const router = express.Router();
import productController from '../controllers/productController';

router.get('/', productController.read);
router.get('/:id', productController.findById);
router.post('/', productController.create);
// router.put('/:id', productController.put );
router.patch('/restore/:id', productController.restore);
router.delete('/:id?', productController.destroy);

module.exports = router;