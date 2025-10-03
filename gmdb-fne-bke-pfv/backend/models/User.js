const mongoose = require('mongoose');

// Define a schema for User (profile)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  avatar: { 
    type: String, 
    default: "https://avatar.iran.liara.run/public/job/doctor/female" 
  }
}, { timestamps: true }
);

// Export the model so we can use it in routes/controllers
module.exports = mongoose.model('User', userSchema);


// // Define a schema for User (profile)
// const userSchema = new mongoose.Schema(
//   {
//     // Basic fields for a user profile
//     name: { type: String, required: true },      // user's full name
//     email: { type: String, required: true, unique: true }, // email (unique)
//     age: { type: Number },                       // optional age
//     bio: { type: String },                       // short biography
//     avatarUrl: { type: String }                  // URL to an avatar image (optional)
//   },
//   {
//     timestamps: true // automatically adds createdAt and updatedAt fields
//   }