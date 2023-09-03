// models/userModel.js
const connection = require('../config/dbConnection');

// Get all users from the database
exports.getAllUsers = (callback) => {
  connection.query('SELECT * FROM users', callback);
};

// Get user by email from the database
exports.getUserByEmail = (email, callback) => {
  connection.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

// Insert a new user into the database
exports.insertUser = (user, callback) => {
  const { name, email, phone, address, password } = user;
  connection.query(
    'INSERT INTO users (name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone, address, password],
    callback
  );
};

// update field of user
exports.updateUserField = (userId, field, newValue, callback) => {
  const query = `UPDATE users SET ${field} = ? WHERE user_id = ?`;
  connection.query(query, [newValue, userId], callback);
};

