// routes/managerRoutes.js
const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

// Route for manager login
router.get('/login', managerController.login);

module.exports = router;
