// Load environment variables from config.env
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Initialize express
const app = express();

// Middleware: to parse JSON data in requests
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express + MongoDB 🚀');
});

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body); // Save new user
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update one user
app.put('/users/:id', async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete user
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Route to find users by age range
app.get('/users/age/:min/:max', async (req, res) => {
    try {
        const minAge = parseInt(req.params.min);
        const maxAge = parseInt(req.params.max);
        
        const users = await User.find({
            age: { $gte: minAge, $lte: maxAge }
        }).sort({ age: 1 });  // Sort by age ascending
        
        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Route to count total users
app.get('/users-count', async (req, res) => {
    try {
        const count = await User.countDocuments();
        
        res.json({
            success: true,
            count: count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
