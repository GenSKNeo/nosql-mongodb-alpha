// Import mongoose - our database helper
const mongoose = require('mongoose');

// Function to connect to our database
const connectDB = async () => {
  try {
    // Connection string - replace with your MongoDB connection
    // For local MongoDB: 'mongodb://localhost:27017/myfirstdb'
    // For MongoDB Atlas: 'mongodb+srv://username:password@cluster.mongodb.net/myfirstdb'
    const conn = await mongoose.connect('mongodb://localhost:27017/myfirstdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // If connection successful, show success message
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails, show error message
    console.error('Database connection error:', error.message);
    // Stop the server if database connection fails
    process.exit(1);
  }
};

// Export the function so we can use it in server.js
module.exports = connectDB;