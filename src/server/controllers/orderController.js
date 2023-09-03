// controllers/orderController.js
const connection = require('../config/db.js');

// Get orders for a user
exports.getOrdersOfUser = async (req, res) => {
  const userId = req.params.userId;
  const query = `SELECT * FROM orders WHERE status= 'open' and user_id = ?`;

  try {
    const [results] = await connection.query(query, [userId]);
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ error: 'No orders found for the user' });
    }
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get order items for a specific order
exports.getOrderItems = async (req, res) => {
  const { orderId } = req.params;

  const query = `
    SELECT oi.order_item_id, oi.quantity, oi.unit_price, p.product_id, p.product_name, p.category, p.price, p.url
    FROM order_items AS oi
    INNER JOIN products AS p ON oi.product_id = p.product_id
    WHERE oi.order_id = ?
  `;

  try {
    const [results] = await connection.query(query, [orderId]);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error executing order items query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// New function to insert an order and its items
exports.createOrder = async (req, res) => {
  const { user_id, order_date, total_amount, items } = req.body;

  try {
    // Insert the order into the orders table
    const insertOrderQuery = 'INSERT INTO orders (user_id, order_date, total_amount, status) VALUES (?, ?, ?, ?)';
    const orderValues = [user_id, order_date, total_amount, 'open'];

    const [orderResult] = await connection.query(insertOrderQuery, orderValues);
    const order_id = orderResult.insertId;

    // Create an array of values for the order_items table
    const orderItemsValues = items.map((item) => [
      order_id,
      item.product_id,
      item.quantity,
      item.unit_price
    ]);

    // Insert the order items into the order_items table
    const insertOrderItemsQuery = 'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ?';

    await connection.query(insertOrderItemsQuery, [orderItemsValues]);

    res.status(200).json({ order_id: order_id, message: 'Order and order items inserted successfully' });
  } catch (error) {
    console.error('Error inserting order and order items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Add an item to an existing order
exports.addOrderItem = async (req, res) => {
  const { order_id, product_id, quantity, unit_price } = req.body;
  try {
    // Check if the product exists
    const [productResults] = await connection.query('SELECT * FROM products WHERE product_id = ?', [product_id]);
    const product = productResults[0];

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Insert the item into the order_items table
    const insertQuery = 'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)';
    await connection.query(insertQuery, [order_id, product_id, quantity, unit_price]);

    // Update the total amount of the order
    const updateTotalAmountQuery =
      'UPDATE orders SET total_amount = (SELECT SUM(unit_price * quantity) FROM order_items WHERE order_id = ?) WHERE order_id = ?';
    await connection.query(updateTotalAmountQuery, [order_id, order_id]);

    // Send a success response
    res.status(200).json({ message: 'Order item inserted successfully' });
  } catch (error) {
    console.error('Error adding order item:', error);
    res.sendStatus(500);
  }
};

// // Update the quantity of an item in an order
// exports.updateQuantity = async (req, res) => {
//   const { orderItemId } = req.params;
//   const { quantity } = req.body;

//   try {
//     // Update the quantity of the order item in the database
//     await connection.query('UPDATE order_items SET quantity = ? WHERE order_item_id = ?', [quantity, orderItemId]);

//     // Send a success response
//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Error updating quantity:', error);
//     res.sendStatus(500);
//   }
// };

// Update the quantity of an item in an order and handle total amount and item deletion
exports.updateQuantity = async (req, res) => {
  const { orderItemId, quantity } = req.body;

  try {
    // Get the current quantity and unit price from the database
    const selectQuery = 'SELECT order_id, quantity, unit_price FROM order_items WHERE order_item_id = ?';
    const [selectResults] = await connection.query(selectQuery, [orderItemId]);

    if (selectResults.length === 0) {
      // Order item not found
      res.status(404).json({ error: 'Order item not found' });
      return;
    }

    const currentQuantity = selectResults[0].quantity;
    const unitPrice = selectResults[0].unit_price;
    const order_id = selectResults[0].order_id;

    // Calculate the difference in quantity and total amount
    const quantityDifference = quantity - currentQuantity;
    const totalAmountDifference = unitPrice * quantityDifference;

    // Update the quantity of the order item in the database
    await connection.query('UPDATE order_items SET quantity = ? WHERE order_item_id = ?', [quantity, orderItemId]);

    if (quantity === 0) {
      // Delete the order item if the new quantity is zero
      const deleteQuery = 'DELETE FROM order_items WHERE order_item_id = ?';
      await connection.query(deleteQuery, [orderItemId]);
    }

    // Update the total amount in the orders table
    const updateTotalAmountQuery = 'UPDATE orders SET total_amount = total_amount + ? WHERE order_id = ?';
    await connection.query(updateTotalAmountQuery, [totalAmountDifference, order_id]);

    // Send a success response
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.sendStatus(500);
  }
};



exports.closeOrder = async (req, res) => {
  const { orderId } = req.body;
  const query = 'UPDATE orders SET status = ? WHERE order_id = ?';

  try {
    await connection.query(query, ['close', orderId]);
    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getClosedOrdersWithProducts = async (req, res) => {
  const { userId } = req.query;
  const query = `
    SELECT
      orders.order_id,
      orders.user_id,
      orders.order_date,
      orders.status,
      SUM(order_items.quantity) AS total_quantity,
      JSON_ARRAYAGG(products.url) AS urls,
      SUM(products.price * order_items.quantity) AS total_price
    FROM fullstack7.orders
    JOIN fullstack7.order_items ON orders.order_id = order_items.order_id
    JOIN fullstack7.products ON order_items.product_id = products.product_id
    WHERE orders.user_id = ? AND orders.status = 'close'
    GROUP BY orders.order_id, orders.user_id, orders.order_date, orders.status;
  `;

  try {
    const [results] = await connection.query(query, [userId]);
    res.status(200).json({ closedOrders: results });
  } catch (error) {
    console.error('Error fetching closed orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an item from the order_items table
exports.deleteOrderItem = async (req, res) => {
  const orderId = req.params.orderId;
  const orderItemId = req.params.orderItemId;

  try {
    // Delete the order item
    const deleteOrderItemQuery = 'DELETE FROM order_items WHERE order_id = ? AND order_item_id = ?';
    const [result] = await connection.query(deleteOrderItemQuery, [orderId, orderItemId]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Order item not found' });
    } else {
      res.status(200).json({ message: 'Order item deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


