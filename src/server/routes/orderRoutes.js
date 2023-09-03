// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route for getting orders for a user
router.get('/get-orders-of-user/:userId', orderController.getOrdersOfUser);

// Route for getting order items for a specific order
router.get('/orderItems/:orderId', orderController.getOrderItems);

// Route for creating a new order
router.post('/orders', orderController.createOrder);

// Route for adding an item to an existing order
router.post('/orderItems', orderController.addOrderItem);

// // Route for updating the quantity of an item in an order
// router.patch('/orderItems/:orderItemId', orderController.updateQuantity);

// Route for updating the quantity of an item in an order
router.patch('/update-quantity', orderController.updateQuantity);

// Route for closed order
router.patch('/close-order', orderController.closeOrder);

// Route for get all closed orders with the products
router.get('/closed-orders-with-products', orderController.getClosedOrdersWithProducts);

// Route for deleting an item from the order_items table
router.delete('/orderItems/:orderId/:orderItemId', orderController.deleteOrderItem);

module.exports = router;
