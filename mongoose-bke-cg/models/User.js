// models/User.js
const mongoose = require("mongoose");

// Define schema (structure of a user document)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  hobbies: [String],
  skills: [String],
});

// Export model
module.exports = mongoose.model("User", userSchema);
