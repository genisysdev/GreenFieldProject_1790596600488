const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyAdmin } = require('../middleware/auth.middleware');

router.post('/products', verifyAdmin, adminController.createProduct);
router.patch('/products/:id/inventory', verifyAdmin, adminController.updateInventory);
router.get('/orders', verifyAdmin, adminController.getAllOrders);

module.exports = router;