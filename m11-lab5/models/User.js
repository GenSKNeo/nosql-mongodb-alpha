const mongoose = require('mongoose');

// Define schema (rules for User data)
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // cannot be empty
  },
  email: {
    type: String,
    required: true,
    unique: true,   // no duplicates allowed
  },
  age: {
    type: Number,
    default: 18,    // default if not provided
  },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2  // Name must be at least 2 characters
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        // Add email format validation
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    age: {
        type: Number,
        min: 13,  // Minimum age 13
        max: 120
    },
    // Add role field with limited choices
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],  // Only these values allowed
        default: 'user'  // Default value if not provided
    }
}, {
    timestamps: true
});


// Create model from schema
module.exports = mongoose.model('User', UserSchema);
