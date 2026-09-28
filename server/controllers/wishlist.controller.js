const Wishlist = require('../models/wishlist.model');

exports.getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
    if (!wishlist) wishlist = new Wishlist({ userId: req.user.id, products: [] });
    res.json(wishlist);
  } catch (err) {
    next(err);
  }
};

exports.toggleWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: 'Product ID required.' });
    
    let wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user.id, products: [productId] });
    } else {
      const index = wishlist.products.indexOf(productId);
      if (index > -1) {
        wishlist.products.splice(index, 1);
      } else {
        wishlist.products.push(productId);
      }
    }
    wishlist.updatedAt = Date.now();
    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    next(err);
  }
};