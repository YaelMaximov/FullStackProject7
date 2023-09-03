// server.js
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

// Require the route files
const userRoutes = require('./routes/userRoutes');
const managerRoutes = require('./routes/managerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect to the database
const connection = require('./config/db.js');
// Use the connection for the routes
app.use((req, res, next) => {
  req.db = connection; // This makes the 'connection' object accessible from the request object (req)
  next(); // Move on to the next middleware
});

// Use the routes
app.use('/users', userRoutes);
app.use('/manager', managerRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// // For production - the same port
// const path = require('path');
// // Serve static files from the "build" directory
// app.use(express.static(path.join(__dirname, 'build')));

// // Define a route to handle all other requests and serve the React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// // Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });



// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
