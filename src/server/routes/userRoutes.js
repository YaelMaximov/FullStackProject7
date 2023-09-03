// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for getting all users
router.get('/users', userController.getAllUsers);

// Route for user login
router.get('/login', userController.login);

// Route for user registration
router.post('/register', userController.register);

// Route for updating a specific field for a user
router.patch('/update-user-field', userController.updateUserField);
module.exports = router;

