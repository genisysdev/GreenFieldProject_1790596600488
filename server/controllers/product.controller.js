const Product = require('../models/product.model');

exports.getProducts = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    let query = {};
    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = category;
    }
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};