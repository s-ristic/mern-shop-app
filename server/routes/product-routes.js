const express = require('express');
const {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
} = require('../controllers/product-controller');
const { private, admin } = require('../middleware/auth-middleware.js');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', private, admin, createProduct);
router.get('/toprated', getTopRatedProducts);
router.get('/:id', getProductById);
router.delete('/:id', private, admin, deleteProduct);
router.put('/:id', private, admin, updateProduct);
router.post('/:id/reviews', private, createProductReview);

module.exports = router;
