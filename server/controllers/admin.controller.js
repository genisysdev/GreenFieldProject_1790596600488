const Product = require('../models/product.model');
const Order = require('../models/order.model');

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    if (!name || !description || price === undefined || !category || stock === undefined || !imageUrl) {
      return res.status(400).json({ error: 'All product fields are required.' });
    }
    const product = new Product({ name, description, price, category, stock, imageUrl });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateInventory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    if (stock === undefined || stock < 0) return res.status(400).json({ error: 'Valid stock value required.' });
    
    const product = await Product.findByIdAndUpdate(id, { stock }, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('userId', 'email');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};