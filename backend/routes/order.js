const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');

router.post('/', authMiddleware, orderCtrl.placeOrder);
router.get('/me', authMiddleware, orderCtrl.getUserOrders);
router.get('/all', authMiddleware, adminMiddleware, orderCtrl.getAllOrders);
router.patch('/:id/status', authMiddleware, adminMiddleware, orderCtrl.updateOrderStatus);

module.exports = router;
