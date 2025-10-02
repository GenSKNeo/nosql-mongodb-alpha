// Import mongoose
const mongoose = require('mongoose');

// Define what a User looks like in our database
// Think of this as a blueprint or template for user data
const userSchema = new mongoose.Schema({
    // Each user will have a name field
    name: {
        type: String,        // This must be text
        required: true,      // This field is mandatory
        trim: true           // Remove extra spaces from beginning/end
    },
    // Each user will have an email field
    email: {
        type: String,
        required: true,
        unique: true,        // No two users can have same email
        lowercase: true      // Convert to lowercase automatically
    },
    // Each user will have an age field
    age: {
        type: Number,        // This must be a number
        min: 0,              // Age can't be negative
        max: 120             // Reasonable maximum age
    }
}, {
    // Automatically add createdAt and updatedAt fields
    timestamps: true
});

// Create a Model from our Schema
// 'User' is the name of our collection in MongoDB
// MongoDB will automatically create a collection called 'users'
const User = mongoose.model('User', userSchema);

// Export the User model so we can use it in other files
module.exports = User;