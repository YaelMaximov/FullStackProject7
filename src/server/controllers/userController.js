const pool = require('../config/db');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM users');
    res.json(results);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Error retrieving users' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.query;
  const query = `SELECT * FROM users WHERE email = ?`;

  try {
    const [results] = await pool.query(query, [email]);

    if (results.length === 0) {
      // User not found
      res.status(401).json({ error: 'User not found' });
      return;
    }

    // Check if the password matches
    const user = results[0];

    if (user.password !== password) {
      // Password does not match
      res.status(401).json({ error: 'Incorrect password' });
      return;
    }

    // User found with matching credentials
    res.status(200).json(user);
  } catch (error) {
    console.error('Error executing login query: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Insert to users
exports.register = async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  try {
    const [userResults] = await pool.query(
      'INSERT INTO users (name, password, email, phone, address) VALUES (?, ?, ?, ?, ?)',
      [name, password, email, phone, address]
    );

    const user_id = userResults.insertId;
    res.status(200).json({ user_id, name, password, email, phone, address });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Update a specific field for the user with the given ID
exports.updateUserField = async (req, res) => {
  const { userId, field, newValue } = req.body;

  try {
    // Update the specific field for the user with the given ID
    const query = `UPDATE users SET ${field} = ? WHERE user_id = ?`;
    await pool.query(query, [newValue, userId]);

    res.status(200).json({ message: 'User field updated successfully' });
  } catch (error) {
    console.error('Error updating user field:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

