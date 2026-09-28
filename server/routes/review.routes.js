const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/:productId', reviewController.getReviews);
router.post('/', verifyToken, reviewController.addReview);

module.exports = router;