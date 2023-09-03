// models/productModel.js
const connection = require('../config/dbConnection');

// Get products by category from the database
exports.getProductsByCategory = (category, callback) => {
  connection.query('SELECT * FROM products WHERE category = ?', [category], callback);
};

// Update product quantity in the database
exports.updateProductQuantity = (productId, inventory, callback) => {
  connection.query('UPDATE products SET inventory = ? WHERE product_id = ?', [inventory, productId], callback);
};

// Update product price in the database
exports.updateProductPrice = (productId, price, callback) => {
  connection.query('UPDATE products SET price = ? WHERE product_id = ?', [price, productId], callback);
};

