const Review = require('../models/review.model');

exports.getReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).populate('userId', 'email');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

exports.addReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;
    if (!productId || !rating || !comment) return res.status(400).json({ error: 'All review fields are required.' });
    
    const review = new Review({ productId, userId: req.user.id, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};