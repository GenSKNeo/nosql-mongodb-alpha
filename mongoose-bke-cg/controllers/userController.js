// controllers/userController.js
const User = require("../models/User");

// CREATE: Add new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body); // req.body = form/JSON data
    await user.save();
    res.redirect("/users");
  } catch (err) {
    res.status(500).send("Error creating user: " + err);
  }
};

// READ: Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("index", { title: "Profile Viewer", users });
  } catch (err) {
    res.status(500).send("Error fetching users: " + err);
  }
};
