// Load environment variables from .env file
require('dotenv').config();

// Import Express - our web server framework
const express = require('express');

// Create our Express application
const app = express();

// Get port from environment or use 5000 as default
const PORT = process.env.PORT || 5000;

// Define a simple route - like a welcome mat for visitors
app.get('/', (req, res) => {
  // When someone visits the homepage, send this message
  res.send('Hello from my first backend server!');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

// Start the server - like opening our store for business
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});