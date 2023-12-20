const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const Wishlist = require('../models/Wishlist');

// Protected route to add a product to the wishlist
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.body;
    console.log(productId);
    const userId = req.user._id; // Get the user ID from the authenticated user
    console.log(productId);
    const existingWishlist = await Wishlist.findOne({ user: userId, product: productId });
    if (existingWishlist) {
      return res.status(400).json({ message: 'Product already added to wishlist' });
    }

    const newWishlist = new Wishlist({ user: userId, product: productId });
    await newWishlist.save();

    res.status(201).json({ message: 'Product added to wishlist successfully', wishlist: newWishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route to get all wishlist items for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the authenticated user

    const wishlistItems = await Wishlist.find({ user: userId }).populate('product');
    res.status(200).json({ wishlist: wishlistItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route to remove a product from the wishlist
router.delete('/:wishlistId', authenticateToken, async (req, res) => {
  try {
    const { wishlistId } = req.params;

    const deletedWishlistItem = await Wishlist.findByIdAndDelete(wishlistId);

    if (!deletedWishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.status(200).json({ message: 'Wishlist item removed successfully', wishlistItem: deletedWishlistItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
