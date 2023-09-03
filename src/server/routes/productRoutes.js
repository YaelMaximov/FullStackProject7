// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route for getting products by category
router.get('/products', productController.getProductsByCategory);

// Route for updating product quantity
router.patch('/products/:productId', productController.updateProduct);

// Route for updating product price
router.patch('/products/:productId/price', productController.updateProductPrice);

// Route for deleting a product
router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;
