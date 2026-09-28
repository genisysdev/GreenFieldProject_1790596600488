const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart) cart = new Cart({ userId: req.user.id, items: [] });
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity < 1) return res.status(400).json({ error: 'Valid product and quantity required.' });
    
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    if (product.stock < quantity) return res.status(400).json({ error: 'Insufficient inventory stock.' });
    
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: 'Cart not found.' });
    
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};