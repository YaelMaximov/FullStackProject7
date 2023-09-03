const mysql = require('mysql2/promise');

// Replace your existing connection configuration with this:
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'renana',
  database: 'fullstack7',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;


