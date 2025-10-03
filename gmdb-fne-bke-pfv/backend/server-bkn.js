// Load environment variables from .env file
require('dotenv').config();

// Import Express framework
const express = require('express');
// Mongoose to talk to MongoDB
const mongoose = require('mongoose');
// CORS to allow frontend calls (if served separately)
const cors = require('cors');

// Create Express app
const app = express();

// Read port and MongoDB URI from environment variables (or defaults)
const PORT = process.env.PORT || 3000;
// check .env variable MONGO_URI or MONGODB_URI
const MONGODB_URI = process.env.MONGO_URI; 

// Middlewares:
// Parse incoming JSON bodies
app.use(express.json());
// Serve static files from /public (frontend)
app.use(express.static('public'));
// Enable CORS for API access (safe for local development)
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGODB_URI, {
    // Mongoose 7+ has sensible defaults; options left minimal
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Import routes for users API
const usersRouter = require('./routes/users');
// Mount the router under /api/users
app.use('/api/users', usersRouter);

// For any other path (SPA fallback), serve index.html (optional)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
