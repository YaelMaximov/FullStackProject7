// controllers/productController.js
const connection = require('../config/db.js');

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  const { category } = req.query;
  const query = `SELECT * FROM products WHERE category = ?`;

  try {
    const [results] = await connection.query(query, [category]);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error executing product query: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update product quantity
exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { inventory } = req.body;
  const query = `UPDATE products SET inventory = ? WHERE product_id = ?`;

  try {
    const [results] = await connection.query(query, [inventory, productId]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating product quantity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update the price of a product
exports.updateProductPrice = async (req, res) => {
  const { productId } = req.params;
  const { price } = req.body;

  try {
    // Update the price of the product in the database
    await connection.query('UPDATE products SET price = ? WHERE product_id = ?', [price, productId]);

    // Send a success response
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating product price:', error);
    // Send an error response
    res.sendStatus(500);
  }
};


// Delete a product from the database
exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  console.log(productId);

  try {
    // Check if the product exists
    const checkProductQuery = 'SELECT * FROM products WHERE product_id = ?';
    const [product] = await connection.query(checkProductQuery, [productId]);

    if (product.length === 0) {
      // Product not found
      console.log('Product not found');
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product from the database
    const deleteProductQuery = 'DELETE FROM products WHERE product_id = ?';
    await connection.query(deleteProductQuery, [productId]);

    // Send a success response
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.sendStatus(500);
  }
};