const express = require('express');
const router = express.Router();
const { getAsync, setAsync } = require('../config/redisClient');
const { authenticateToken } = require('../middleware/authentication');
const Product = require('../models/Product');

// Protected route to create a new product
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, category } = req.body;

    const newProduct = new Product({ name, description, category });
    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route to get all products
router.get('/', authenticateToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, category } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, category },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route to delete a product
router.delete('/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//product route to search products
router.get('/search', authenticateToken, async (req, res) => {
  try {
    const { category, keyword } = req.query;

    // Create a query object based on the provided criteria
    const query = {};
    if (category) query.category = category;
    if (keyword) {
      query.$or = [
        { name: { $regex: new RegExp(keyword, 'i') } },
        { description: { $regex: new RegExp(keyword, 'i') } },
      ];
    }

    // Execute the search query
    const searchResults = await Product.find(query);

    res.status(200).json({ results: searchResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to get product list with caching
router.get('/', async (req, res) => {
  try {
    // Check if data is in Redis cache
    const cachedData = await getAsync('productList');
    
    if (cachedData) {
      console.log('Using cached data');
      return res.status(200).json(JSON.parse(cachedData));
    }

    // If not in cache, fetch data from the database
    const productList = await Product.find();
    
    // Store data in Redis cache for 1 hour (3600 seconds)
    await setAsync('productList', JSON.stringify(productList), 'EX', 3600);

    console.log('Fetched data from the database');

    res.status(200).json(productList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
