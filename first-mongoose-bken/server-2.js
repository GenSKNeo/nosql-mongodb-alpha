require('dotenv').config();
const express = require('express');

// Import our database connection function
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express with Database!');
});

// New route to check database status
app.get('/db-status', (req, res) => {
  const mongoose = require('mongoose');
  // Check if database is connected
  if (mongoose.connection.readyState === 1) {
    res.send('Database is connected! 🎉');
  } else {
    res.send('Database is not connected 😞');
  }
});

app.get('/db-info', (req, res) => {
  const mongoose = require('mongoose');
  const dbInfo = {
    databaseName: mongoose.connection.name,
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    connected: mongoose.connection.readyState === 1
  };
  res.json(dbInfo);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});