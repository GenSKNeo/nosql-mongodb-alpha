// Import the mongoose library - this helps us talk to MongoDB
const mongoose = require('mongoose');

// Function to connect to our database
const connectDB = async () => {
    try {
        // Try to connect to MongoDB
        // 'mongodb://localhost:27017/myapp' means:
        // - localhost: our own computer
        // - 27017: MongoDB's default port
        // - myapp: name of our database (will be created automatically)
        const conn = await mongoose.connect('mongodb://localhost:27017/myapp');
        
        // If successful, print this message
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If connection fails, show the error and stop the app
        console.error('Database connection error:', error);
        process.exit(1); // Exit the application with error
    }
};

// Export the function so we can use it in other files
module.exports = connectDB;