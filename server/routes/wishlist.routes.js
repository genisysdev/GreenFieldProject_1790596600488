const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, wishlistController.getWishlist);
router.post('/', verifyToken, wishlistController.toggleWishlist);

module.exports = router;