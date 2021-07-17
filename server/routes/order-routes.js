const express = require('express');

const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
  getAllOrders,
} = require('../controllers/order-controller.js');
const { private, admin } = require('../middleware/auth-middleware.js');

router.get('/', private, admin, getAllOrders);
router.post('/', private, addOrderItems);
router.get('/myorders', private, getUserOrders);
router.get('/:id', private, getOrderById);
router.put('/:id/pay', private, updateOrderToPaid);
router.put('/:id/deliver', private, admin, updateOrderToDelivered);

module.exports = router;
