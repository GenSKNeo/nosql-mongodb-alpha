// Load environment variables from config.env file
require('dotenv').config();

// Import Express framework
const express = require('express');
// Import our database connection function
const connectDB = require('./config/db');
// Import our User model
const User = require('./config/User');

// Create an Express application
const app = express();
// Get port number from environment variables, or use 11000 as default
const PORT = process.env.PORT || 11000;

// Middleware - this helps Express understand JSON data sent in requests
app.use(express.json());

// Connect to MongoDB database
connectDB();

// ROUTES - These define what happens when different URLs are visited

// Route 1: Homepage - when someone visits the root URL
app.get('/', (req, res) => {
    // Send a simple response
    res.send('Hello from Express! Backend is working!');
});

// Route 2: Create a new user
app.post('/users', async (req, res) => {
    try {
        // Get user data from request body
        const { name, email, age } = req.body;
        
        // Create a new user using our User model
        const newUser = new User({
            name,
            email,
            age
        });
        
        // Save the user to database
        const savedUser = await newUser.save();
        
        // Send back the saved user as response
        res.status(201).json({
            success: true,
            data: savedUser
        });
    } catch (error) {
        // If something goes wrong, send error message
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Route 3: Get all users
app.get('/users', async (req, res) => {
    try {
        // Find all users in the database
        const users = await User.find();
        
        // Send users as response
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

// Route 4: Get a specific user by ID
app.get('/users/:id', async (req, res) => {
    try {
        // Find user by the ID in the URL
        const user = await User.findById(req.params.id);
        
        // If user not found, send 404 error
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Send the found user
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Route 5: Update a user
app.put('/users/:id', async (req, res) => {
    try {
        // Find user by ID and update with new data
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,      // Which user to update
            req.body,           // New data to apply
            { new: true }       // Return the updated user
        );
        
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.json({
            success: true,
            data: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Route 6: Delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        // Find user by ID and delete
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Start the server - make it listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});