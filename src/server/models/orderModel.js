// models/orderModel.js
const connection = require('../config/dbConnection');

// Create a new order in the database
exports.createOrder = (userId, callback) => {
  connection.query('INSERT INTO orders (user_id) VALUES (?)', [userId], callback);
};

// Add an item to an existing order in the database
exports.addOrderItem = (orderId, productId, quantity, unitPrice, callback) => {
  connection.query(
    'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
    [orderId, productId, quantity, unitPrice],
    callback
  );
};

// Update the quantity of an item in an order in the database
exports.updateOrderItemQuantity = (orderItemId, quantity, callback) => {
  connection.query('UPDATE order_items SET quantity = ? WHERE order_item_id = ?', [quantity, orderItemId], callback);
};

// Close an order in the database
exports.closeOrder = (orderId, callback) => {
  connection.query('UPDATE orders SET status = ? WHERE order_id = ?', ['close', orderId], callback);
};

// Fetch details of closed orders for a user from the database
exports.getClosedOrdersWithProducts = (userId, callback) => {
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
  connection.query(query, [userId], callback);
};

