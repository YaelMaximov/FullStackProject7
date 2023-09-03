// models/managerModel.js
const connection = require('../config/dbConnection');

// Get manager by email from the database
exports.getManagerByEmail = (email, callback) => {
  connection.query('SELECT * FROM managers WHERE email = ?', [email], callback);
};

