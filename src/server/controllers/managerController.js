// controllers/managerController.js
const connection = require('../config/db.js');

exports.login = async (req, res) => {
  const { email, password } = req.query;
  const query = `SELECT * FROM managers WHERE email = ?`;

  try {
    const [results] = await connection.query(query, [email]);
    if (results.length === 0) {
      return res.status(401).json({ error: 'Manager not found' });
    }

    // Check if the password matches
    const manager = results[0];

    if (manager.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Manager found with matching credentials
    res.status(200).json(manager);
  } catch (error) {
    console.error('Error executing manager login query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
