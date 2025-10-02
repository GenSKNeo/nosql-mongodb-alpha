const express = require('express');
const router = express.Router();

// Import the User model to interact with MongoDB
const User = require('../models/User');

// GET /api/users
// Return the list of all users
router.get('/', async (req, res) => {
  try {
    // Find all users, sort by newest first
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /api/users/:id
// Return a single user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the user' });
  }
});

// POST /api/users
// Create a new user
router.post('/', async (req, res) => {
  try {
    // Create a User from request body
    const { name, email, age, bio, avatarUrl } = req.body;
    const newUser = new User({ name, email, age, bio, avatarUrl });
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    // Handle validation/duplicate errors
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/users/:id
// Update an existing user (partial updates allowed)
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    // { new: true } returns the updated document
    const updated = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/users/:id
// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const removed = await User.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
