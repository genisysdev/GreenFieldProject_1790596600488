const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/checkout', verifyToken, orderController.checkout);

module.exports = router;