const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, cartController.getCart);
router.post('/', verifyToken, cartController.addToCart);
router.delete('/:productId', verifyToken, cartController.removeFromCart);

module.exports = router;