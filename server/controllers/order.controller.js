const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

exports.checkout = async (req, res, next) => {
  try {
    const { paymentMethodId } = req.body;
    if (!paymentMethodId) return res.status(400).json({ error: 'Payment method required.' });
    
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty.' });
    
    let totalAmount = 0;
    for (let item of cart.items) {
      if (item.productId.stock < item.quantity) {
        return res.status(400).json({ error: `Product ${item.productId.name} has insufficient stock.` });
      }
      totalAmount += item.productId.price * item.quantity;
    }
    
    const simulatedPaymentId = 'pay_sim_' + Math.random().toString(36).substring(2, 9);
    
    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price
    }));
    
    const order = new Order({
      userId: req.user.id,
      items: orderItems,
      totalAmount,
      paymentId: simulatedPaymentId,
      status: 'Paid'
    });
    await order.save();
    
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity }
      });
    }
    
    cart.items = [];
    await cart.save();
    
    res.status(201).json({ message: 'Payment processed and order placed successfully', orderId: order._id, paymentId: simulatedPaymentId });
  } catch (err) {
    next(err);
  }
};